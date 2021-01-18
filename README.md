# pharmacy_finder

### routes 
  1. view all reported parmacies table
      - gives all records in reportred_pharmacy tabel
      - localhost:3000/system_admin/report/view/reportedPharmacies
         - response format - array of objects
             ```javascript 
             [
                 {   
                     "pharmacy_id":30008,
                     "customer_id":10008,
                     "reasons":"Too mean",
                     "address":"258/1,         
                     Kaduruketiya Rd, Gonawala.",
                     "longitude":6.123456,
                     "latitude":79.123456,
                     "email":"info@abcpharmacy.com",
                     "contact_no":773640022
                     }
                 ]
             ```
  2. get infromation about customer
      - gives all records in reportred_pharmacy tabel
      - localhost:3000/system_admin/customer/view/{accountID}
         - response format - object
             ```javascript
                 {
                     "full_name":"afdssdf",
                     "nic":"123412341V",
                     "email":"s@gmail.com",
                     "address":"dafsdfsdf",
                     "gender":"Male",
                     "dob":"2020-12-30T18:30:00.000Z",
                     "contact_no":1234123412
                 }
            ```    
  3. delete record of reported pharmacy
      - delete record of an reported pharmacy
      - localhost:3000/system_admin/report/delete
      - request body -json
        ```javascript
            {
                "pharmacy_id":30090,
                "customer_id":100099
            }
        ```    
      - response
        ```javascript
            {
                "fieldCount": 0,
                "affectedRows": 0,
                "insertId": 0,
                "serverStatus": 2,
                "warningCount": 0,
                "message": "",
                "protocol41": true,
                "changedRows": 0
            }
        ```    

    4. delete account of pharmacy
      - delete account of pharmacy
      - http://localhost:3000/system_admin/report/pharmacy/delete
      - request body -json
        ```javascript
            {
                "pharmacy_id":30090,
                
                "customer_id":10099
            }
          ```    
        - response
        ```javascript
            {
                "fieldCount": 0,
                "affectedRows": 0,
                "insertId": 0,
                "serverStatus": 2,
                "warningCount": 0,
                "message": "",
                "protocol41": true,
                "changedRows": 0
            }
        ```    
        - if account is not in reported pharamcies
            "This is not a reported pharamacy.So unable to delete account"
        - if account deleted successfully
            "successfully account deleted"
        - if invalid pharmacy_id and customer_id
            "Invalid Account ID and Pharmacy ID provided"

### views
  1. view all  reported pharmcies
    - http://localhost:3000/system_admin/report/view/reportedPharmacies

  2. view information of a customer by ID
    - http://localhost:3000/system_admin/customer/search