import express, { Application, json } from "express";
import { createProducts, deleteProduct, listProduct, listProductId, updateProduct } from "./logic";

const app: Application = express();
app.use(json());

app.post("/products", createProducts);
app.get("/products", listProduct);
app.get("/products/:id", listProductId);
app.delete("/products/:id", deleteProduct);
app.patch("/products/:id", updateProduct)

const PORT: number = 3000;
const runningMsg = `Server running on http://localhost:${PORT}`;

app.listen(PORT, () => console.log(runningMsg));

// npx tsc --init
//cria um arquivo tsconfig.json
//npm install -D @types/express ts-node-dev typescript
//npx ts-node-dev src/app.ts
