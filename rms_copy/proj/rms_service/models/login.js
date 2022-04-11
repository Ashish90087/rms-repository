var db = require('../dbconnection');
const bcrypt = require('bcryptjs');


var common = {

    login: function (userid, callback) {
        db.query(`select * from mas_user u WHERE u.email_id=?`, [userid], callback);
    },

}

module.exports = common;
