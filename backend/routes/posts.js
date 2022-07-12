const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const postCtrl = require('../controllers/posts');
const likeCtrl = require('../controllers/like');
const multer = require('../middlewares/multer-config');

// Crée un post + auth de sécurité + multer pour les images
router.post('/', auth, multer, postCtrl.createPost)
// Modifie un post
router.put('/:id', auth, multer, postCtrl.modifyPost)
// Supprime un post
router.delete('/:id', auth, postCtrl.deletePost)
// Récupère un post par son id
router.get('/:id', auth, postCtrl.getOnePost)
// Récupère tous les posts
router.get('/', auth, postCtrl.getAllPosts)
// Route pour les likes/dislikes
router.post('/:id/like', auth, likeCtrl.likePost)

module.exports = router;