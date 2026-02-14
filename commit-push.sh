#!/usr/bin/env bash
# commit-push.sh
# Menu skrip:
# 1) Commit dan push (dengan cek staging dan npm run build)
# 2) Merge ke branch "development" dari posisi branch saat ini lalu push
# 3) Gabungan: Commit+Push lalu Merge ke "development" dan push
# Semua pesan dalam bahasa Indonesia.

set -o pipefail

# Warna ANSI (dapat dimatikan dengan NO_COLOR=1)
if [ -t 1 ] && [ -z "$NO_COLOR" ]; then
  RED=$'\033[31m'
  GREEN=$'\033[32m'
  YELLOW=$'\033[33m'
  BLUE=$'\033[34m'
  RESET=$'\033[0m'
else
  RED=""; GREEN=""; YELLOW=""; BLUE=""; RESET=""
fi

warn() { printf "%s%s%s\n" "$YELLOW" "$*" "$RESET"; }
error() { printf "%s%s%s\n" "$RED" "$*" "$RESET" >&2; }
success() { printf "%s%s%s\n" "$GREEN" "$*" "$RESET"; }
prompt() { printf "%s%s%s" "$BLUE" "$1" "$RESET"; }

# Pastikan berada di dalam repository git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  error "Direktori ini bukan repository git."
  exit 1
fi

TARGET_BRANCH="development"

# Fungsi: commit & push
do_commit_push() {
  # 1) Pastikan ada file di staging area
  if git diff --cached --quiet; then
    warn "Tidak ada perubahan di staging area."
    warn "Silakan jalankan 'git add <file>' dulu, lalu jalankan skrip ini lagi."
    return 1
  fi

  # 2) Minta deskripsi commit
  prompt "Masukkan deskripsi commit: "
  IFS= read -r COMMIT_MSG
  if [ -z "$COMMIT_MSG" ]; then
    warn "Deskripsi commit tidak boleh kosong. Jalankan skrip ini lagi."
    return 1
  fi

  # Jalankan build
  echo "Menjalankan build: npm run build ..."
  if ! npm run build; then
    error "Build gagal. Perbaiki error, kemudian jalankan skrip ini dari awal."
    return 1
  fi

  # Commit lalu push
  echo "Melakukan commit..."
  if ! git commit -m "$COMMIT_MSG"; then
    error "Commit gagal. Periksa pesan error di atas dan ulangi dari awal."
    return 1
  fi

  echo "Melakukan push ke remote..."
  if ! git push; then
    error "Push gagal. Periksa konfigurasi remote/koneksi dan coba lagi."
    return 1
  fi

  success "Selesai: commit dan push berhasil."
  return 0
}

