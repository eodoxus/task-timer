import React from 'react';
import {View} from 'react-native';
import type {StyleProp, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {Colors} from 'react-native-ui-lib';

import {useCountdown} from './useCountdown';
import {getWrapperStyle, timeStyle} from './utils';

export const CountdownCircle = props => {
  const {
    children,
    duration,
    remainingTime,
    strokeLinecap,
    trailColor,
    trailStrokeWidth,
  } = props;
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown(props);

  return (
    <View style={getWrapperStyle(size) as StyleProp<ViewStyle>}>
      <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <Path
          d={path}
          fill="none"
          stroke={trailColor ?? Colors.button}
          strokeWidth={trailStrokeWidth ?? strokeWidth}
        />
        {elapsedTime !== duration && (
          <Path
            d={path}
            fill="none"
            stroke={stroke}
            strokeLinecap={strokeLinecap ?? 'round'}
            strokeWidth={strokeWidth}
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
          />
        )}
      </Svg>
      {typeof children === 'function' && (
        <View style={timeStyle as StyleProp<ViewStyle>}>
          {children({remainingTime, elapsedTime, color: stroke})}
        </View>
      )}
    </View>
  );
};

CountdownCircle.displayName = 'CountdownCircle';
