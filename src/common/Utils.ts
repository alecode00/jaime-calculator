export const getNumericValue = (value: unknown): number => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }

  return 0;
};

export function getProductCost(productPrice: number, productQuantify: number) {
  console.log("productPrice : ", productPrice);
  console.log("productQuantify : ", productQuantify);
  return productPrice * productQuantify;
}
