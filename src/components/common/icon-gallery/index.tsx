import fs from "fs/promises";
import path from "path";

import { IconsClient } from "./client";

export async function IconGallery() {
  const iconsDir = path.join(process.cwd(), "src/components/icons");

  // Membaca file di direktori
  const files = await fs.readdir(iconsDir);

  // Filter file .tsx dan bukan file khusus
  const iconNames = files
    .filter((file) => file.endsWith(".tsx") && !file.endsWith(".stories.tsx"))
    .map((file) => file.replace(".tsx", ""));

  return <IconsClient iconNames={iconNames} />;
}
