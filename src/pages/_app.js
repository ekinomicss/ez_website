"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const react_1 = __importDefault(require("react"));
const google_1 = require("next/font/google");
const head_1 = __importDefault(require("next/head"));
require("../styles/globals.css");
// Initialize font
const inter = (0, google_1.Inter)({ subsets: ['latin'] });
function App({ Component, pageProps }) {
    return (<>
            <head_1.default>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Ekin's Blog</title>
                <meta name="description" content="Your app description"/>
                {/* Add any other meta tags you need */}
            </head_1.default>

            <main className={inter.className}>
                <Component {...pageProps}/>
            </main>
        </>);
}
