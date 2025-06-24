import { check } from "express-validator";

export const validcustomer = () => {
    return [
        check("fullname").notEmpty().withMessage("please entr your right name"),
        check("email").notEmpty().withMessage("please enter your right email"),
        check("password").notEmpty().withMessage("please enetr valid password")
    ]
}