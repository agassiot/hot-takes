var router = require('express').Router();
var { User, Post, Comment } = require('../models');
var withAuth = require('../utils/auth');


//homepage route
router.get('/',  async (req, res) => {
  try {
    let data = await Post.findAll({
      order: [['title', 'ASC']],
    });

    let posts = data.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      // this will tell the homepage the users object and the logged_in value of the 
      // req.session.logged_in tag. 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get blog post
router.get('/post/:id',  async (req, res) => {
    try {
      let data = await Post.findByPk(req.params.id, {
        include:[{model: Comment}]
      });
    
      let post = data.get({ plain: true });
      let user_name = req.session.user_name;
      let user_id = req.session.user_id;
      let is_post_author = (user_id === post.user_id);
            
      res.render('post', { post, user_name, is_post_author, logged_in: req.session.logged_in});
    } catch (err) {
      console.log(err);
      res.status(500).json(err.message);
    }
  });

  router.get('/edit/:id',  async (req, res) => {
    try {
      let data = await Post.findByPk(req.params.id);
  
      let post = data.get({ plain: true });
      console.log(post);
      res.render('edit', {post, logged_in: req.session.logged_in});
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get profile page.  checks for authentication
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      let userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      let user = userData.get({ plain: true });
      let userId = user.id;
      console.log(userId);
      let data = await Post.findAll({
        where: {
            user_id:user.id,
        },
        order: [['title', 'ASC']],
      });
  
      let posts = data.map((post) => post.get({ plain: true }));
      
      console.log(user);
      res.render('profile', {
        ...user,
       posts,
       logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get('/login', (req, res) => {
  if (req.session.logged_in) return res.redirect('/');

  res.render('login');
});

module.exports = router;
