import path from "path";
import { Router, Request, Response } from "express";
import { readjsonfile, writejsonfile } from "../middleware/writejsonfile";
import { customer } from "../modules/customer";
import { validationResult } from "express-validator";
import { reservetable } from "../modules/Table";

const reserveRoute = Router();
const reservepage = path.join(__dirname, "../../public/reservation.html");

reserveRoute.get("/reserve", (req, res) => {
  res.sendFile(reservepage);
});

reserveRoute.post("/reserve", async (req: any, res: any) => {
  try {
    let errors = validationResult(req);
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
    let reservations = await readjsonfile();
    const found = reservations.find(
      (r: any) => (r.name === name || r.phone === phone) && r.date === date
    );
    if (found) {
      return res
        .status(400)
        .json({
          message:
            "A reservation with the same name or phone number already exists on this date.",
        });
    }

    const data = new reservetable(name, phone, nogates, date, time);
    await writejsonfile("reservations.json", data);
    res.json({ message: "The table has been successfully reserved!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

export default reserveRoute;
