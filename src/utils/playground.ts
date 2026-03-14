const IS_OFF = 1;

export const drawBorder = (color?: string) => {
  if (IS_OFF) return 'none';

  return `1px solid ${color || 'red'}`;
};