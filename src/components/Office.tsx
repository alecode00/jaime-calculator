import { type FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import "./office_components/office.css";

//logic
import { PriceType } from "../common/logic/Enums";
//type
import type { OfficeProps, Product } from "../common/Types";
//utils
import { getNumericValue, getProductCost } from "../common/Utils";

export function Office(props: OfficeProps) {
  const { productsList, setProductsList } = props;

  function handleAddProduct() {
    setProductsList((prev: Product[]) => [
      ...prev,
      {
        id: uuidv4(),
        name: "",
        price: 0,
        priceType: PriceType.XUNIT,
      },
    ]);
  }

  function handleDeleteProduct(productId: string) {
    const newProductList = productsList.filter(
      (product) => product.id !== productId
    );
    setProductsList(newProductList);
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>, oldProduct: Product) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    const oldQuantify = oldProduct?.quantify ?? 0;
    const newProductCost = getProductCost(
      getNumericValue(formValues["price"]),
      oldQuantify
    );

    const newProduct: Product = {
      ...oldProduct,
      id: oldProduct.id,
      name: formValues["name"] as string,
      price: getNumericValue(formValues["price"]),
      priceType: formValues["priceType"] as PriceType,
      total: newProductCost,
    };
    const newProductList = productsList.map((product) => {
      if (product.id === oldProduct.id) {
        return newProduct;
      }
      return product;
    });
    setProductsList(newProductList);
  }

  return (
    <>
      <ul className="lista-productos scroll-container">
        {productsList.map((product: Product) => (
          <li className="card-producto" key={product.id}>
            <form
              className="form-card"
              onSubmit={(e) => handleSubmit(e, product)}
            >
              <div className="grupo-campos">
                <div className="campo">
                  <label htmlFor="name">Nombre del producto</label>
                  <input
                    type="text"
                    defaultValue={product.name}
                    name="name"
                    placeholder="Introduzca nombre del producto"
                  />
                </div>
                <div className="campo">
                  <label htmlFor="price">Precio del producto</label>
                  <input
                    type="number"
                    step="any"
                    defaultValue={product.price}
                    name="price"
                    placeholder="Introduzca precio del producto"
                  />
                </div>
                <div className="campo">
                  <label htmlFor="priceType">Precio por:</label>
                  <select title="Tipo de precio" name="priceType">
                    <option value={PriceType.XUNIT}>{PriceType.XUNIT}</option>
                    <option value={PriceType.XPOUND}>{PriceType.XPOUND}</option>
                    <option value={PriceType.XKILOGRAM}>
                      {PriceType.XKILOGRAM}
                    </option>
                  </select>
                </div>
              </div>
              <div className="acciones">
                <button className="btn-guardar" type="submit">
                  Guardar ✔
                </button>
                <button
                  className="btn-eliminar"
                  type="button"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Eliminar 🗑
                </button>
              </div>
            </form>
          </li>
        ))}
      </ul>
      <button
        className="btn-anadir"
        type="button"
        onClick={() => {
          handleAddProduct();
        }}
      >
        ➕ Crear producto
      </button>
    </>
  );
}
