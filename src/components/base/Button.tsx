import { createPolymorphicComponent, Button as MantineButton } from "@mantine/core";

import { cn } from "@/libs/tailwind-clsx";

import type { ButtonProps } from "@mantine/core";
import type { ButtonHTMLAttributes, Ref } from "react";

type IButtonElement = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">;

interface IButtonProps extends ButtonProps, IButtonElement {
  variety?: "default" | "secondary" | "outline" | "reset" | "text" | "block" | "custom";
  classNames?: {
    root?: string;
    label?: string;
    inner?: string;
    loader?: string;
    section?: string;
  };
}

export const Button = createPolymorphicComponent<"button", IButtonProps>(
  (props: IButtonProps, ref: Ref<HTMLButtonElement>) => {
    const { variety = "default", classNames, ...rest } = props;
    const base = { radius: "md", fw: 600 };

    switch (variety) {
      case "secondary":
        return (
          <MantineButton
            ref={ref}
            {...base}
            c="#292D32"
            color="#E0E0E0"
            classNames={{
              root: cn("h-[2.5rem]", classNames?.root),
              label: cn("font-semibold", classNames?.label),
              inner: cn(classNames?.inner),
              loader: cn(classNames?.loader),
              section: cn(classNames?.section),
            }}
            {...rest}
          />
        );

      case "outline":
        return (
          <MantineButton
            ref={ref}
            {...base}
            variant="outline"
            color="#D0D5DD"
            bg="white"
            classNames={{
              root: cn(classNames?.root),
              label: cn("font-semibold text-[#017534]", classNames?.label),
              inner: cn(classNames?.inner),
              loader: cn(classNames?.loader),
              section: cn(classNames?.section),
            }}
            {...rest}
          />
        );

      case "reset":
        return (
          <MantineButton
            ref={ref}
            variant="outline"
            radius="md"
            color="#D0D5DD"
            bg="white"
            classNames={{
              root: cn("h-[2.5rem]", classNames?.root),
              label: cn("font-semibold text-[#FA4F47]", classNames?.label),
              inner: cn(classNames?.inner),
              loader: cn(classNames?.loader),
              section: cn(classNames?.section),
            }}
            {...rest}
          />
        );

      case "text":
        return (
          <MantineButton
            ref={ref}
            {...base}
            variant="transparent"
            classNames={{
              root: cn(classNames?.root),
              label: cn("font-semibold text-[#017534]", classNames?.label),
              inner: cn(classNames?.inner),
              loader: cn(classNames?.loader),
              section: cn(classNames?.section),
            }}
            {...rest}
          />
        );

      case "block":
        return (
          <MantineButton
            ref={ref}
            {...base}
            bg="#017534"
            classNames={{
              root: cn("h-[3.75rem]", classNames?.root),
              label: cn("text-[18px] font-bold", classNames?.label),
              inner: cn(classNames?.inner),
              loader: cn(classNames?.loader),
              section: cn(classNames?.section),
            }}
            {...rest}
          />
        );

      case "custom":
        return <MantineButton ref={ref} {...base} classNames={classNames} {...rest} />;

      case "default":
      default:
        return (
          <MantineButton
            ref={ref}
            {...base}
            color="#017534"
            classNames={{
              root: cn("h-[2.5rem]", classNames?.root),
              label: cn("font-semibold", classNames?.label),
              inner: cn(classNames?.inner),
              loader: cn(classNames?.loader),
              section: cn(classNames?.section),
            }}
            {...rest}
          />
        );
    }
  },
);
