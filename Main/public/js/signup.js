document.querySelector("#signup").addEventListener("submit", event => {
    event.preventDefault();
    const user = {
      username: document.querySelector("#usernamesignup").value.trim(),
      password: document.querySelector("#passwordsignup").value.trim()
    }
  
    fetch("/api/users/", {
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
  