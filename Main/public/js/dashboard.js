const currentBlogs = document.querySelector("#currentBlogs")
const create = document.querySelector(".new-blog-form")
const newBlogs = document.querySelector("#newBlog")


const newPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector("#blog-title").value;
    const blog_content = document.querySelector("#blog-content").value;

    const response = await fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify({ title, blog_content }),
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
}
create.addEventListener("submit", newPost);


const deletePost = async (event) => {
    if(event.target.hasAttribute("data-id")){
        const id = event.target.getAttribute("data-id");
        const response = await fetch(`/api/blogs/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector(".blog-list").addEventListener("click", deletePost);