"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.signUpInput = void 0;
const zod_1 = __importStar(require("zod"));
exports.signUpInput = zod_1.default.object({
    username: zod_1.default.string().min(3).max(16),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(3).max(15),
    name: zod_1.default.string().optional(),
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(3).max(15),
});
exports.createBlogInput = zod_1.default.object({
    title: (0, zod_1.string)(),
    content: (0, zod_1.string)(),
    published: (0, zod_1.boolean)(),
});
exports.updateBlogInput = zod_1.default.object({
    title: (0, zod_1.string)(),
    content: (0, zod_1.string)(),
    id: (0, zod_1.string)(),
});
