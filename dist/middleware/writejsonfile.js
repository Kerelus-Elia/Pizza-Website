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
exports.writejsonfile = writejsonfile;
exports.readjsonfile = readjsonfile;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
let filepath = path_1.default.join(__dirname, "../../customers.json");
function exists(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.access(file);
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
function writejsonfile(file, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (yield exists(file)) {
                const rawdata = yield promises_1.default.readFile(file, "utf8");
                const sub = yield JSON.parse(rawdata);
                sub.push(data);
                yield promises_1.default.writeFile(file, JSON.stringify(sub, null, 2));
            }
            else {
                yield promises_1.default.writeFile(file, JSON.stringify(data, null, 2));
            }
        }
        catch (e) {
            console.log("error");
        }
    });
}
function readjsonfile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.access(filepath);
            const data = yield promises_1.default.readFile(filepath, "utf8");
            return JSON.parse(data);
        }
        catch (e) {
            console.log("error");
            return [];
        }
    });
}
