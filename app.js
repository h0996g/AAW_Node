require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');//installer le module mongoose (avant vous devez installer et configurer Mongodb)
const apiRouter = require('./routes/api');

const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000
// Connexion à la base de données MongoDB
// mongoose.set('strictQuery', false);

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
//   .then(() => {
//     console.log('Connexion réussie à la base de données');



//     app.use('/', apiRouter);
//     app.listen(port, () => {
//       console.log(`Server started on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.log(`Erreur de connexion à la base de données : ${error}`);
//   });
mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(PORT);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
app.use('/', apiRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  })
})