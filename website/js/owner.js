window.addEventListener('DOMContentLoaded', () => {
    window.localStorage.clear()
    const sessionID = document.getElementById("session-id")
    const ownerID = document.getElementById("owner-id")

    // creating session
    document.getElementById("create-session-button").addEventListener('click', function () {
        let createSessionAnimation = document.getElementById("create-session-animation");
        createSessionAnimation.removeAttribute("hidden");

        setTimeout(async () => {
            await axios.get(`http://localhost:3000/session/`)
                .then(res => {
                    window.localStorage.setItem("sessions", JSON.stringify(res.data))

                    sessionID.value = res.data.user_session
                    ownerID.value = res.data.owner_session
                }).catch(err =>
                alert(err.response.data)
            );

            createSessionAnimation.setAttribute("hidden","hidden");
        }, 700);
    });

    // starting session
    document.getElementById("start-session-button").addEventListener('click', function () {
        let startSessionAnimation = document.getElementById("start-session-animation");

            if(document.forms['sessionForm'].reportValidity()){
                startSessionAnimation.removeAttribute("hidden");

                setTimeout(async () => {
                    await axios.post(`http://localhost:3000/session/start`, {
                        user_session: sessionID.value,
                        owner_session: ownerID.value
                    })
                        .then(res => {
                            alert(res.data)
                        }).catch(err =>
                        alert(err.response.data)
                    );

                    startSessionAnimation.setAttribute("hidden","hidden");
                }, 700);
            }

    });

    //stop session
    document.getElementById("stop-session-button").addEventListener('click', function () {
        let stopSessionAnimation = document.getElementById("stop-session-animation");

            if(document.forms['sessionForm'].reportValidity()){
                stopSessionAnimation.removeAttribute("hidden");

                setTimeout(async () => {
                    await axios.post(`http://localhost:3000/session/stop`, {
                        user_session: sessionID.value,
                        owner_session: ownerID.value
                    })
                        .then(res => {
                            alert(res.data)
                        }).catch(err =>
                        alert(err.response.data)
                    );

                    stopSessionAnimation.setAttribute("hidden", "hidden");
                }, 700);
            }

    });

    //go to questions page
    document.getElementById("submit-button").addEventListener('click', function () {
           let submitSessionAnimation = document.getElementById("submit-session-animation");

           if(document.forms['sessionForm'].reportValidity()){
               submitSessionAnimation.removeAttribute("hidden");

               setTimeout(async () => {
                   await axios.get(`http://localhost:3000/question/getAll?user_session=${sessionID.value}`)
                       .then(res => {
                           window.localStorage.setItem("sessions", sessionID.value)
                           window.localStorage.setItem("questions", JSON.stringify(res.data))
                           window.localStorage.setItem("owner", ownerID.value)
                           window.location.href = "questions.html"
                       }).catch(err =>
                       alert(err.response.data)
                   );

                   submitSessionAnimation.setAttribute("hidden","hidden");
               }, 700);
           }

    });

})
