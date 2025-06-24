"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validcustomer = void 0;
const express_validator_1 = require("express-validator");
const validcustomer = () => {
    return [
        (0, express_validator_1.check)("fullname").notEmpty().withMessage("please entr your right name"),
        (0, express_validator_1.check)("email").notEmpty().withMessage("please enter your right email"),
        (0, express_validator_1.check)("password").notEmpty().withMessage("please enetr valid password")
    ];
};
exports.validcustomer = validcustomer;
