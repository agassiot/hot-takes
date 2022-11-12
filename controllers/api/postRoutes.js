var router = require('express').Router();
var { Post, Comment, User } = require('../../models');
var withAuth = require('../../utils/auth');

async function getUser(userId){
  let userData = await User.findOne({ where: { id: userId } });
  let user = userData.get({ plain: true });
  return user.name;
}


router.post('/', withAuth, async (req, res) => {
  try {
    let newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/:id/comment', withAuth, async (req, res) => {
  try {
    let authorString = await getUser(req.session.user_id);
    let newComment = await Comment.create({
      ...req.body,
      post_id: req.params.id,
      user_id: req.session.user_id,
      author: authorString,
    });
    
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

router.put('/:id', withAuth, async (req, res) => {   
  try {
    let data = await Post.update(
      {...req.body },
      {where:{id:req.params.id}}
      );
      if (!data) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
  }
});

router.delete('/:id/comment/:cid', withAuth, async (req, res) => {
  try {

    let commentData = await Comment.destroy({
      where: {
        id: req.params.cid,
        post_id: req.params.id,
      },
    });
  res.status(200).json(commentData);
} catch (err) {
  console.log(err)
  res.status(500).json(err.message);
}
});


router.delete('/:id', withAuth, async (req, res) => {
  
  try {
    let data = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
