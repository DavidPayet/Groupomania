require('dotenv').config();

const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');

exports.createPost = (req, res, next) => {
  console.log('====================================');
  console.log(req);
  console.log('====================================');
  // Gestion des images
  // const postObject = JSON.parse(req.body.post)
  const postObject = req.body
  console.log('====================================');
  console.log(postObject);
  console.log('====================================');
  // Supprime l'id du front
  delete postObject._id

  if (postObject.image === 'null') {

    const postWithoutImg = new Post({
      ...postObject,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
    })

    // Enregistre le model dans la base de données
    postWithoutImg.save()
      .then(() => res.status(201).json({ message: 'Post enregistré !' }))
      .catch(error => {
        res.status(400).json({ error })
        console.log(error);
      })

  } else {

    const post = new Post({
      ...postObject,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
      // Génère l'URL d'une image
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    // Enregistre le model dans la base de données
    post.save()
      .then(() => res.status(201).json({ message: 'Post enregistré !' }))
      .catch(error => {
        res.status(400).json({ error })
        console.log(error);
      })

  }
}

exports.modifyPost = (req, res, next) => {
  User.findOne({ _id: req.auth.userId })
    .then(user => {

      Post.findOne({ _id: req.params.id })
        .then(post => {

          if (post.userId === req.auth.userId || user.isAdmin) {
            // MÀJ du fichier dans le dossier images en cas de modification unique de l'image du post
            if (req.file) {
              Post.findOne({ _id: req.params.id })
                .then(post => {
                  const filename = post.imageUrl.split('/images/')[1];

                  fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error
                  })
                })
                .catch(error => res.status(400).json({ error }))
            }

            // MÀJ du post
            const postObject = req.file ?
              {
                ...JSON.parse(req.body.post),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
              } : { ...req.body };

            Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Post modifié !' }))
              .catch(error => res.status(400).json({ error, message: "erreur dans updateOne" }))

          }
          // Vérifie l'id de l'auteur du post
          else if (post.userId !== req.auth.userId || !user.isAdmin) {
            return res.status(401).json({ error: new Error('Requête non autorisée !') })
          }

        })

    })
}

exports.deletePost = (req, res, next) => {
  User.findOne({ _id: req.auth.userId })
    .then(user => {

      // Vérifie que le post correspond bien à celui de l'utilisateur qui l'a posté
      Post.findOne({ _id: req.params.id })
        .then(post => {

          if (!post) {
            return res.status(404).json({ error: new Error('Post non trouvé !') })
          }

          if (post.userId === req.auth.userId || user.isAdmin) {
            if (post.imageUrl) {
              const filename = post.imageUrl.split('/images/')[1];

              fs.unlink(`images/${filename}`, () => {
                // Supprime le post sélectionné
                Post.deleteOne({ _id: req.params.id })
                  .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                  .catch(error => res.status(400).json({ error }))
              })
            } else {
              Post.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                .catch(error => res.status(400).json({ error }))
            }

          } else if (post.userId !== req.auth.userId || !user.isAdmin) {
            return res.status(401).json({ error: new Error('Requête non autorisée !') })
          }

        })

    })
}

// Récupération d'un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }))
}

// Récupération de tous les posts
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))
}

// Récupération de tous les posts d'un utilisateur
exports.getUserPosts = (req, res, next) => {
  Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))
}