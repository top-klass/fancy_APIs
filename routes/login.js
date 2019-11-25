const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.post('/', (req, res) => {

        if(!req.session) {
            res.json({
                msg: "세션이 설정되어 있지 않습니다. 다시 시도해주세요."
            });
        }

        db.connect();

        const query = "SELECT * FROM user WHERE email = ? AND passwd = ?";
        const params = [req.body.user_email, req.body.user_passwd];

        db.query(query, params, (err, rows, fields) => {

            if(err) {
                res.json({
                    msg: "오류가 발생하였습니다. 다시 시도해주세요."
                });
            }

            if(rows.length === 0) {
                res.json({
                    msg: "일치하는 회원 정보가 존재하지 않습니다."
                });
            }
            else {
                const session = req.session;
                session.user_name = rows[0]['name'];
                session.user_email = req.body.user_email;
                session.isLogined = true;

                res.json({
                    session
                })
            }
        })

    }
);

module.exports = router;
