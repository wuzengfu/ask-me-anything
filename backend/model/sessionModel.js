const DatabaseObject = require("../utils/DatabaseUtils");
const db = new DatabaseObject();

function createNew(user_session, owner_session) {
    let sql = `INSERT INTO session_info(user_session, owner_session) values (?,?);`;
    let args = [user_session, owner_session];

    return db.query(sql, args);
}

function startSession(user_session, owner_session) {
    let sql = `UPDATE session_info
               SET is_started = true
               WHERE user_session = ?
                 AND owner_session = ?;`;
    let args = [user_session, owner_session];

    return db.query(sql, args).then(result => result.affectedRows);
}

function stopSession(user_session, owner_session) {
    let sql = `UPDATE session_info
               SET is_started = false
               WHERE user_session = ?
                 AND owner_session = ?;`;
    let args = [user_session, owner_session];

    return db.query(sql, args).then(result => result.affectedRows);
}

function checkUserSession(user_session) {
    let sql = `SELECT is_started
               FROM session_info
               WHERE user_session = ?;`;
    let args = [user_session];

    return db.query(sql, args)
        .then(result => result[0]);
}

function checkOwnerSession(user_session, owner_session) {
    let sql = `SELECT is_started
               FROM session_info
               WHERE user_session = ?
                 AND owner_session = ?;`;
    let args = [user_session, owner_session];

    return db.query(sql, args)
        .then(result => result[0]);
}

module.exports = {
    createNew,
    startSession,
    stopSession,
    checkUserSession,
    checkOwnerSession
}
