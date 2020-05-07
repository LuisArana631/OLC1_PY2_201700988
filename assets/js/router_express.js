"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.post('/analizar/', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo bien!'
    });
});
exports.default = router;
