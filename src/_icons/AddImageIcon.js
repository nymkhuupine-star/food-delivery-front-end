import * as React from "react"
const AddImage = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#09090B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14 10-2.057-2.057a1.333 1.333 0 0 0-1.886 0L4 14M3.333 2h9.334C13.403 2 14 2.597 14 3.333v9.334c0 .736-.597 1.333-1.333 1.333H3.333A1.333 1.333 0 0 1 2 12.667V3.333C2 2.597 2.597 2 3.333 2Zm4 4a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0Z"
    />
  </svg>
)
export default AddImage
