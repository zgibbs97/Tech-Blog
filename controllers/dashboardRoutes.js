const router = require('express').Router()
const sequelize = require('../config/connection')
const { Blog, User, Comment } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
    Blog.findAll({
        where: {
            // use ID from session
            user_id: req.session.user_id,
        },
        attributes: ['id', 'title', 'date_created', 'blog_description'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'title', 'date_created'],
                include: {
                    model: User,
                    attributes: ['name'],
                },
            },
            {
                model: User,
                attributes: ['name'],
            },
        ],
    }).then((blogData) => {
        // serialize data before passing over to template
        const blogs = blogData.map((blog) => blog.get({ plain: true }))
        res.render('dashboard', { posts, loggedIn: true, username: req.session.username })
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/edit/:id', withAuth, (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'date_created', 'blog_description'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'title', 'date_created'],
                include: {
                    model: User,
                    attributes: ['name'],
                },
            },
            {
                model: User,
                attributes: ['name'],
            },
        ],
    }).then((blogData) => {
        if (!blogData) {
            res.status(404).json({ message: 'No post found with this id' })
            return
        }

        // serialize data
        const blog = blogData.get({ plain: true })

        res.render('edit-post', {
            blog,
            loggedIn: true,
            username: req.session.username
        })
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get('/create/', withAuth, (req, res) => {
    Blog.findAll({
        where: {
            // use ID from session
            user_id: req.session.user_id,
        },
        attributes: ['id', 'title', 'date_created', 'blog_description'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'title', 'date_created'],
                include: {
                    model: User,
                    attributes: ['name'],
                },
            },
            {
                model: User,
                attributes: ['name'],
            },
        ],
    }).then((blogData) => {
        // serialize data before passing over to template
        const blogs = blogData.map((blog) => blog.get({ plain: true }))
        res.render('new-blog', { posts, loggedIn: true, username: req.session.username })
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router