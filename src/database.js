const mongoose = require("mongoose");

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;

/*const MONGODB_URI = `mongodb://${
  NOTES_APP_MONGODB_HOST ? NOTES_APP_MONGODB_HOST : "localhost"
}/${NOTES_APP_MONGODB_DATABASE ? NOTES_APP_MONGODB_DATABASE : "test"}`;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then((db) => console.log("Mongodb is connected to", db.connection.host))
  .catch((err) => console.error(err));*/
  mongoose.connect('mongodb+srv://test:12345@cluster0.bykej.mongodb.net/smartpymes?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true  },
  ()=>
     console.log('CXonexion con DB!')
 );
  
