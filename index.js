const express = require('express');
const cors = require("cors");
// const serverless = require("serverless-http");
const app = express();
// const router = express.Router();
// const admin = require('firebase-admin');
// const serviceAccountKey = require("./sparkhq-db-firebase-adminsdk-5reln-7dd1226d5b.json");
const SendGrid = require("./controllers/controllers")
const port = process.env.PORT || 3001;

const router = require("./routes/routes")

// if(!admin.apps.length){
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccountKey),
//         databaseURL: 'https://sparkhq-db.firebaseapp.com'
//       });
// }


app.use(cors());
app.use(express.json());
app.use("/", router);


// app.get("/test", (req, res) => {
//     res.send("Hello, World!");
// })


app.listen(port, () => console.log("Server ready on port 3000."));

module.exports = app;
