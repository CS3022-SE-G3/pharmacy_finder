const { pool } = require('../database/connection');

function lookupEmail(email) {
    {
        return new Promise((resolve, reject) => {
            const result = pool.query('SELECT * FROM pharmacy WHERE `email` = ?',
                [email],
                function (error, results, fields) {
                    if (error) {
                        reject(new Error(error.message));
                    }
                    resolve(results);
                }
            )
        })
    }
}

exports.lookupEmail = lookupEmail;