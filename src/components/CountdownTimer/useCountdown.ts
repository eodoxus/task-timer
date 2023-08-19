import {getPathProps} from './utils';

const linearEase = (
  time: number,
  start: number,
  goal: number,
  duration: number,
  isGrowing: boolean,
) => {
  if (duration === 0) {
    return start;
  }

  const currentTime = (isGrowing ? duration - time : time) / duration;
  return start + goal * currentTime;
};

const getRGB = (color: string) =>
  color
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`,
    )
    .substring(1)
    .match(/.{2}/g)
    ?.map(x => parseInt(x, 16)) ?? [];

const getStroke = (props, remainingTime: number) => {
  const {colors, colorsTime, isSmoothColorTransition = true} = props;
  if (typeof colors === 'string') {
    return colors;
  }

  const index =
    colorsTime?.findIndex(
      (time, i) => time >= remainingTime && remainingTime >= colorsTime[i + 1],
    ) ?? -1;

  if (!colorsTime || index === -1) {
    return colors[0];
  }

  if (!isSmoothColorTransition) {
    return colors[index];
  }

  const currentTime = colorsTime[index] - remainingTime;
  const currentDuration = colorsTime[index] - colorsTime[index + 1];
  const startColorRGB = getRGB(colors[index]);
  const endColorRGB = getRGB(colors[index + 1]);
  const isGrowing = !!props.isGrowing;

  return `rgb(${startColorRGB
    .map(
      (color, idx) =>
        // eslint-disable-next-line no-bitwise
        linearEase(
          currentTime,
          color,
          endColorRGB[idx] - color,
          currentDuration,
          isGrowing,
        ) | 0,
    )
    .join(',')})`;
};

export const useCountdown = props => {
  const {
    duration,
    remainingTime = 0,
    size = 180,
    strokeWidth = 12,
    trailStrokeWidth,
    isGrowing = false,
    rotation = 'clockwise',
  } = props;
  const maxStrokeWidth = Math.max(strokeWidth, trailStrokeWidth ?? 0);
  const {path, pathLength} = getPathProps(size, maxStrokeWidth, rotation);

  const elapsedTime = duration - remainingTime;

  return {
    elapsedTime,
    path,
    pathLength,
    rotation,
    size,
    stroke: getStroke(props, remainingTime),
    strokeDashoffset: linearEase(
      elapsedTime,
      0,
      pathLength,
      duration,
      isGrowing,
    ),
    strokeWidth,
  };
};
