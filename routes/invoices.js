const express = require('express');
let router = new express.Router();
const db = require('../db');

router.get("/", async (req, res, next) => {
    try {
        const result = await db.query("select * from invoices;")
        console.log(result);
        return res.json({ invoice: result.rows });
    } catch (e) {
        return next(e);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.query(`Select * from invoices where id=$1`, [id]);
        return res.json({ invoice: result.rows });
    } catch (e) {
        next(e);
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { code, name, description } = req.body;
        const result = await db.query("Insert into invoices (code,name,description) values ($1,$2,$3) returning *", [code, name, description]);
        return res.status(201).json({ invoice: result.rows[0] });

    } catch (e) {
        next(e);
    }
})


router.patch("/:id", async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const { id } = req.params;
        const result = await db.query('UPDATE invoices Set name=$1, description=$2 where id=$3 returning *', [name, description, id]);
        return res.send({ invoice: result.rows });

    } catch (e) {
        next(e);
    }
})
router.put("/:id", async (req, res, next) => {
    try {
        const { paid } = req.body;
        const { id } = req.params;
        const date = new Date();

        const result = await db.query('UPDATE invoices Set paid=$1, paid_date=$3 where id=$2 returning *', [paid, id, date]);
        return res.send({ invoice: result.rows });

    } catch (e) {
        next(e);
    }
})
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await db.query('Delete from invoices where id=$1', [id]);
        return res.json(results.rows);

    } catch (e) {
        next(e);
    }
})




module.exports = router;