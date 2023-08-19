import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {Colors} from 'react-native-ui-lib';

export const Right = ({size = 25, color = Colors.button}) => (
  <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
    <Path
      d="M24,12A12,12,0,1,1,12,0,12.013,12.013,0,0,1,24,12ZM2,12A10,10,0,1,0,12,2,10.011,10.011,0,0,0,2,12Zm13.414-1.414L10.7,5.874,9.289,7.288,14,12,9.327,16.673l1.414,1.414,4.673-4.673a2,2,0,0,0,0-2.828Z"
      fill={color}
      stroke={color}
      strokeWidth={1}
    />
  </Svg>
);
