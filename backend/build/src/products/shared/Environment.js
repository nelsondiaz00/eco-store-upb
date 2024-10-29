"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Environment {
    static getDomain = () => {
        const HOST = process.env['HOST'] ?? 'localhost';
        const PORT = process.env['PORT'] ?? 3000;
        const PROTOCOL = process.env['PROTOCOL'] ?? 'http';
        return `${PROTOCOL}://${HOST}:${PORT}`;
    };
}
exports.default = Environment;
