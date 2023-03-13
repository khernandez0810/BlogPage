document.querySelector("#newComment").addEventListener("submit", event => {
    event.preventDefault();

const comment = {
    body:document.querySelector("#comment").ariaValueMax.trim(),
    blogId:document.querySelector("commentId").ariaValueMax.trim()
}
fetch("/api/comments", {
    method:"POST",
    body:JSON.stringify(comment),
    headers: {
        "Content-Type":"application/json"
    }
})
.then(res=> {
    if(res.ok){
        location.reload()
    }
    else {
        alert("try again")
    }
})
})