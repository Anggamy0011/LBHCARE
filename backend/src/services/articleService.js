const Article = require('../models/Article');

class ArticleService {
    async getAllArticles(query = {}) {
        try {
            const articles = await Article.find(query)
                .sort({ publishedDate: -1 });
            return articles;
        } catch (error) {
            throw error;
        }
    }

    async getArticleBySlug(slug) {
        try {
            const article = await Article.findOne({ slug });
            return article;
        } catch (error) {
            throw error;
        }
    }

    async createArticle(articleData) {
        try {
            const article = new Article(articleData);
            await article.save();
            return article;
        } catch (error) {
            throw error;
        }
    }

    async updateArticle(slug, updateData) {
        try {
            const article = await Article.findOneAndUpdate(
                { slug },
                updateData,
                { new: true }
            );
            return article;
        } catch (error) {
            throw error;
        }
    }

    async deleteArticle(slug) {
        try {
            await Article.findOneAndDelete({ slug });
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ArticleService();
