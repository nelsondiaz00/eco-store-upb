"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Environment {
}
Environment.getDomain = () => {
    var _a, _b, _c;
    const HOST = (_a = process.env['HOST']) !== null && _a !== void 0 ? _a : 'localhost';
    const PORT = (_b = process.env['PORT']) !== null && _b !== void 0 ? _b : 3000;
    const PROTOCOL = (_c = process.env['PROTOCOL']) !== null && _c !== void 0 ? _c : 'http';
    return `${PROTOCOL}://${HOST}:${PORT}`;
};
exports.default = Environment;
