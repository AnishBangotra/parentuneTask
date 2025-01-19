import * as React from "react";
import Svg, { Path } from "react-native-svg";
const AddIcon = (props) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.63619 0H6.36349V6.36349H5.5632e-08L0 7.6362H6.36349V14H7.63619V7.6362H13.9998V6.36349H7.63619V0Z"
      fill="black"
    />
  </Svg>
);
export default AddIcon;