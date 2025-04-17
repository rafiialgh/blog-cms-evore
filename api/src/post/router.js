var express = require('express');
const { createPost, getAllPost, getPostbySlug, editPostBySlug, deletePost } = require('./controller');
const { requireAuth } = require('../middleware/auth');
var router = express.Router();

router.post('/', requireAuth, createPost)
router.get('/', getAllPost)
router.get('/:slug', getPostbySlug)
router.put('/:slug', requireAuth, editPostBySlug)
router.delete('/:slug', requireAuth, deletePost)

module.exports = router