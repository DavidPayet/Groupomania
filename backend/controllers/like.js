const Post = require('../models/Post');

exports.likePost = (req, res, next) => {

  Post.findOne({ _id: req.params.id })
    .then(post => {

      // Si userId n'est pas dans le tableau usersLiked et que like = 1
      if (!post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        Post.updateOne({ _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId }
          })
          .then(() => res.status(201).json({ message: 'like +1' }))
          .catch(error => res.status(400).json({ error }))
      }

      // Si userId est dans le tableau usersLiked et que like = 0
      if (post.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        Post.updateOne({ _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId }
          })
          .then(() => res.status(201).json({ message: 'like -1' }))
          .catch(error => res.status(400).json({ error }))
      }

    })
    .catch(error => res.status(404).json({ error }))

}