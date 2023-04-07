async function editBlogHandler(event) {
    event.preventDefault();

    const blogId = document.getElementById('blog-id');
    const blog_content = document.getElementById('blog-content');
    const title = document.getElementById('blog-title')
    fetch('/api/blogs/' + blogId.value, {
        method: 'PUT',
        body: JSON.stringify({
            blog_content: blog_content.value,
            title: title.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function() {
        document.location.reload();
    })
    .catch(err => console.log(err));
}


const deletePost = async (event) => {
   
        const blogId = document.getElementById("blog-id");
        const response = await fetch(`/api/blogs/` + blogId.value, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
};

document.querySelector('#edit-blog-form').addEventListener('submit', editBlogHandler);
document.querySelector('#delete-btn').addEventListener('click', deletePost);