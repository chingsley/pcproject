const ON = 1;

export const drawBorder = (color?: string) => {
  if (ON) return `1px solid ${color || 'red'}`;
  return 'none';
};