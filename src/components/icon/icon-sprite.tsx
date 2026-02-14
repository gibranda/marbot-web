import type { SVGProps } from "react";

export type IconName = "icon-1" | "icon-2" | "eraser";

type IProps = {
  name: IconName;
} & SVGProps<SVGSVGElement>;

export function Icon(props: IProps) {
  const { name, ...rest } = props;

  return (
    <svg {...rest}>
      <use href={`/icon-sprite.svg#${name}`} />
    </svg>
  );
}
