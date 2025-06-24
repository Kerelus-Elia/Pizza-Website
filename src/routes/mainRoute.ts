import { Router } from "express";
import path from "path";
import { customer } from "../modules/customer";

const mainroute=Router();

mainroute.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../public/main.html"))
})
mainroute.get("/check-session",(req,res)=>{
    if(req.session.customer)
    {
        res.json({
           fullname:req.session.customer.fullname,
           email:req.session.customer.email,
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
export default mainroute; 