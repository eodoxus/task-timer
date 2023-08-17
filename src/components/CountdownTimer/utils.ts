export const getPathProps = (
  size: number,
  strokeWidth: number,
  rotation: 'clockwise' | 'counterclockwise',
) => {
  const halfSize = size / 2;
  const halfStrokeWith = strokeWidth / 2;
  const arcRadius = halfSize - halfStrokeWith;
  const arcDiameter = 2 * arcRadius;
  const rotationIndicator = rotation === 'clockwise' ? '1,0' : '0,1';

  const pathLength = 2 * Math.PI * arcRadius;
  const path = `m ${halfSize},${halfStrokeWith} a ${arcRadius},${arcRadius} 0 ${rotationIndicator} 0,${arcDiameter} a ${arcRadius},${arcRadius} 0 ${rotationIndicator} 0,-${arcDiameter}`;

  return {path, pathLength};
};

export const getWrapperStyle = (size: number): React.CSSProperties => ({
  position: 'relative',
  width: size,
  height: size,
});

export const timeStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

export const getIsColorBetweenColors = (color, start, end) => {
  const getIsInRange = (x: number, min: number, max: number) =>
    (x - min) * (x - max) <= 0;

  const getRGB = (color): number[] =>
    color
      .match(/(\d+),(\d+),(\d+)/)!
      .splice(1, 4)
      .map((c: string) => parseInt(c, 10));

  const colorRGB = getRGB(color);
  const startRGB = getRGB(start);
  const endRGB = getRGB(end);

  return colorRGB.every((c, index) =>
    getIsInRange(c, startRGB[index], endRGB[index]),
  );
};
