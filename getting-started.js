const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log("we're connected");
});

//defining our kitten schema
const kittySchema = new mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function () {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}


// a model is a class in which we construct documents, 
// in this case each document will be a kitty with properties and behaviours declared in schema.
const Kitten = mongoose.model('Kitten', kittySchema);
// For now we have only defined the name property which accepts a String
// Lets create a kitty document below

const silence = new Kitten({name: 'Silence'});
// console.log(silence.name, 'this is the name of new kitty we made');


// to save a mongodb document you need to call the save function on it
silence.save(function (err, silence) {
  if (err) return console.error(err);
  silence.speak();
})

// Kitten.find((err, kittens) => {
//   if (err) return console.log(err);
//   console.log(kittens);
// })

Kitten.find({ name: /^Silence/ });