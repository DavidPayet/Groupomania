const mongoose = require('mongoose');

// Création d'un shéma de données
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  // name: { type: String, required: false },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array },
  usersDisliked: { type: Array }
})

module.exports = mongoose.model('Post', postSchema)