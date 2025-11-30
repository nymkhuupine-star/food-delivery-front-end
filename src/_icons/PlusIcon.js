import * as React from "react";
const PlusIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 11 11"
    width={11}
    height={11}
    fill="none"
    {...props}
  >
    <path
      stroke="#FAFAFA"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.167.5v9.333M.5 5.167h9.333"
    />
  </svg>
);
export default PlusIcon;
