const DatabaseObject = require("../utils/DatabaseUtils");
const db = new DatabaseObject();

function getAllQuestions(user_session) {
    let sql = `SELECT question_id, question_description, is_answered, answer, follow_up_to
               FROM questions
               WHERE user_session = ?;`;
    let args = [user_session];

    return db.query(sql, args);
}

function getQuestionById(question_id) {
    let sql = `SELECT question_description, answer, follow_up_to, comment_description
               FROM questions
                        left join comments c on questions.question_id = c.question_id
               WHERE questions.question_id = ?;`;
    let args = [question_id];

    return db.query(sql, args);
}

function postQuestion(user_session, question, follow_up_to) {
    let sql = `INSERT INTO questions (user_session,question_description, follow_up_to) values (?,?,?);`;
    let args = [user_session, question, follow_up_to];

    return db.query(sql, args);
}

function answerQuestion(question_id, answer) {
    let sql = `UPDATE questions
               SET is_answered = true,
                   answer     = ?
               WHERE question_id = ?
                 AND is_answered = false;`;
    let args = [answer, question_id];

    return db.query(sql, args).then(result => result.affectedRows);
}

module.exports = {
    getAllQuestions,
    getQuestionById,
    postQuestion,
    answerQuestion,
}
