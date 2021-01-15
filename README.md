# pharmacy_finder

### routes 
  > view all reported parmacies table
###      - gives all records in reportred_pharmacy tabel
###      - localhost:3000/system_admin/report/view/reportedPharmacies
###         - response format - array of objects
###             ```javascript 
###             [
###                 {   
###                     "pharmacy_id":30008,
###                     "customer_id":10008,
###                     "reasons":"Too mean",
###                     "address":"258/1,         
###                     Kaduruketiya Rd, Gonawala.",
###                     "longitude":6.123456,
###                     "latitude":79.123456,
###                     "email":"info@abcpharmacy.com",
###                     "contact_no":773640022
###                     }
###                 ]
###             ```
###  > get infromation about customer
###      - gives all records in reportred_pharmacy tabel
###      - localhost:3000/system_admin/customer/view/{accountID}
###         - response format - object
###             ```javascript
###                 {
###                     "full_name":"afdssdf",
###                     "nic":"123412341V",
###                     "email":"s@gmail.com",
###                     "address":"dafsdfsdf",
###                     "gender":"Male",
###                     "dob":"2020-12-30T18:30:00.000Z",
###                     "contact_no":1234123412
###                 }```
