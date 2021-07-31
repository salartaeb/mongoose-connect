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

//ids are added by default, you can overwrite them but that you means you also need to make sure you set it as well.
console.log(blogSchema.path('_id')); //gives us defaulty assigned ObjectId instance of the _id property

// ***************************

//define a new Schema
const animalSchema = new mongoose.Schema({ name: String, type: String});

// assign a function to the methods object of our animal schema
//now all of our animalSchema instances will have the findSimiliarTypes method available to them
animalSchema.methods.findSimilarTypes = function(cb) {
  return mongoose.model('Animal').find({ type: this.type }, cb);
};


const Animal = new mongoose.model('Animal', animalSchema)
const dog = new Animal({type: "dog"});

dog.findSimilarTypes((err, dogs) => {
  return console.log(dogs); // woof
})

//declaring static methods with schema#static
animalSchema.statics.findByName = function(name) {
  if (name) return this.find({ name: new RegExp(name, 'i') });
};

