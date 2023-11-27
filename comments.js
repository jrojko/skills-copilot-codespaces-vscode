// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const { check, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

// Body parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Get all comments
router.get('/', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) return res.status(500).send('There was a problem finding the comments.');
    res.status(200).send(comments);
  });
});

// Get one comment
router.get('/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return res.status(500).send('There was a problem finding the comment.');
    if (!comment) return res.status(404).send('No comment found.');
    res.status(200).send(comment);
  });
});

// Create comment
router.post('/', [
  check('content').exists().withMessage('Content is required.'),
  check('author').exists().withMessage('Author is required.'),
  check('post').exists().withMessage('Post is required.'),
  sanitize('content').trim().escape(),
  sanitize('author').trim().escape(),
  sanitize('post').trim().escape()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send(errors.mapped());
  }
  Post.findById(req.body.post, (err, post) => {
    if (err) return res.status(500).send('There was a problem finding the post.');
    if (!post) return res.status(404).send('No post found.');
    User.findById(req.body.author, (err, user) => {
      if (err) return res.status(500).send('There was a problem finding the user.');
      if (!user) return res.status(404).send('No user found.');
      const comment = new Comment({
        content: req.body.content,

