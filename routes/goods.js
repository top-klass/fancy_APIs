const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', (req, res) => {

    const query = "SELECT id, musician_id, name, price FROM Goods";

    db.query(query, (err, rows, fields) => {

        if(err) {
            res.json({
                msg: "Error! Lookup Process Failed."
            })
        }
        else {
            res.json(JSON.parse(JSON.stringify(rows)));
        }
    })
})

module.exports = router;
