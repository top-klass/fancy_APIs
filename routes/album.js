const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.post('/', (req, res) => {

    if(!req.session.isLogined) {
        res.json({
            msg: "로그인 후 시도해주세요."
        })
    }
    
    let query = "SELECT * FROM album WHERE serial_number = ?";
    let params = [req.body.serial_number];

    db.query(query, params, (err, rows, fields) => {

        if(err) {
            res.json({
                msg: "해당 시리얼 넘버와 일치하는 앨범이 존재하지 않습니다."
            });
        }

        if(rows[0]['certified_by'] !== null) {
            res.json({
                msg: "해당 앨범은 이미 인증이 완료되었습니다."
            });
        }
        else {

            query = "SELECT id FROM user WHERE name = ?";
            params = [req.session.user_name];

            db.query(query, params, (err, rows) => {

                query = "UPDATE Album SET check_certified = ?, certified_by = ? WHERE serial_number = ?";
                params = [true, rows[0]['id'], req.body.serial_number];

                db.query(query, params, (err) => {

                    if(err) {
                        res.json({
                            msg: "오류가 발생했습니다. 다시 시도해 주세요."
                        })
                    }
                    else {
                        res.json({
                            msg: "앨범 인증이 완료되었습니다."
                        })
                    }
                });
            });
        }
    })
})

module.exports = router;


