import * as React from "react"
const DeleteIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={40}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M0 6a6 6 0 0 1 6-6h36a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6Z"
    />
    <path
      stroke="#EF4444"
      strokeOpacity={0.5}
      d="M6 .5h36A5.5 5.5 0 0 1 47.5 6v28a5.5 5.5 0 0 1-5.5 5.5H6A5.5 5.5 0 0 1 .5 34V6A5.5 5.5 0 0 1 6 .5Z"
    />
    <path
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 16h12m-1.333 0v9.333c0 .667-.667 1.334-1.334 1.334h-6.666c-.667 0-1.334-.667-1.334-1.334V16m2 0v-1.333c0-.667.667-1.334 1.334-1.334h2.666c.667 0 1.334.667 1.334 1.334V16"
    />
  </svg>
)
export default DeleteIcon 
