const router = require("express").Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth')


//Get all blogs with associated Users and comments
router.get("/", (req, res) => {
    Blog.findAll({
       include: [{
        model:Comment,
        include: {
            model:User,
            attributes: ['username']
        }
    },{
        model:User,
        attributes:['username']
    }]
    })
    .then(blogs => {
        res.status(200).json(blogs);
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

//get one blog with associated user and comment
router.get('/:id', (req, res) => {
    Blog.findByPk(req.params.id, {
        attributes: ['title'],
       include: [{
        model:Comment,
        include: {
            model:User,
            attributes: ['username']
        }
    },{
        model:User,
        attributes:['username']
    }]
    })
    .then(blogs => {
        res.status(200).json(blogs);
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

router.post("/", (req, res) => {

    Blog.create({
        title: req.body.title,
        blog_content: req.body.blog_content,
        user_id: req.session.user_id
    })
    .then(blog => {
        res.json(blog);
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
router.put('/:id', (req, res) => {
    Blog.update({
        title: req.body.title,
        blog_content: req.body.blog_content
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(blog => {
        if(!blog){
            res.status(404).json({message: "No blog found with this id"})
        }
        res.status(200).json(blog)
    })
})






//delete blog post

router.delete("/:id", async (req, res) => {
   await Blog.destroy({where: {
        id: req.params.id
    }
})
.then(blog => {
    if(!blog){
        res.status(404).json({message: "No blog post found with this id"})
    }
    res.json(blog);
})
.catch(err => {
    res.json(500).json(err)
})
});



module.exports = router;