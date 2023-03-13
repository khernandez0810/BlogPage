const router = require("express").Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth')


//Get all blogs with associated Users and comments
router.get("/", (req, res) => {
    Blog.findAll({
        include:[User, Comment]
    })
    .then(blogs => {
        res.json(blogs);
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

//get one blog with associated user and comment
router.get("/:id", (req,res) => {
    Blog.findByPk(req.params.id, {
        include:[User,Comment]
    })
    .then(blog => {
        res.json(blog);
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.post("/", (req, res) => {
    if(!req.session.user) {
return res.status(401).json({message: "Please Log in"})
    }

    Blog.create({
        title: req.body.title,
        post_content: req.body.content,
        userID: req.session.user.id
    })
    .then(blog => {
        res.json(blog);
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//delete blog post

router.delete("/:id", (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({message: "Please log in"})
    }
    Blog.destroy({where: {
        id: req.params.id
    }
})
.then(blog => {
    res.json(blog);
})
.catch(err => {
    res.json(500).json(err)
})
})

module.export = router;