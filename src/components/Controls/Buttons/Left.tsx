import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {Colors} from 'react-native-ui-lib';

export const Left = ({size = 25, color = Colors.button}) => (
  <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
    <Path
      d="M0,12A12,12,0,1,1,12,24,12.013,12.013,0,0,1,0,12Zm22,0A10,10,0,1,0,12,22,10.011,10.011,0,0,0,22,12ZM8.586,13.414,13.3,18.126l1.414-1.414L10,12l4.673-4.673L13.259,5.913,8.586,10.586a2,2,0,0,0,0,2.828Z"
      fill={color}
      stroke={color}
      strokeWidth={1}
    />
  </Svg>
);
