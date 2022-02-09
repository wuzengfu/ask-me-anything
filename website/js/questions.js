window.addEventListener('DOMContentLoaded', () => {
    const questions = window.localStorage.getItem('questions')
    const parsedQuestion = JSON.parse(questions)
    const sessionId = window.localStorage.getItem('sessions')
    const questionInput = document.getElementById("question-input")
    const status = document.getElementById("session-status")
    const allQuestions = document.getElementById("display-questions")
    if (sessionId == null) {
        alert("please enter a session id before attempting to go to this page")
        window.location.href = "index.html";
    }

    axios.get(`http://localhost:3000/session/status?user_session=${sessionId}`)
        .then(res => {
            if (res.data) status.innerHTML = "🟢";
            else status.innerHTML = "🔴";
        }).catch(err =>
        alert(err.response.data)
    );

    //back button
    document.getElementById("back-button").addEventListener('click', function () {
        window.location.href = "index.html";
        window.localStorage.clear()
    })

    //displaying current session id and status
    document.getElementById("session-id").innerHTML = sessionId

    //refresh button
    document.getElementById("refresh-button").addEventListener('click', function () {
        axios.get(`http://localhost:3000/question/getAll?user_session=${sessionId}`)
            .then(res => {
                window.localStorage.setItem("questions", JSON.stringify(res.data))
            })
            .catch(err =>
                alert(err.response.data)
            );
        location.reload();
    })

    //post a question
    document.getElementById("submit-question-button").addEventListener('click', function () {
            if (questionInput.value == "" || null) {
                alert("please enter something before asking a question!!!")
                location.reload();
            } else {
                axios.post(`http://localhost:3000/question/postQuestion`, {
                    user_session: sessionId,
                    question: questionInput.value
                })
                    .then(res => {
                        alert(res.data)

                        axios.get(`http://localhost:3000/question/getAll?user_session=${sessionId}`)
                            .then((response) => {
                                window.localStorage.setItem("questions", JSON.stringify(response.data))
                                location.reload();
                            }).catch(err => {
                            alert(err.response.data)
                        })

                    }).catch(err =>
                    alert(err.response.data)
                );
            }
        }
    )


    // if (parsedQuestion.length == 0) {
    //     document.getElementById("display-questions").style = "visibility : hidden";
    //     document.getElementById("information").style = "visibility : hidden";
    // }
    // let followUpTo = {2: 2, 3:4}; // {questionNumber: question_id}
    let followUpToArray = [];
    let followUpTo = {};
    parsedQuestion.forEach((question, i) =>{
        followUpToArray.push(question.question_id);
        if(question.follow_up_to != null){
            followUpTo[i] = question.follow_up_to;
        }
    });
    console.log(followUpToArray)
    console.log(followUpTo);
    let output = "";
    let index = 1;
    parsedQuestion.forEach((question, i) => {
        let qNum = 0
        if (i % 3 === 0) {
            output += "<div class='card-deck row mb-3'>";
            index = i + 1;
        }

        if(followUpTo[i] != null){
            for(let j = 0;j<followUpToArray.length;j++){
                if(followUpToArray[j]==followUpTo[i]){
                    qNum = j+1
                    console.log(qNum)
                }
            }
        }

        output += `
         <div class="card col-lg-4 col-sm-12 col-md-12 p-0 ${question.is_answered === 1 ? 'bg-secondary' : ''}">
                    <h5 class="card-header">#${i + 1}  ${qNum != 0 ? '(following up to #' + qNum + ")" : ''}</h5>
                    <div class="card-body">
                        <h5 class="card-title text-truncate font-weight-bold">${question.question_description}</h5>
                        <div class="d-flex vh-25 justify-content-end align-self-end">
                        <button class ="btn btn-outline-success btn-sm ${question.is_answered === 1 ? 'answered-btn' : ''}" type="button" onclick = 'followUp("${sessionId}",${question.question_id},${(i + 1)},${question.is_answered})'>Follow Up 📝</button>
                        <button class ="btn btn-outline-danger ml-2 btn-sm ${question.is_answered === 1 ? 'answered-btn' : ''}" type="button" onclick = 'goToDetails("${sessionId}",${question.question_id},${(i + 1)},${question.is_answered})'>View 🔍</button>
</div>
                    </div>
                </div>
        `;

        if (i === parsedQuestion.length - 1) {
            for (let j = i; (j + 1) % 3 !== 0; j++) {
                output += "<div class='col-lg-4 col-md-12 col-sm-12'></div>";
            }
        }

        if (i === index + 1) {
            output += "</div>";
        }
    });
    allQuestions.innerHTML = output;
});

function goToDetails(sessionID, question_id, questionNum, questionAnswered) {
    axios.get(`http://localhost:3000/question/byId?user_session=${sessionID}&question_id=${question_id}`)
        .then(res => {
            window.localStorage.setItem("questionID", question_id)
            window.localStorage.setItem("questionNum", questionNum)
            window.localStorage.setItem("questionAnswered", questionAnswered)
            window.localStorage.setItem("questionData", JSON.stringify(res.data))
            window.location.href = "displayQuestion.html";

        }).catch(err =>
        alert(err.response.data)
    );

}

function followUp(sessionID, question_id, questionNum, questionAnswered) {
    axios.get(`http://localhost:3000/question/byId?user_session=${sessionID}&question_id=${question_id}`)
        .then(res => {
            window.localStorage.setItem("questionID", question_id)
            window.localStorage.setItem("questionNum", questionNum)
            window.localStorage.setItem("questionAnswered", questionAnswered)
            window.localStorage.setItem("questionData", JSON.stringify(res.data))
            window.location.href = "followUpQuestion.html";
        }).catch(err =>
        alert(err.response.data)
    );

}



