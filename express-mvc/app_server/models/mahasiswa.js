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