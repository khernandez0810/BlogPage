const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');



//Route for homepage if logged in 
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      attributes: ['id','title','blog_content','createdAt'],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes:['id','comment_content','user_id','blog_id',],
          include: {
            model:User,
            attributes: ['username']
          }
        }

      ],
    });


    // Serialize data so the template can read it
     const blogs = blogData.map(blog => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Router for login if logged in, reroute to dashboard
router.get("/login", (req,res) => {
  if(req.session.logged_in){
    return res.redirect("/")
  }
  res.render("login")
})

//use middleware to prevent access to route
router.get("/dashboard", withAuth, async (req,res) => {
 try{ const userData = await User.findByPk(req.session.user_id,{
    include: {model: Blog}
  })
    const users = userData.get({plain:true})
  res.render('dashboard',{
  ...users,
  logged_in: req.session.logged_in}
  )
 } catch(err){
  res.status(500).json(err)
 }
})



//Route for blog page
router.get('/blogs/:id', async (req, res) => {
  try {
    if(!req.session.user){
      return res.redirect('/login')
    };
    const blogData = await Blog.findByPk(req.params.id, {
      include: [User, {model:Comment, include: {User}}]});

    const blogs = blogData.get({ plain: true });

    res.render('blog', {
      ...blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
