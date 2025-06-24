"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const mainroute = (0, express_1.Router)();
mainroute.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../public/main.html"));
});
mainroute.get("/check-session", (req, res) => {
    if (req.session.customer) {
        res.json({
            fullname: req.session.customer.fullname,
            email: req.session.customer.email,
        });
    }
    else {
        res.json({});
    }
});
mainroute.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});
exports.default = mainroute;
