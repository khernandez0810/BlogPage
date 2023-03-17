const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');


router.get("/", async (req, res) => {
 await User.findAll({
      attributes: {
        exclude: ['password']
      },
      include:{model:Blog}
  })
  .then(users => {
      res.status(200).json(users);
  })
  .catch(err => {
      res.status(500).json(err)
  });
});

router.get("/:id", (req, res) => {
  User.findByPk(req.params.id, {
       include: [{
        model:Blog,
        attributes:['title', 'blog_content']
       },
       {
        model:Comment,
        include: {
          model:Blog,
        }
       }]
   })
   .then(users => {
    if(!users){
      res.status(404).json({message: "No user found with this id"})
    }
       res.status(200).json(users);
   })
   .catch(err => {
       res.status(500).json(err)
   });
 });

router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


router.put('/:id', (req,res) => {
  try {const userData = User.update(req.body, {
    individualHooks:true,
    where: {
      id: req.params.id
    }
  })
  if(!userData) {
    res.status(404).json({message: "No user found with ID"})
  }
  res.status(200).json(userData)
} catch(err) {
  res.status(500).json(err)
}
})

module.exports = router;
