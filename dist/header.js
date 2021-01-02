"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const figlet_1 = __importDefault(require("figlet"));
const ink_1 = require("ink");
const Ascii = ({ font = "Slant Relief", horizontalLayout = "default", verticalLayout = "default", text = "", }) => {
    return (react_1.default.createElement(ink_1.Text, null, figlet_1.default.textSync(text, {
        font,
        horizontalLayout,
        verticalLayout,
    })));
};
exports.default = Ascii;
