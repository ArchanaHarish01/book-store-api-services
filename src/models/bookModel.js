const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const bookSchema = new mongoose.Schema({
     _id: {
        type: String,
        default: () => randomUUID()
     },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: Number,
    genre: String,
    price: Number
}, { timestamps: true })

bookSchema.virtual('id').get(function () {
  return this._id;
});

bookSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
