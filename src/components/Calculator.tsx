import React, { useEffect, useState } from "react";

import type { CalculatorProps, Product } from "../common/Types";
import "./calculator_components/calculator.css";
import { getProductCost } from "../common/Utils";

export const Calculator = (props: CalculatorProps) => {
  const { calculatorList, setCalculatorList } = props;

  const [selectedValue, setSelectedValue] = useState("");
  const [isEmptySelectableList, setIsEmptySelectableList] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const findedSelectableProduct = calculatorList.find(
      (product) => product.selected === false
    );
    if (!findedSelectableProduct) {
      setIsEmptySelectableList(true);
    } else {
      setIsEmptySelectableList(false);
    }
  }, [calculatorList]);


  useEffect(() => {
    console.log("Algún total cambió");
    let newGrandTotal = 0;
    calculatorList.forEach((product) => {
      if (!product?.total) {
        product.total = 0;
      }
      newGrandTotal += product?.total;
    });
    setGrandTotal(newGrandTotal);
  }, [calculatorList.map((product) => product.total).join("|")]);

  function handleQuantifyOnBlur(
    productId: string,
    e: React.FocusEvent<HTMLInputElement>,
    productPrice: number
  ) {
    const newQuantify = Number(e.target.value);
    console.log(e.target.value);
    const newProductCost = getProductCost(productPrice, newQuantify);
    const newCalculatorList = calculatorList.map((item: Product) => {
      if (item.id === productId) {
        return {
          ...item,
          quantify: Number(e.target.value),
          total: newProductCost,
        };
      }
      return item;
    });
    setCalculatorList(newCalculatorList);
  }

  function handleSelectOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedProductId = e.target.value;
    const newCalculatorList = calculatorList.map((product) => {
      if (product.id === selectedProductId) {
        const newProduct = {
          ...product,
          selected: true,
        };
        return newProduct;
      }
      return product;
    });
    setCalculatorList(newCalculatorList);
    setSelectedValue("");
  }

  return (
    <>
      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {calculatorList.map(
            (product) =>
              product.selected && (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>
                    <input
                      type="number"
                      name="quantify"
                      step="any"
                      placeholder="Cantidad"
                      onBlur={(e) =>
                        handleQuantifyOnBlur(product.id, e, product.price)
                      }
                      defaultValue={0}
                    />
                  </td>
                  <td>{product.total}</td>
                </tr>
              )
          )}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={2}>Total General:</td>
            <td className="grand-total-value">{grandTotal}</td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-select">
        <select
          className="select-productos"
          onChange={(e) => handleSelectOnChange(e)}
          name="newProduct"
          value={selectedValue || ""}
          title="Productos"
        >
          <option value={""} disabled>
            {isEmptySelectableList
              ? "Añadir producto"
              : "No existen productos para añadir"}
          </option>
          {calculatorList.map(
            (product) =>
              product.selected || (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              )
          )}
        </select>
      </div>
    </>
  );
};
