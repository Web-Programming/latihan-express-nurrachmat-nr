<<<<<<< HEAD
let mongoose = require("mongoose");

//https://mongoosejs.com/docs/schematypes.html
//Create Collection Schema
let schemaMhs = new mongoose.Schema({
  nama: String,
  npm: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  tanggal_lahir: {
    type: Date,
  },
  aktif: Boolean,
});

//create Model from Schema
mongoose.model("Mahasiswa", schemaMhs);
=======
const mongoose = require("mongoose");

const mahasiswaSchema = new mongoose.Schema({
    nama :{
        type: String,
    },
    npm : {
        type: String,
        require: true,
    },
    email : {
        type : String,
        require : true,
        unique : true,
    },
    tanggal_lahir: {
        type : Date,

    },
    aktif:{
        type : Boolean,
    }
});

const Mahasiswa = mongoose.model('Mahasiswa', mahasiswaSchema);
module.exports= Mahasiswa;
>>>>>>> 9a56162b6714c6652dce5f94d541eb2fab779a0b
