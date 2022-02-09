const DatabaseObject = require("../utils/DatabaseUtils");
const db = new DatabaseObject();

function postComment(comment, question_id) {
    let sql = `INSERT INTO comments(comment_description, question_id) VALUES (?,?);`;
    let args = [comment, question_id];

    return db.query(sql, args);
}

module.exports = {
    postComment
}
