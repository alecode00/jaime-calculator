import { useState } from "react";
//Styles
import "./App.css";
//Components
import { Office } from "./components/Office";
import { Calculator } from "./components/Calculator";
//Enums
import { PriceType } from "./common/logic/Enums";
//Types
import type { Product } from "./common/Types";

const initTestArray: Product[] = [
  {
    id: "0",
    name: "Cartón de huevos",
    price: 3800,
    priceType: PriceType.XUNIT,
  },
  {
    id: "1",
    name: "Lomo",
    price: 50,
    priceType: PriceType.XKILOGRAM,
  },
  {
    id: "2",
    name: "Cebolla",
    price: 5,
    priceType: PriceType.XPOUND,
  },
];

function App() {
  const [productsList, setProductsList] = useState<Product[]>(initTestArray);

  return (
    <>
      <Office productsList={productsList} setProductsList={setProductsList} />
      <Calculator
        calculatorList={productsList}
        setCalculatorList={setProductsList}
      />
    </>
  );
}

export default App;
