"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const ink_ascii_1 = __importDefault(require("ink-ascii"));
const App = () => (react_1.default.createElement(ink_1.Text, null,
    react_1.default.createElement(ink_ascii_1.default, { font: "Slant Relief", horizontalLayout: "default", verticalLayout: "default", text: "Yeah!" })));
module.exports = App;
exports.default = App;
