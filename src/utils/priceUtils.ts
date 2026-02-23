export const calculateDiscountedPrice = (price: number, discount: number): number => {
  return price - (price * discount / 100);
};

export const calculateSavings = (price: number, discount: number): number => {
  return price * discount / 100;
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};
