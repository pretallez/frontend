import * as React from "react";
import { SVGProps } from "react";
const NaverIcon = ({ width, height, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 800}
    height={height || 800}
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M9 32v448h172.366V255.862L331.358 480H504V32H331.358v223.862L181.366 32H9Z" />
  </svg>
);
export default NaverIcon;
