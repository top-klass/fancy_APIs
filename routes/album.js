const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.post('/', (req, res) => {

    let query = "SELECT * FROM Album WHERE serial_number = (?)";
    let params = [req.query.serial_number];

    db.query(query, params, (err, rows, fields) => {

        if(err) {
            res.json({
                msg: "No albums match this serial number"
            });
        }
        else if(rows[0]['certified'] == true) {
            res.json({
                msg: "This album is already verified."
            });
        }
        else {
            query = "UPDATE Album SET certified = (?), certified_by = (?), WHERE serial_number = (?)";
            params = [true, req.session.userId, req.query.serial_number];
            db.query(query, params, (err, rows, fields) => {

                if(err) {
                    res.json({
                        msg: "Error! Updating records failed."
                    })
                }
                else {
                    res.json({
                        msg: "The process has been succeed."
                    })
                }
            });
        }
    })
})

module.exports = router;


