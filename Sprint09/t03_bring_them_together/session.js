const sessions = {};

function create(user) {
    const id = Date.now().toString();
    sessions[id] = user;
    return id;
}

function get(sessionId) {
    return sessions[sessionId] || null;
}

function destroy(sessionId) {
    delete sessions[sessionId];
}

module.exports = { create, get, destroy };
