const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');



//Route for homepage if logged in 
router.get('/', async (req, res) => {
  try {
    if(!req.session.user){
      return res.redirect('/login')
    }
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
        },
      ],
    });


    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Router for login if logged in, reroute to dashboard
router.get("/login", (req,res) => {
  if(req.session.user){
    return res.redirect("/dashboard")
  }
})

router.get("/signup", (req,res) => {
    return res.render("signup")
})


router.get("/dashboard", (req,res) => {
  if(!req.session.user){
    return res.redirect('/login')
  }
  User.findByPk(req.session.user.id, {
    include: [Blog,Comment]
  })
  .then(userData => {
    const user = userData.get({plain:true})
    res.render("dashboard", {user, logged_in: req.session.logged_in})
  })
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

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get("*", (req,res) => {
  res.redirect("/")
})

module.exports = router;
