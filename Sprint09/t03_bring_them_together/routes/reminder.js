const reminderController = require('../controllers/reminderController');

module.exports = async function reminderRoute(req, res) {
    if (req.url === '/reminder' && req.method === 'GET') {
        return reminderController.renderForm(res);
    }

    if (req.url === '/reminder' && req.method === 'POST') {
        return reminderController.findUser(req, res);
    }

    if (req.url === '/send-email' && req.method === 'POST') {
        return reminderController.sendEmail(req, res);
    }

    return false;
};
