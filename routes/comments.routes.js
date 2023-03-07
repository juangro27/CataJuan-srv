const router = require("express").Router()
const Comment = require("../models/Comment.model")
const Country = require('../models/Country.model')
const Post = require('../models/Post.model')


router.get('/:id', (req, res, next) => {

    const { id } = req.params
    const { type } = req.query
    const getPageComments = model => {
        return model.findById(id)
            .select({ comments: 1 })
            .populate({
                path: "comments",
                select: '-updatedAt',
                populate: {
                    path: 'owner',
                    select: '-__v -password -email -role -createdAt -updatedAt'
                }
            })
            .then(comments => res.json(comments))
            .catch(err => next(err))
    }
    return type === 'COUNTRY' ? getPageComments(Country) : getPageComments(Post)


})

router.post('/create/:type/:id', (req, res, next) => {

    const { id, type } = req.params
    const { owner, comment } = req.body

    Comment
        .create({ owner, comment, commentOver: type })
        .then(({ _id: commentId }) => {
            const promises = [
                Comment.findById(commentId).populate({
                    path: 'owner',
                    select: '-__v -password -email -role -createdAt -updatedAt'
                })
            ]
            type === 'COUNTRY' ?
                promises.push(Country.findByIdAndUpdate(id, { $push: { comments: commentId } }, { new: true }))
                : promises.push(Post.findByIdAndUpdate(id, { $push: { comments: commentId } }, { new: true }))
            return Promise.all(promises)
        })
        .then(([comment]) => res.json(comment))
        .catch(err => next(err))

})


router.put('/edit/:id', (req, res, next) => {

    const { id } = req.params
    const { comment } = req.body

    Comment
        .findByIdAndUpdate(id, { comment }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))

})


router.delete('/delete/:type/:typeId/:id', (req, res, next) => {

    const { id, type, typeId } = req.params


    Comment
        .findByIdAndDelete(id)
        .then(() => {
            if (type === 'COUNTRY') {
                return Country
                    .findByIdAndUpdate(typeId, { $pull: { comments: id } })
                    .populate({
                        path: "comments",
                        select: '-updatedAt',
                        populate: {
                            path: 'owner',
                            select: '-__v -password -email -role -createdAt -updatedAt'
                        }
                    })
                    .populate({
                        path: 'posts',
                        select: 'title'
                    })
            }
            else {
                return Post
                    .findByIdAndUpdate(typeId, { $pull: { comments: id } })
                    .populate({
                        path: "comments",
                        select: '-updatedAt',
                        populate: {
                            path: 'owner',
                            select: '-__v -password -email -role -createdAt -updatedAt'
                        }
                    })
            }

        })
        .then(response => res.json(response))
        .catch(err => next(err))

})

module.exports = router