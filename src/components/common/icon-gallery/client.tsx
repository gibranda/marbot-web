"use client";

import { useEffect, useState } from "react";

interface IconsClientProps {
  iconNames: string[];
}

export function IconsClient({ iconNames }: IconsClientProps) {
  const [components, setComponents] = useState<React.ComponentType<{ width: string; height: string }>[]>([]);

  useEffect(() => {
    async function loadComponents() {
      try {
        const loadedComponents = await Promise.all(
          iconNames.map(async (name) => {
            // Import from the icons directory (relative to this file)
            // Assuming this file is in src/components/features/icon-gallery/client.tsx
            // and icons are in src/components/icons/
            // eslint-disable-next-line @next/next/no-assign-module-variable
            const module = { ...(await import(`../../icons/${name}.tsx`)) };
            return module[`${name}`];
          }),
        );

        setComponents(loadedComponents);
      } catch (error) {
        console.error("Error loading components:", error);
      }
    }

    loadComponents();
  }, [iconNames]);

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {components.map((Component, index) => (
        <div
          key={iconNames[`${index}`]}
          className="flex h-[100px] w-[200px] flex-col items-center justify-center gap-2 rounded-md border bg-gray-100"
        >
          {Component ? <Component width="40px" height="40px" /> : null}
          <p className="text-center text-xs font-semibold">{iconNames[`${index}`]}</p>
        </div>
      ))}
    </div>
  );
}
