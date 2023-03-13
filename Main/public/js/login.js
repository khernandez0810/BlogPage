document.querySelector("#login").addEventListener("submit", event => {
  event.preventDefault();
  const user = {
    username: document.querySelector("#usernamelogin").value.trim(),
    password: document.querySelector("#passwordlogin").value.trim()
  }

  fetch("/api/users/login", {
    method: "POST",
    body:JSON.stringify(user),
    headers: {
      "Content-Type":"application/json"
    }
  })
  .then(res => {
    if(res.ok){
      res.redirect("/dashboard")
    }
    else{
      alert("Please try again")
    }
  })
})
