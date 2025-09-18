const articleService = require('../services/articleService');

class ArticleController {
    async getAllArticles(req, res) {
        try {
            const articles = await articleService.getAllArticles();
            res.json(articles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getArticleBySlug(req, res) {
        try {
            const article = await articleService.getArticleBySlug(req.params.slug);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            res.json(article);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createArticle(req, res) {
        try {
            const article = await articleService.createArticle(req.body);
            res.status(201).json(article);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateArticle(req, res) {
        try {
            const article = await articleService.updateArticle(req.params.slug, req.body);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            res.json(article);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteArticle(req, res) {
        try {
            const success = await articleService.deleteArticle(req.params.slug);
            if (!success) {
                return res.status(404).json({ message: 'Article not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ArticleController();
