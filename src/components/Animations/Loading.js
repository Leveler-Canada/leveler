import * as React from "react";

function SvgLoading(props) {
  return (
    <svg
      style={{
        margin: "auto",
        background: "transparent"
      }}
      width={200}
      height={200}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      display="block"
      {...props}
    >
      <path
        d="M10.297 46.031a40 40 0 0079.604 7.947 40 42 5.701 01-79.604-7.947"
        fill="#1d0e0b"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 51;360 50 51"
        />
      </path>
    </svg>
  );
}

export default SvgLoading;
