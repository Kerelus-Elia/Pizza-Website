import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";

const orderrouter = Router();

const ordersFile = path.join(__dirname, "../../orders.json"); 

orderrouter.get("/api/cart" , (req , res) =>{
  res.sendFile(ordersFile) ;
});

orderrouter.post("/api/cart", (req: any, res: any) => {
  if (!req.session.customer) {
    return res.status(401).json({ message: "Please login first." });
  }

  const order = {
    user: req.session.customer,
    cart: req.body.cart,
    date: new Date().toISOString(),
  };

  let orders = [];

  if (fs.existsSync(ordersFile)) {
    const data = fs.readFileSync(ordersFile, "utf-8");
    if (data) {
      orders = JSON.parse(data);
    }
  }

  orders.push(order);

  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

 res.json({ message: "Order placed successfully!" });
});

export default orderrouter;