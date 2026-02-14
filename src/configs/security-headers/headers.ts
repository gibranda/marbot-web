import type { SecurityHeaders } from "./types";

export const defaultHeaders: SecurityHeaders = {
  crossOriginResourcePolicy: "same-origin",
  crossOriginOpenerPolicy: "same-origin",
  crossOriginEmbedderPolicy: "require-corp",
  contentSecurityPolicy: {
    "base-uri": ["'self'"],
    "font-src": ["'self'", "https:", "data:"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'self'"],
    "img-src": ["'self'", "data:", "https:", "blob:"],
    "object-src": ["'none'"],
    "script-src-attr": ["'self'", "'unsafe-inline'"],
    "style-src": ["'self'", "https:", "'unsafe-inline'"], // Middleware untuk nonce
    "upgrade-insecure-requests": true,
    "default-src": ["'self'", "'unsafe-inline'", "https:"],
    "script-src": ["'self'", "strict-dynamic", "https:"], // Middleware untuk nonce
    "connect-src": ["'self'", "https:", "http:", "ws:"],
    "frame-src": ["'self'", "https:"],
    "media-src": ["'none'"],
    "manifest-src": ["'self'"],
    "style-src-elem": ["'self'", "'unsafe-inline'", "https:"],
    "style-src-attr": ["'self'", "'unsafe-inline'"],
    "worker-src": ["'self'", "https:", "blob:"],
    "script-src-elem": ["'self'", "'unsafe-inline'", "https:"],
  },
  originAgentCluster: "?1",
  referrerPolicy: "strict-origin-when-cross-origin",
  strictTransportSecurity: {
    maxAge: 31536000,
    includeSubdomains: true,
    preload: true,
  },
  xContentTypeOptions: "nosniff",
  xDNSPrefetchControl: "off",
  xDownloadOptions: "noopen",
  xFrameOptions: "SAMEORIGIN",
  xPermittedCrossDomainPolicies: "none",
  xXSSProtection: "1; mode=block",
  permissionsPolicy: {
    camera: ["()"],
    "display-capture": ["()"],
    fullscreen: ["()"],
    geolocation: ["()"],
    microphone: ["()"],
  },
  xPoweredBy: false,
};
