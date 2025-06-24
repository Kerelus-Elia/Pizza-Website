import { Router, Request, Response } from "express";
import { validcustomer } from "../middleware/validator";
import { validationResult } from "express-validator";
import path from "path";
import { customer } from "../modules/customer";
import { readjsonfile, writejsonfile } from "../middleware/writejsonfile";
import { read } from "fs";

const signup = Router();

signup.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/signup.html"));
});

signup.post("/signup", validcustomer(), async (req: Request, res: Response) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
      return;
    }
    const { fullname, email, password } = req.body;
    const data = new customer(fullname, email, password);
    let read = await readjsonfile();
    let check = read.find((c) => c.email === email);
    if (check) {
      res.json({ message: "email already exists" });
      return;
    }
    await writejsonfile("customers.json", data);
    res.redirect("/login");
  } 
  catch (err) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

export default signup;