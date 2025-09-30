const fs = require('fs');
const path = require('path');
const authController = require('../controllers/authController');

module.exports = async function authRoute(req, res) {
    if (req.url === '/register' && req.method === 'GET') {
        return authController.renderRegisterForm(res);
    }

    if (req.url === '/register' && req.method === 'POST') {
        return authController.register(req, res);
    }

    if (req.url === '/login' && req.method === 'GET') {
        return authController.renderLoginForm(res);
    }

    if (req.url === '/login' && req.method === 'POST') {
        return authController.login(req, res);
    }

    if (req.url === '/logout' && req.method === 'POST') {
        return authController.logout(req, res);
    }

    return false;
};
