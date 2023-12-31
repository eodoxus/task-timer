import React from 'react';
import {G, Path, Svg} from 'react-native-svg';
import {Colors} from 'react-native-ui-lib';

export const Volume = ({size = 25, color = Colors.button}) => (
  <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
    <G>
      <Path
        d="M2,5.99a2,2,0,0,0-2,2v8.014a2,2,0,0,0,2,2H4.8L12,24V0L4.8,5.99Zm8-1.722V19.729L5.525,16.007H2V7.993H5.525Z"
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
      <Path
        d="M20,12a5.009,5.009,0,0,0-5-5.008H14v2h1a3.005,3.005,0,0,1,0,6.01H14v2h1A5.01,5.01,0,0,0,20,12Z"
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
      <Path
        d="M15,2.985H14v2h1a7.012,7.012,0,0,1,0,14.024H14v2h1a9.015,9.015,0,0,0,0-18.03Z"
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </G>
  </Svg>
);
