const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Get all articles
router.get('/', articleController.getAllArticles);

// Get single article by slug
router.get('/:slug', articleController.getArticleBySlug);

// Create new article
router.post('/', articleController.createArticle);

// Update article
router.put('/:slug', articleController.updateArticle);

// Delete article
router.delete('/:slug', articleController.deleteArticle);

module.exports = router;
