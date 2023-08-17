import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {Colors} from 'react-native-ui-lib';

export const Vibrate = ({size = 25, color = Colors.button}) => (
  <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
    <Path
      d="M12,24C5.38,24,0,18.62,0,12S5.38,0,12,0s12,5.38,12,12-5.38,12-12,12Zm0-22C6.49,2,2,6.49,2,12s4.49,10,10,10,10-4.49,10-10S17.51,2,12,2Zm0,17c-.17,0-.34-.04-.5-.13-.48-.27-.65-.89-.37-1.36l2.58-4.5h-4.09c-.51,0-.99-.24-1.3-.65s-.4-.94-.25-1.43c.02-.07,3.06-5.41,3.06-5.41,.27-.48,.88-.65,1.36-.37,.48,.27,.65,.88,.37,1.36l-2.57,4.5h4.1c.59,0,1.13,.32,1.41,.85s.25,1.15-.08,1.64l-2.86,5.01c-.18,.32-.52,.5-.87,.5Zm2.03-6.56s0,.01-.01,.02v-.02Z"
      fill={color}
      stroke={color}
      strokeWidth={1}
    />
  </Svg>
);
