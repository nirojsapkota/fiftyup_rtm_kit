export const getColor = (color, theme) => {
  const variantColor = theme.colors.variants[theme.variant][color];

  return (
    variantColor || theme.colors.grayscale[color] || theme.colors.social[color]
  );
};
