"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const orderrouter = (0, express_1.Router)();
const ordersFile = path_1.default.join(__dirname, "../../orders.json");
orderrouter.get("/api/cart", (req, res) => {
    res.sendFile(ordersFile);
});
orderrouter.post("/api/cart", (req, res) => {
    if (!req.session.customer) {
        return res.status(401).json({ message: "Please login first." });
    }
    const order = {
        user: req.session.customer,
        cart: req.body.cart,
        date: new Date().toISOString(),
    };
    let orders = [];
    if (fs_1.default.existsSync(ordersFile)) {
        const data = fs_1.default.readFileSync(ordersFile, "utf-8");
        if (data) {
            orders = JSON.parse(data);
        }
    }
    orders.push(order);
    fs_1.default.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
    res.json({ message: "Order placed successfully!" });
});
exports.default = orderrouter;
