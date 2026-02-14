import { TextInput as MantineTextInput } from "@mantine/core";

import { cn } from "@/libs/tailwind-clsx";

import type { TextInputProps } from "@mantine/core";
import type { InputHTMLAttributes } from "react";

type IInputElement = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "style">;
interface IProps extends TextInputProps, IInputElement {
  variety?: "default" | "custom";
  classnames?: {
    root?: string;
    input?: string;
    label?: string;
    section?: string;
  };
}

const base = { radius: "md" };

export const TextInput = ({ ref, ...props }: IProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  const { variety = "default", ...rest } = props;

  if (variety === "default") {
    return (
      <MantineTextInput
        {...base}
        ref={ref}
        classNames={{
          root: cn(rest.classnames?.root),
          input: cn(
            `
              h-[2.75rem] text-base
              focus:border-[#34A853]
            `,
            rest.classnames?.input,
          ),
          label: cn("mb-1 text-base", rest.classnames?.label),
          section: cn(rest.classnames?.section),
          error: "text-xs",
        }}
        {...rest}
      />
    );
  }

  if (variety === "custom") {
    return <MantineTextInput {...base} ref={ref} {...rest} />;
  }

  return null;
};

TextInput.displayName = "TextInput";
