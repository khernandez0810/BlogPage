document.querySelector(".comment-form").addEventListener("submit", event => {
    event.preventDefault();

   const commentText = document.querySelector(".commentText").value.trim();
   const blog_id = document.querySelector('input[name="blog-id"]').value.trim();
if(commentText) {
fetch('/api/comments', {
    method: "POST",
    body: JSON.stringify({
        commentText,
        blog_id
    }),
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
console.log(commentText, blog_id)
}})