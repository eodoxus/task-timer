import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {Colors} from 'react-native-ui-lib';

export const Home = ({size = 25, color = Colors.button}) => (
  <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
    <Path
      d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10,10,0,0,1,12,22Z"
      fill={color}
      stroke={color}
      strokeWidth={1}
    />
  </Svg>
);
