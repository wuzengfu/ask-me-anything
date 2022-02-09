window.addEventListener('DOMContentLoaded', () => {   
    const sessionId = window.localStorage.getItem('sessions')
    if(sessionId==null){
      alert("please enter a session id before attempting to go to this page")
      window.location.href="index.html"
    }
    const questionId =  window.localStorage.getItem('questionID')
    const questionNum =  window.localStorage.getItem('questionNum')

    //check for comments
axios.get(`http://localhost:3000/question/byId?user_session=${sessionId}&question_id=${questionId}`)
  .then(res => {  
    window.localStorage.setItem("questionData",JSON.stringify(res.data))
  }).catch(err => 
      alert(err.response.data)
  );
    const questionDataString = window.localStorage.getItem('questionData')
    const questionData = JSON.parse(questionDataString)
    const status = document.getElementById("session-status")
    document.getElementById("question").innerHTML = questionData[0].question_description
    document.getElementById("session-id").innerHTML = sessionId
    questionNumSpan = document.getElementById('question-num')
    questionNumSpan.innerHTML = questionNum

    //check status
    axios.get(`http://localhost:3000/session/status?user_session=${sessionId}`)
    .then(res => {  
      if(res.data==true){
        status.innerHTML = "🟢"
      }
      else{
        status.innerHTML = "🔴" 
      }
    }).catch(err => 
        alert(err.response.data)
    );
    
    
    
    //refresh button 
    document.getElementById("refresh-button").addEventListener('click',function(){
        axios.get(`http://localhost:3000/question/getAll?user_session=${sessionId}`)
        .then(res => {       
            window.localStorage.setItem("questions",JSON.stringify(res.data))     
        }).catch(err => 
            alert(err.response.data)
        );
        location.reload();
      })
  
    
    document.getElementById("ask-FUquestion-button").addEventListener('click',function(){
       var question =  document.getElementById("FUquestion-input").value
       if(question==""||null){
        alert("please enter something before asking a question!!!")
        location.reload();
      }else{

      
       axios.post(`http://localhost:3000/question/postQuestion`,{
        user_session : sessionId,
        question : question,
        follow_up_to : questionId

      })
      .then(res => {  
         alert(res.data)
         axios.get(`http://localhost:3000/question/getAll?user_session=${sessionId}`)
         .then(res => {       
             window.localStorage.setItem("questions",JSON.stringify(res.data))  
             window.location.href = "questions.html";   
         }).catch(err => 
             alert(err.response.data)
         );
         
      }).catch(err => 
          alert(err.response.data)
      );
    }}
    )
    
    })
    