window.addEventListener('DOMContentLoaded', () => {
const ownerID =  window.localStorage.getItem('owner')
const sessionId = window.localStorage.getItem('sessions')
if(sessionId==null){
  alert("please enter a session id before attempting to go to this page")
  window.location.href="index.html"
}
const questionId =  window.localStorage.getItem('questionID')
const questionNum =  window.localStorage.getItem('questionNum')
const questionAnswered = window.localStorage.getItem('questionAnswered')

  //check for comments
  axios.get(`http://localhost:3000/question/byId?user_session=${sessionId}&question_id=${questionId}`)
    .then(res => {
      window.localStorage.setItem("questionData", JSON.stringify(res.data))
    }).catch(err =>
      alert(err.response.data)
    );
  const questionDataString = window.localStorage.getItem('questionData')
  const questionData = JSON.parse(questionDataString)
  console.log(questionData[0].comment_description)
  console.log(questionId)
  const status = document.getElementById("session-status")
  document.getElementById("question").innerHTML = questionData[0].question_description
  document.getElementById("session-id").innerHTML = sessionId
  questionNumSpan = document.getElementById('question-num')
  questionNumSpan.innerHTML = questionNum


  //check status
  axios.get(`http://localhost:3000/session/status?user_session=${sessionId}`)
    .then(res => {
      if (res.data == true) {
        status.innerHTML = "🟢"
      }
      else {
        status.innerHTML = "🔴"
      }
    }).catch(err =>
      alert(err.response.data)
    );




  //refresh button
  document.getElementById("refresh-button").addEventListener('click', function () {
    axios.get(`http://localhost:3000/question/getAll?user_session=${sessionId}`)
      .then(res => {
        window.localStorage.setItem("questions", JSON.stringify(res.data))
      }).catch(err =>
        alert(err.response.data)
      );
    location.reload();
  })

    //what users will see (non owner)
    if(ownerID==null||""){
      document.getElementById("change").style.display = "none"
      document.getElementById("AQ").innerHTML = "<h4><b><u>Answer</b></u></h4>"
      document.getElementById("answeredQuestion").innerHTML = "<h4>Question has not been answered yet</h4>"
    }
  //what to do if question has already been answerd
  if (questionAnswered == 1) {
    document.getElementById("change").style.display = "none"
    document.getElementById("AQ").innerHTML = "<h4><b><u>Answer</b></u></h4>"
    document.getElementById("answeredQuestion").innerHTML = questionData[0].answer

  }
  //answer question
  document.getElementById("answer-question-button").addEventListener('click', function () {
    var answer = document.getElementById("answer-input").value
    if(answer==""||null){
      alert("please enter something before answering a question!!!")
      location.reload();
    }else{
    axios.post('http://localhost:3000/question/postAnswer', {
      user_session: sessionId,
      owner_session: ownerID,
      question_id: questionId,
      answer: answer
    }).then(res => {
      alert(res.data)
      localStorage.removeItem("questionID");
      localStorage.removeItem("questionNum");
      localStorage.removeItem("questionAnswered");
    }).then(()=>{
      axios.get(`http://localhost:3000/question/getAll?user_session=${sessionId}`)
          .then(res => {
            window.localStorage.setItem("questions", JSON.stringify(res.data))
          }).catch(err =>
          alert(err.response.data)
      );
    }).then(()=>{
      window.location.href = "questions.html";
    }).catch(err => {
      alert(err.response.data)
    })
  }})
  //post comment
  document.getElementById("post-comment").addEventListener('click', function () {
    var input = document.getElementById("comment-input").value
    if(input==""||null){
      alert("please enter something before leaving a comment!!!")
      location.reload();
    }else{
    axios.post('http://localhost:3000/comment/', {
      user_session: sessionId,
      comment: input,
      question_id: questionId
    }).then(res => {
      alert(res.data)
    }).then(()=>{
      axios.get(`http://localhost:3000/question/byId?user_session=${sessionId}&question_id=${questionId}`)
      .then(res =>{
        window.localStorage.setItem('questionData',JSON.stringify(res.data))
        window.location.reload()
      })
      
    })
    .catch(err => {
      alert(err.response.data)
    })

  }})


  //display all comments
  var commentArr = questionData[0].comment_description
  if (Array.isArray(commentArr)) {
    commentArr.forEach((comment, i) => {
      document.getElementById("comments").innerHTML +=
        "<div class = 'border rounded  col-md-4 p-3 mt-3 mr-3'  >" +
        "<div class='border-bottom text-center'> Comment #" + (i + 1) + "</div>" +
        "<div>" + comment + "</div>" +
        "</div>" + "<br>"
    });
  }
  else {
    if (commentArr != null) {
      document.getElementById("comments").innerHTML +=
        "<div class = 'border rounded col-md-4 p-3 mt-3 '  >" +
        "<div class='border-bottom text-center'> Comment #" + (1) + "</div>" +
        "<div>" + commentArr + "</div>" +
        "</div>" + "<br>"
    }

  }



})
