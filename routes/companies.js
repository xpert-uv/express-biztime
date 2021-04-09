const express = require('express');
let router = new express.Router();
const db = require('../db');

router.get("/", async (req, res, next) => {
    try {
        const result = await db.query("select * from companies;")
        console.log(result);
        return res.json({ companies: result.rows });
    } catch (e) {
        return next(e);
    }
})

router.get("/:code", async (req, res, next) => {
    try {
        const { code } = req.params;
        const result = await db.query(`Select * from companies where code=$1`, [code]);
        return res.json({ companies: result.rows });
    } catch (e) {
        next(e);
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { code, name, description } = req.body;
        const result = await db.query("Insert into companies (code,name,description) values ($1,$2,$3) returning *", [code, name, description]);
        return res.status(201).json({ companies: result.rows[0] });

    } catch (e) {
        next(e);
    }
})


router.put("/:code", async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const { code } = req.params;
        const results = await db.query('UPDATE companies Set name=$1, description=$2 where code=$3 returning *', [name, description, code]);
        return res.send({ companies: result.rows });

    } catch (e) {
        next(e);
    }
})

router.delete("/:code", async (req, res, next) => {
    try {
        const { code } = req.params;
        const results = await db.query('Delete from companies where code=$1', [code]);
        return res.json(results.rows);

    } catch (e) {
        next(e);
    }
})




module.exports = router;