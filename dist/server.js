"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
var app = express_1.default();
var apiKey = process_1.default.env.API_KEY;
let staticPath = path_1.default.join(__dirname, 'web');
app.use(express_1.default.static(staticPath));
console.log(`Static files being loaded from here: ${staticPath}`);
app.get('/', (req, res) => {
    res.send('Hello from Typescript');
});
app.listen(3000, () => {
    console.log(`Listening on port 3000 with API key ${apiKey}`);
});
