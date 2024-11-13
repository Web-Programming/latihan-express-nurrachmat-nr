let mongoose = require("mongoose");
<<<<<<< HEAD
//let dbURI = "mongodb://localhost:27017/pawII-si5c";
let dbURI = "mongodb+srv://paw2:si@paw2.iendmj6.mongodb.net/PAWII-SI?retryWrites=true&w=majority&appName=paw2"
=======
//let dbURI = "mongodb://localhost:27017";
let dbURI = "mongodb+srv://paw2:si@paw2.iendmj6.mongodb.net/PAWII-SI?retryWrites=true&w=majority&appName=paw2";

mongoose.connect(dbURI,{
    //useNewURLParser: true
});

mongoose.connection.on("connected", () => {
    console.log("Connected To MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.log("Connection Error: " + error);
});

mongoose.connection.on("disconected", () => {
    console.log("Disconnected From MongoDB");
});

<<<<<<< HEAD
require("./mahasiswa");
=======
>>>>>>> 9a56162b6714c6652dce5f94d541eb2fab779a0b
