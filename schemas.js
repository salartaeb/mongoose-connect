const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log("we're connected");
});

// Defining your Schema
//the Permitted schemaTypes are String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal, Map
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  comments: [{body: String, date: Date}],
  date: {type: Date, default: Date.now},
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  }
});

// Creating a Model
// to use our defined above mongoose.Schema, we need to create a model 
// to create a model we pass it into mongoose.model(modelName, schema)
const Blog = mongoose.model('Blog', blogSchema);

