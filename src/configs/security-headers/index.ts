import { defaultHeaders } from "./headers";

import type {
  ContentSecurityPolicyValue,
  PermissionsPolicyValue,
  SecurityHeader,
  StrictTransportSecurityValue,
} from "./types";

const headerValueMappers = {
  strictTransportSecurity: (value: StrictTransportSecurityValue) =>
    [`max-age=${value.maxAge}`, value.includeSubdomains && "includeSubDomains", value.preload && "preload"]
      .filter(Boolean)
      .join("; "),
  contentSecurityPolicy: (value: ContentSecurityPolicyValue) => {
    return Object.entries(value)
      .map(([directive, sources]) => {
        if (directive === "upgrade-insecure-requests") {
          return sources ? "upgrade-insecure-requests" : "";
        }

        return (sources as string[])?.length && `${directive} ${(sources as string[]).join(" ")}`;
      })
      .filter(Boolean)
      .join("; ");
  },
  permissionsPolicy: (value: PermissionsPolicyValue) =>
    Object.entries(value)
      .map(([directive, sources]) => (sources as string[])?.length && `${directive}=${(sources as string[]).join(" ")}`)
      .filter(Boolean)
      .join(", "),
};

export const securityHeaders: SecurityHeader[] = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" }, // done
  { key: "X-Content-Type-Options", value: "nosniff" }, // done
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, // done
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), display-capture=(), fullscreen=()",
  }, // done
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload", // done
  },
  { key: "X-XSS-Protection", value: "1; mode=block" }, // done
  {
    key: "content-security-policy",
    value: headerValueMappers.contentSecurityPolicy(defaultHeaders.contentSecurityPolicy),
  },
];
