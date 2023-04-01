import { Request, Response } from "express";
import market from "./database";
import { IMarketResponse, IProduct, TFoodProduct } from "./interfaces";

let idCounter = 0;

const createProducts = (req: Request, res: Response): Response => {
  const productData: TFoodProduct = req.body;


  const products = Array.isArray(productData) ? productData : [productData];

  const marketProducts: IProduct[] = [];

  const date = new Date(Date.now() + (365 * 24 * 60 * 60 * 1000));

  products.forEach((product) => {
    const productExists = market.some((existingProduct) => existingProduct.name === product.name);
    if (productExists) {
      return res.status(409).json({ error: "Product already exists" });
    }

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
    marketProducts.push(newProduct);
    idCounter++;
  });

  const total = market.reduce((acc, product) => acc + product.price, 0);

  return res.status(201).json({ total, marketProducts });
};


const listProduct = (req: Request, res: Response): Response => {
  const total = market.reduce((acc, product) => acc + product.price, 0);
  const response: IMarketResponse = {
    total,
    marketProducts: market,
  };
  return res.json(response);
};

const listProductId = (req: Request, res: Response): Response => {
  const id = parseInt(req.params.id);
  const findIndex = market.find((prod) => prod.id === id);

  if (!findIndex) {
    return res.status(404).json({
      error: "Product not found",
    });
  }
  console.log(findIndex)
  return res.status(200).json(findIndex);
};
const deleteProduct = (req: Request, res: Response): Response => {
  const id = parseInt(req.params.id);
  const findIndex = market.findIndex((prod) => prod.id === id);
  if (findIndex === -1) {
    res.status(404).json({
      error: "Product not found",
    });
  } else {
    market.splice(findIndex, 1);
  }
  return res.status(204).send();
};


const updateProduct = (req: Request, res: Response): Response => {
  const id = parseInt(req.params.id);
  const index = market.findIndex((prod) => prod.id === id);
  
  if (index === -1) { 
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  const updateData = req.body;
  const findProductName = market.find((prod)=> prod.name == updateData.name)

  if (findProductName){
    return res.status(409).json({ error: 'Produto já existente'})
  }

  const updatedProduct = {
    ...market[index],
    ...updateData,
    id: market[index].id,
    section: market[index].section,
     expirationDate: market[index].expirationDate,
  };
  market[index] = updatedProduct;

  return res.json(market[index]);
};



export {
  createProducts,
  listProduct,
  listProductId,
  deleteProduct,
  updateProduct,
};
