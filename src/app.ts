import express, { Application, json } from "express";
import {
  createProducts,
  deleteProduct,
  listProduct,
  listProductById,
  updateProduct,
} from "./logic";
import { ensureIdExists, ensureProductExists } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/products", ensureProductExists, createProducts);
app.get("/products", listProduct);
app.get("/products/:id", ensureIdExists, listProductById);
app.delete("/products/:id", ensureIdExists, deleteProduct);
app.patch("/products/:id", ensureIdExists, ensureProductExists, updateProduct);

const PORT: number = 3000;
const message = `Server running on http://localhost:${PORT}`;

app.listen(PORT, () => console.log(message));
