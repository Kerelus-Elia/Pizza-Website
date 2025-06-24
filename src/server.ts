import express from "express";
import path from "path";
import session from "express-session";
import { customer } from "./modules/customer";
import mainroute from "./routes/mainRoute";
import signup from "./routes/signupRoute";
import loginroute from "./routes/loginRoute";
import orderrouter from "./routes/orderRoute";
import reserveRoute from "./routes/reserveRoute";
const app = express();
const port = 5003 ;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"../public")));
app.use(session({
    secret:"key",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:120000
    }
}));

declare module "express-session" {
    interface SessionData {
        customer?:{
            fullname: string;
            email: string;
            password: any;
        }
     }
}
app.use("/",signup);
app.use("/",loginroute);
app.use("/",mainroute);
app.use("/" , orderrouter)
app.use("/" , reserveRoute)
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});