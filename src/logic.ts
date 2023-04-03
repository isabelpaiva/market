import { Request, Response } from "express";
import market from "./database";
import { IMarketResponse, IProduct, TFoodProduct } from "./interfaces";

let idCounter = 0;

const createProducts = (request: Request, response: Response): Response => {
  const productData: TFoodProduct = request.body;

  const products = Array.isArray(productData) ? productData : [productData];

  const newProductData: IProduct[] = [];

  const date = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

  products.forEach((product) => {
    const newProduct: IProduct = {
      id: idCounter,
      name: product.name,
      price: product.price,
      weight: product.weight,
      calories: product.calories,
      section: product.section,
      expirationDate: date,
    };

    market.push(newProduct);
    newProductData.push(newProduct);
    idCounter++;
  });

  const total = market.reduce((acc, product) => acc + product.price, 0);

  return response.status(201).json({ total, newProductData });
};

const listProduct = (request: Request, response: Response): Response => {
  const total = market.reduce((acc, product) => acc + product.price, 0);
  const data: IMarketResponse = {
    total,
    marketProducts: market,
  };
  return response.json(data);
};

const listProductById = (request: Request, response: Response): Response => {
  const id = parseInt(request.params.id);
  const index = market.find((prod) => prod.id === id);

  return response.status(200).json(index);
};

const deleteProduct = (request: Request, response: Response): Response => {
  const id = parseInt(request.params.id);
  const findIndex = market.findIndex((prod) => prod.id === id);

  market.splice(findIndex, 1);

  return response.status(204).send();
};

const updateProduct = (request: Request, response: Response): Response => {
  const id = parseInt(request.params.id);
  const index = market.findIndex((prod) => prod.id === id);
  const updateData = request.body;

  const updatedProduct = {
    ...market[index],
    ...updateData,
    id: market[index].id,
    section: market[index].section,
    expirationDate: market[index].expirationDate,
  };
  market[index] = updatedProduct;

  return response.json(market[index]);
};

export {
  createProducts,
  listProduct,
  listProductById,
  deleteProduct,
  updateProduct,
};
