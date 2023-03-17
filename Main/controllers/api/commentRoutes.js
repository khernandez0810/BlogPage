const router = require('express').Router();
const { Comment,User,Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", (req, res) => {
  Comment.findAll()
   .then(comments => {
       res.status(200).json(comments);
   })
   .catch(err => {
       res.status(500).json(err)
   });
 });




router.post('/', withAuth, async (req, res) => {
  if(req.session.logged_in){
  try {
    const newComment = await Comment.create({
      comment_content: req.body.comment_content,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
}});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
