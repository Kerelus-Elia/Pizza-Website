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
const path_1 = __importDefault(require("path"));
const express_1 = require("express");
const writejsonfile_1 = require("../middleware/writejsonfile");
const express_validator_1 = require("express-validator");
const Table_1 = require("../modules/Table");
const reserveRoute = (0, express_1.Router)();
const reservepage = path_1.default.join(__dirname, "../../public/reservation.html");
reserveRoute.get("/reserve", (req, res) => {
    res.sendFile(reservepage);
});
reserveRoute.post("/reserve", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        if (!req.session.customer) {
            return res.status(401).json({ message: "Please login first." });
        }
        const { name, phone, nogates, date, time } = req.body;
        if (!name || !phone || !nogates || !date || !time) {
            return res
                .status(400)
                .json({ message: "Please enter all required fields." });
        }
        const phoneRegex = /^01[0-9]{9}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "The phone number is invalid." });
        }
        // مش شغاله في حاجه غلط
        let reservations = yield (0, writejsonfile_1.readjsonfile)();
        const found = reservations.find((r) => (r.name === name || r.phone === phone) && r.date === date);
        if (found) {
            return res
                .status(400)
                .json({
                message: "A reservation with the same name or phone number already exists on this date.",
            });
        }
        const data = new Table_1.reservetable(name, phone, nogates, date, time);
        yield (0, writejsonfile_1.writejsonfile)("reservations.json", data);
        res.json({ message: "The table has been successfully reserved!" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
}));
exports.default = reserveRoute;
