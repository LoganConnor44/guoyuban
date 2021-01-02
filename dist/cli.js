#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const Ascii_1 = __importDefault(require("./Ascii"));
require("mongodb-typescript");
const Movie_1 = __importDefault(require("./Movie"));
const ink_select_input_1 = __importDefault(require("ink-select-input"));
const NonIndicator = ({ isSelected = false }) => (react_1.default.createElement(ink_1.Text, null));
const NonItem = ({ label }) => (react_1.default.createElement(ink_1.Text, null, label));
const App = () => {
    const [items1, setItems1] = react_1.useState([]);
    const [items2, setItems2] = react_1.useState([]);
    const [items3, setItems3] = react_1.useState([]);
    const [items4, setItems4] = react_1.useState([]);
    const [selectedName, setSelectedName] = react_1.useState('');
    const [selectedStream, setSelectedStream] = react_1.useState('');
    const [selectedChineseName, setSelectedChineseName] = react_1.useState('');
    const [selectedId, setSelectedId] = react_1.useState('');
    react_1.useEffect(() => {
        const getAllRecords = () => {
            Movie_1.default.find({ 'healthy-stream': { $eq: true }, 'english': { $ne: '' } }).sort({ 'english': 1 }).then((movies) => {
                movies.forEach((movie, index) => {
                    if (movie.english.trim() !== '') {
                        // if (index <= 14) {
                        // 	items1.unshift({
                        // 		label: '',
                        // 		value: index
                        // 	});
                        // }
                        // items1.push({
                        // 	label: movie.english.substr(0,30),
                        // 	value: Number(movie._id)
                        // });
                        items2.push({
                            label: movie.english.substr(0, 30),
                            value: Number(movie._id)
                        });
                        if (index > 14) {
                            items3.push({
                                label: movie.english.substr(0, 30),
                                value: Number(movie._id)
                            });
                        }
                        if (index > 29) {
                            items4.push({
                                label: movie.english.substr(0, 30),
                                value: Number(movie._id)
                            });
                        }
                    }
                });
                setItems1(items1);
                setItems2(items2);
                setItems3(items3);
                setItems4(items4);
            });
        };
        getAllRecords();
    }, [items2]);
    const handleSelect = (item) => {
        if (item.value !== Number(selectedId)) {
            setSelectedName(item.label);
            Movie_1.default.findOne({ _id: { $eq: item.value.toString() } }, (err, movie) => {
                if (movie !== null) {
                    setSelectedStream(movie.stream);
                    setSelectedChineseName(movie.chinese);
                    setSelectedId(movie._id);
                }
            });
        }
        else {
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Ascii_1.default, { font: "Doh", horizontalLayout: "fitted", verticalLayout: "default", text: "GuoYu Ban" }),
        react_1.default.createElement(ink_1.Box, { height: 15, flexDirection: "row" },
            react_1.default.createElement(ink_1.Box, { flexGrow: 1, flexDirection: "column", marginLeft: 1, marginRight: 1 },
                react_1.default.createElement(ink_1.Text, null, selectedName),
                react_1.default.createElement(ink_1.Text, null, selectedChineseName),
                react_1.default.createElement(ink_1.Text, null, selectedStream)),
            react_1.default.createElement(ink_1.Box, { flexGrow: 1, flexDirection: "column", marginLeft: 1, marginRight: 1 },
                react_1.default.createElement(ink_select_input_1.default, { key: 2, items: items2, onHighlight: handleSelect, limit: 15 })),
            react_1.default.createElement(ink_1.Box, { flexGrow: 1, flexDirection: "column", marginLeft: 1, marginRight: 1 },
                react_1.default.createElement(ink_select_input_1.default, { key: 3, items: items3, indicatorComponent: NonIndicator, itemComponent: NonItem, limit: 15 })),
            react_1.default.createElement(ink_1.Box, { flexGrow: 1, flexDirection: "column", marginLeft: 1, marginRight: 1 },
                react_1.default.createElement(ink_select_input_1.default, { key: 4, items: items4, indicatorComponent: NonIndicator, itemComponent: NonItem, limit: 15 })))));
};
ink_1.render(react_1.default.createElement(App, null));