# Fungsi: merge ke development
do_merge_to_development() {
  # Simpan branch saat ini
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
  if [ -z "$CURRENT_BRANCH" ]; then
    error "Gagal mendeteksi branch saat ini."
    return 1
  fi

  # Pastikan tidak ada perubahan yang belum di-commit
  if ! git diff --quiet || ! git diff --cached --quiet; then
    warn "Terdapat perubahan yang belum di-commit. Silakan commit atau stash dulu, lalu jalankan ulang."
    return 1
  fi

  # Tarik update terbaru dari remote
  if ! git fetch origin; then
    error "Gagal melakukan fetch dari remote."
    return 1
  fi

  # Jika sudah berada di development, cukup lakukan pull dan selesai
  if [ "$CURRENT_BRANCH" = "$TARGET_BRANCH" ]; then
    echo "Anda saat ini berada di branch '$TARGET_BRANCH'. Melakukan pull terbaru..."
    if ! git pull --ff-only origin "$TARGET_BRANCH"; then
      echo "Tidak bisa fast-forward. Mencoba pull dengan rebase..."
      if ! git pull --rebase origin "$TARGET_BRANCH"; then
        error "Pull pada branch '$TARGET_BRANCH' gagal. Periksa konflik dan selesaikan secara manual."
        return 1
      fi
    fi
    success "Selesai memperbarui '$TARGET_BRANCH'."
    return 0
  fi

  # Beralih ke development dan lakukan pull terbaru
  echo "Beralih ke branch '$TARGET_BRANCH' dan menarik perubahan terbaru..."
  if git show-ref --verify --quiet "refs/heads/$TARGET_BRANCH"; then
    if ! git switch "$TARGET_BRANCH" 2>/dev/null; then
      if ! git checkout "$TARGET_BRANCH"; then
        error "Gagal beralih ke branch '$TARGET_BRANCH'."
        return 1
      fi
    fi
  else
    if git show-ref --verify --quiet "refs/remotes/origin/$TARGET_BRANCH"; then
      if ! git checkout -b "$TARGET_BRANCH" "origin/$TARGET_BRANCH"; then
        error "Gagal membuat branch lokal '$TARGET_BRANCH' dari origin."
        return 1
      fi
    else
      warn "Branch '$TARGET_BRANCH' tidak ditemukan baik lokal maupun pada 'origin'."
      warn "Mengabaikan proses merge."
      return 0
    fi
  fi

  if ! git pull --ff-only origin "$TARGET_BRANCH"; then
    echo "Tidak bisa fast-forward. Mencoba pull dengan rebase..."
    if ! git pull --rebase origin "$TARGET_BRANCH"; then
      error "Pull pada branch '$TARGET_BRANCH' gagal. Periksa konflik lalu jalankan skrip lagi."
      warn "Tetap berada di branch '$TARGET_BRANCH'. Untuk kembali ke branch semula: git switch $CURRENT_BRANCH"
      return 1
    fi
  fi

  echo "Menggabungkan perubahan dari '$CURRENT_BRANCH' ke '$TARGET_BRANCH'..."
  if ! git merge --no-ff --no-edit "$CURRENT_BRANCH"; then
    error "Terjadi konflik saat merge. Selesaikan konflik di branch '$TARGET_BRANCH' secara manual."
    warn "Setelah selesai, Anda dapat kembali ke branch semula dengan: git switch $CURRENT_BRANCH"
    return 1
  fi

  echo "Mendorong perubahan '$TARGET_BRANCH' ke remote..."
  if ! git push origin "$TARGET_BRANCH"; then
    error "Push ke 'origin/$TARGET_BRANCH' gagal. Periksa konfigurasi remote/koneksi, lalu push secara manual."
    warn "Anda tetap berada di branch '$TARGET_BRANCH'. Setelah berhasil, Anda dapat kembali ke: git switch $CURRENT_BRANCH"
    return 1
  fi

  # Kembali ke branch awal pengguna
  success "Merge dan push berhasil. Kembali ke branch semula '$CURRENT_BRANCH'..."
  if ! git switch "$CURRENT_BRANCH" 2>/dev/null; then
    if ! git checkout "$CURRENT_BRANCH"; then
      error "Gagal kembali ke branch '$CURRENT_BRANCH'. Silakan pindah secara manual."
      return 1
    fi
  fi

  success "Selesai: merge ke '$TARGET_BRANCH' berhasil. Anda sekarang kembali di '$CURRENT_BRANCH'."
  return 0
}

# Fungsi: gabungan commit+push lalu merge+push
 do_commit_push_and_merge() {
   if ! do_commit_push; then
     error "Langkah commit+push gagal. Proses dihentikan."
     return 1
   fi

   if ! do_merge_to_development; then
     error "Langkah merge+push ke '$TARGET_BRANCH' gagal."
     return 1
   fi

   success "Selesai: Commit+Push lalu Merge+Push ke '$TARGET_BRANCH' berhasil."
   return 0
 }

# Menu utama
echo "Pilih aksi:"
echo "1) Commit dan Push"
echo "2) Merge + Push ke branch '$TARGET_BRANCH'"
echo "3) Commit+Push lalu Merge+Push ke branch '$TARGET_BRANCH'"
prompt "Masukkan pilihan (1/2/3): "
IFS= read -r choice

case "$choice" in
  1)
    do_commit_push
    ;;
  2)
    do_merge_to_development
    ;;
  3)
    do_commit_push_and_merge
    ;;
  *)
    error "Pilihan tidak dikenal. Batalkan."
    exit 1
    ;;
esac

exit $?
