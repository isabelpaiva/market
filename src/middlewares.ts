import { NextFunction, Request, Response } from "express";
import market from "./database";
import { TFoodProduct } from "./interfaces";

const ensureIdExists = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const validateId = market.some((product) => product.id === parseInt(id));

  if (!validateId) {
    res.status(404).json({
      error: "Product not found",
    });
  }

  next();
};

const ensureProductExists = ( req: Request, res: Response,next: NextFunction) => {
  const productData: TFoodProduct = req.body;
  const products = Array.isArray(productData) ? productData : [productData];

  products.forEach((product) => {
    const productExist = market.some(
      (existingProduct) => existingProduct.name === product.name
    );
    if (productExist) {
      return res.status(409).json({ error: "Product already exists" });
    }
  });

  
  next();
};

export { ensureIdExists, ensureProductExists };
