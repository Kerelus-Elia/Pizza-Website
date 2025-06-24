import { Router } from "express";
import path from "path"
import { customer } from "../modules/customer";
import { readjsonfile } from "../middleware/writejsonfile";

const loginroute=Router();

loginroute.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../public/login.html"))
});

loginroute.post("/login", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const data: customer[] = await readjsonfile();
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
});

export default loginroute;