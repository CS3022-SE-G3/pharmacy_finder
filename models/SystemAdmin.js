const { pool } = require('../database/connection');

class SystemAdmin{

/**
 * 
 * @param {number} accountId - customerId
 */
static async  getCustomerAccountInformation(accountId){

    try {
        const response = await new Promise((resolve, reject) => {

            // if query succces we gonna resolve the result
            // else we gonna reject it

            const qry = "SELECT full_name,nic,email,address,gender,dob,contact_no FROM customer WHERE customer_id=?"; // query
            pool.query(qry,[accountId], (err, res) =>{
                if (err){
                    reject (new Error(err.message));
                } 
                // else
                console.log(res)
                resolve(res);
            })
        }
        )

        return response;

    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }

}
}

module.exports = SystemAdmin;