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
const validator_1 = require("../middleware/validator");
const express_validator_1 = require("express-validator");
const path_1 = __importDefault(require("path"));
const customer_1 = require("../modules/customer");
const writejsonfile_1 = require("../middleware/writejsonfile");
const signup = (0, express_1.Router)();
signup.get("/signup", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../public/signup.html"));
});
signup.post("/signup", (0, validator_1.validcustomer)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.array() });
            return;
        }
        const { fullname, email, password } = req.body;
        const data = new customer_1.customer(fullname, email, password);
        let read = yield (0, writejsonfile_1.readjsonfile)();
        let check = read.find((c) => c.email === email);
        if (check) {
            res.json({ message: "email already exists" });
            return;
        }
        yield (0, writejsonfile_1.writejsonfile)("customers.json", data);
        res.redirect("/login");
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}));
exports.default = signup;
