const response = require('../../../controllers/pharmacy/response');
const { pool } = require('../../../database/connection');

let server;

describe("Pharmacy Response", () => {
  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    await server.close();
  });

  describe("displayRequestInfo", () => {
    const res = {
      json: jest.fn(),
      redirect: jest.fn()
    }

    it("200 Successful request info display", async () => {
      let info = [];
      const request_id = 60019;

      await response.displayRequestInfo(info, res, request_id);

      info = [
        [
          {
            customer_id: 10001,
            full_name: 'Kamala Perera',
            email: 's@gmail.com',
            address: ' 28/1, Siriwardane Rd, Dehiwala',
            gender: 'Female',
            contact_no: 116431164
          }
        ],
        [
          {
            drug_type_id: 40014,
            drug_type_name: 'Atorvastatin 10mg + Fenofibrate 160mg'
          },
          {
            drug_type_id: 40015,
            drug_type_name: 'Amlodipine 10mg'
          }
        ],
        [
          { branded_drug_id: 50014, brand_name: 'Amlogard 10' }
        ]
      ];

      expect(res.json).toHaveBeenCalledWith({
        info: info
      });
    });
  });

  describe("displayResponseInfo", () => {
    const res = {
      json: jest.fn(),
      redirect: jest.fn()
    }

    it("200 Successful response info display", async () => {
      let info = [];
      const pharmacy_id = 100006;
      const request_id = 60020;

      await response.displayResponseInfo(info, res, pharmacy_id, request_id);

      info = [
        [
          {
            customer_id: 10001,
            full_name: 'Kamala Perera',
            email: 's@gmail.com',
            address: ' 28/1, Siriwardane Rd, Dehiwala',
            gender: 'Female',
            contact_no: 116431164
          }
        ],
        [
          {
            drug_type_id: 40016,
            drug_type_name: 'Paracetamol'
          }
        ],
        [ { branded_drug_id: 50015, brand_name: 'Panadol' } ],
        [ { drug_type_id: 40016 } ],
        [ { branded_drug_id: 50015 } ]
      ];

      expect(res.json).toHaveBeenCalledWith({
        info: info
      });
    });
  });

  describe("storeResponseInfo", () => {
    const res = {
      json: jest.fn(),
      redirect: jest.fn()
    }

    beforeEach(async () => {
        server = require('../../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
    });

    afterEach(async () => {
        await pool.query("ROLLBACK");
        await server.close();
    });

    it("200 Successful response info store", async () => {
      const drug_type_ids = [40014];
      const branded_drug_ids = [50014];
      const pharmacy_id = 100006;
      const request_id = 60019;

      await response.storeResponseInfo(res, drug_type_ids, branded_drug_ids, pharmacy_id, request_id);

      expect(res.redirect).toHaveBeenCalledWith(
        "/pharmacy/home"
      );
    });
  });

  // describe("storeEditedResponseInfo", () => {
  //   const res = {
  //     json: jest.fn(),
  //     redirect: jest.fn()
  //   }
  //   beforeEach(async () => {
  //       server = require('../../../index');
  //       await pool.query("SET autocommit = OFF");
  //       await pool.query("BEGIN");
  //   });

  //   afterEach(async () => {
  //       await pool.query("ROLLBACK");
  //       await pool.end();
  //       await server.close();
  //   });

  //   it("200 Successful edited response info store", async () => {
  //     const drug_type_ids = [];
  //     const branded_drug_ids = [50015];
  //     const pharmacy_id = 100006;
  //     const request_id = 60020;

  //     await response.storeEditedResponseInfo(res, drug_type_ids, branded_drug_ids, pharmacy_id, request_id);

  //     expect(res.redirect).toHaveBeenCalledWith(
  //       "/pharmacy/home"
  //     );
  //   });
  // });
});
