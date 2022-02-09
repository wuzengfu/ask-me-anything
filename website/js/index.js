window.addEventListener('DOMContentLoaded', () => {
    window.localStorage.clear()
    document.getElementById("submit-button").addEventListener('click', function () {
        const session = document.getElementById("session-id-input").value;
        const loadingAnimation = document.getElementById("loading-animation");

        if (document.forms['sessionForm'].reportValidity()) {
            loadingAnimation.removeAttribute("hidden");
            setTimeout(async () => {
                await axios.get(`http://localhost:3000/question/getAll?user_session=${session}`)
                    .then(res => {
                        window.localStorage.setItem("questions", JSON.stringify(res.data))
                        window.localStorage.setItem("sessions", session)
                        window.location.href = "questions.html";
                    }).catch(err =>
                    alert(err.response.data)
                );
                loadingAnimation.setAttribute("hidden", "hidden");
            }, 1000);
        }
    });

})
