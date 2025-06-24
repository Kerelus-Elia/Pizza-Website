"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const mainRoute_1 = __importDefault(require("./routes/mainRoute"));
const signupRoute_1 = __importDefault(require("./routes/signupRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const reserveRoute_1 = __importDefault(require("./routes/reserveRoute"));
const app = (0, express_1.default)();
const port = 5003;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use((0, express_session_1.default)({
    secret: "key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120000
    }
}));
app.use("/", signupRoute_1.default);
app.use("/", loginRoute_1.default);
app.use("/", mainRoute_1.default);
app.use("/", orderRoute_1.default);
app.use("/", reserveRoute_1.default);
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
