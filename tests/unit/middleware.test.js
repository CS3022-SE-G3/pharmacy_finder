const ifLoggedIn = require('../../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../../middleware/ifNotLoggedIn');
const isACustomer = require('../../middleware/isACustomer');
const isAPharmacy = require('../../middleware/isAPharmacy');
const isSystemAdmin = require('../../middleware/isSystemAdmin');

describe ('middleware', () => {
    describe ('ifLoggedIn', () => {
        it('should call next() if the user is logged in', () => {
            const req = {session: {user: {id: 1}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            ifLoggedIn(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.redirect).not.toHaveBeenCalled();

        });

        it('should call redirect() if the user is not logged in', () => {
            const req = {session: {user: undefined}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            ifLoggedIn(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();

        });
    });

    describe ('ifNotLoggedIn', () => {
        it('should call next() if the user is not logged in', () => {
            const req = {session: {user: undefined}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            ifNotLoggedIn(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.redirect).not.toHaveBeenCalled();

        });

        it('should redirect to system admin\'s home if the user is logged in as a system admin', () => {
            const req = {session: {user: {class: 0}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            ifNotLoggedIn(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
            expect(res.redirect.mock.calls[0][0]).toBe('/system_admin/home');

        });

        it('should redirect to pharmacy\'s home if the user is logged in as a pharmacy', () => {
            const req = {session: {user: {class: 1}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            ifNotLoggedIn(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
            expect(res.redirect.mock.calls[0][0]).toBe('/pharmacy/home');

        });

        it('should redirect to system customer\'s home if the user is logged in as a customer', () => {
            const req = {session: {user: {class: 2}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            ifNotLoggedIn(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
            expect(res.redirect.mock.calls[0][0]).toBe('/customer/home');

        });
    });

    describe ('isACustomer', () => {
        it('should call next() if the user is logged in as customer', () => {
            const req = {session: {user: {class: 2}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            isACustomer(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.redirect).not.toHaveBeenCalled();

        });

        it('should redirect to system admin\'s home if the user is logged in as a system admin', () => {
            const req = {session: {user: {class: 0}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            isACustomer(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
            expect(res.redirect.mock.calls[0][0]).toBe('/system_admin/home');

        });

        it('should redirect to pharmacy\'s home if the user is logged in as a pharmacy', () => {
            const req = {session: {user: {class: 1}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            isACustomer(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
            expect(res.redirect.mock.calls[0][0]).toBe('/pharmacy/home');

        });

        it('should redirect to home if the user is not logged in', () => {
            const req = {session: {user: undefined}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            isACustomer(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
            expect(res.redirect.mock.calls[0][0]).toBe('/');

        });
    });

    describe ('isAPharmacy', () => {
        it('should call next() if the user is logged in as pharmacy', () => {
            const req = {session: {user: {class: 1}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            isAPharmacy(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.redirect).not.toHaveBeenCalled();

        });

        it('should redirect to system admin\'s home if the user is logged in as a system admin', () => {
            const req = {session: {user: {class: 0}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            isAPharmacy(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
            expect(res.redirect.mock.calls[0][0]).toBe('/system_admin/home');

        });

        it('should redirect to customer\'s home if the user is logged in as a customer', () => {
            const req = {session: {user: {class: 2}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            isAPharmacy(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
            expect(res.redirect.mock.calls[0][0]).toBe('/customer/home');

        });

        it('should redirect to home if the user is not logged in', () => {
            const req = {session: {user: undefined}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            isAPharmacy(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
            expect(res.redirect.mock.calls[0][0]).toBe('/');

        });
    });

    describe ('isSystemAdmin', () => {
        it('should call next() if the user is logged in as system admin', () => {
            const req = {session: {user: {class: 0}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            isSystemAdmin(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.redirect).not.toHaveBeenCalled();

        });

        it('should redirect to pharmacy\'s home if the user is logged in as a pharmacy', () => {
            const req = {session: {user: {class: 1}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            isSystemAdmin(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
            expect(res.redirect.mock.calls[0][0]).toBe('/pharmacy/home');

        });

        it('should redirect to customer\'s home if the user is logged in as a customer', () => {
            const req = {session: {user: {class: 2}}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            isSystemAdmin(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
            expect(res.redirect.mock.calls[0][0]).toBe('/customer/home');

        });

        it('should redirect to home if the user is not logged in', () => {
            const req = {session: {user: undefined}};
            const res = {redirect: jest.fn()};
            const next = jest.fn();

            isSystemAdmin(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
            expect(res.redirect.mock.calls[0][0]).toBe('/');

        });
    });
});
