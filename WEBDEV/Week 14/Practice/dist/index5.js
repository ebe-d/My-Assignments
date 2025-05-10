"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const express_1 = __importDefault(require("express"));
const App = (0, express_1.default)();
const UserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Need one' }),
    email: zod_1.z.string().email({ message: 'hello' }),
    age: zod_1.z.number().min(18, { message: 'should be above 18' }).optional()
});
App.put('/user', (req, res) => {
    const Parsedata = UserSchema.safeParse(req.body);
    if (!Parsedata.success) {
        res.status(500).json({});
        return;
    }
    const updatedBody = Parsedata.data;
    res.json({
        updatedBody,
        message: "user updated"
    });
});
App.listen(3000);
