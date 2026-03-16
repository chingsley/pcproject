const ON = 0;

export const drawBorder = (color?: string) => {
  if (ON) return `1px solid ${color || 'red'}`;
  return 'none';
};