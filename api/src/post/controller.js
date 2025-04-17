const prisma = require('../db');
const { requireAuth } = require('../middleware/auth');
const { generateSlug } = require('../middleware/slugify');

module.exports = {
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
  
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
  
      const slug = await generateSlug(title);
  
      const post = await prisma.post.create({
        data: {
          title,
          content,
          slug,
        },
      });
  
      return res.status(201).json({
        data: post,
        message: 'Success create a post',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong when creating the post',
      });
    }
  },

  getAllPost: async (req, res) => {
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          publishedAt: 'desc',
        },
      });

      return res.status(200).json({ data: posts })
    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong when get all post',
      });
    }
  },

  getPostbySlug: async (req, res) => {
    try {
      const { slug } = req.params

      const post = await prisma.post.findUnique({
        where: { slug: slug },
      });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      return res.status(200).json({ data: post })

    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong when get detail post',
      });
    }
  },

  editPostBySlug: async (req, res) => {
    try {
      const { slug } = req.params
      const { title, content } = req.body

      const checkPost = await prisma.post.findUnique({
        where: { slug: slug },
      });

      if (!checkPost) {
        return res.status(404).json({ message: 'Post not found' })
      }

      const newSlug = await generateSlug(title)
      const newDate = new Date(Date.now())

      const post = await prisma.post.update({
        where: { slug },
        data: { title, content, slug: newSlug, publishedAt: newDate },
      });

      return res.status(200).json({ data: post, message: 'Post updated' })

    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong when edit post',
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { slug } = req.params
      
      const checkPost = await prisma.post.findUnique({
        where: { slug: slug },
      });

      if (!checkPost) {
        return res.status(404).json({ message: 'Post not found' })
      }

      await prisma.post.delete({
        where: { slug: slug },
      });

      return res.status(200).json({ message: 'Post deleted successfully' })
      
    } catch (error) {
      
    }

  }
};
