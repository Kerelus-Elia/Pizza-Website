"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const writejsonfile_1 = require("../middleware/writejsonfile");
const loginroute = (0, express_1.Router)();
loginroute.get("/login", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../public/login.html"));
});
loginroute.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const data = yield (0, writejsonfile_1.readjsonfile)();
        const find = data.find(c => c.email === email && c.password === password);
        if (find) {
            req.session.customer = {
                fullname: find.fullname,
                email: find.email
            };
            res.json({ success: true });
        }
        else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    }
    catch (e) {
        console.log("error", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = loginroute;
