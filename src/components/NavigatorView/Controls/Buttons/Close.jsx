import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {Colors} from 'react-native-ui-lib';

export const Close = ({size = 25, color = Colors.button}) => (
  <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
    <Path
      d="m16.707,8.707l-3.293,3.293,3.293,3.293-1.414,1.414-3.293-3.293-3.293,3.293-1.414-1.414,3.293-3.293-3.293-3.293,1.414-1.414,3.293,3.293,3.293-3.293,1.414,1.414Zm7.293,3.293c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-2,0c0-5.514-4.486-10-10-10S2,6.486,2,12s4.486,10,10,10,10-4.486,10-10Z"
      fill={color}
      stroke={color}
      strokeWidth={1}
    />
  </Svg>
);
