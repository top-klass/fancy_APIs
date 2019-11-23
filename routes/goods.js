const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', (req, res) => {

    if(!req.session.isLogined) {
        res.json({
            msg: "로그인 후 시도해주세요."
        })
    }

    const query = "SELECT * FROM goods WHERE id = ?";
    const params = [req.query.goods_id]

    db.query(query, params, (err, rows, fields) => {

        if(err) {
            res.json({
                msg: "오류가 발생했습니다. 다시 시도해 주세요."
            })
        }
        else {
            res.json(JSON.parse(JSON.stringify(rows)));
        }
    })
})

module.exports = router;
