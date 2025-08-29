import type { PriceType } from "./logic/Enums";

export interface Product {
  id: string;
  name: string;
  price: number;
  priceType: PriceType;
  quantify?: number;
  total?: number;
  selected?: boolean;
}

export interface OfficeProps {
  productsList: Product[];
  setProductsList: Function;
}

export interface CalculatorProps {
  calculatorList: Product[];
  setCalculatorList: Function;
}

