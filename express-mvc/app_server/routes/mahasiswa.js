<<<<<<< HEAD

var express = require('express');
var router = express.Router();
//UTS
const mhsController = require('../controllers/mahasiswa');
router.get("/", mhsController.index); //list mahasiswa
router.post("/insert", mhsController.insert); //insert mahasiswa
//SAMPAI SINI

router.patch("/update/:id", mhsController.update); //mengupdate mahasiswa
router.get("/show/:id", mhsController.show); //show detail mahasiswa by id
=======
var express = require('express');
var router = express.Router();

const mhsController = require('../controllers/mahasiswacontroller');
router.get("/", mhsController.index); //list mahasiswa 
router.post("/insert", mhsController.insert); //insert mahasiswa
//SAMPAI DI SINI


router.patch("/update/:id", mhsController.update); //mengupdate mahasiswa 
router.get("/show/:id", mhsController.show); //show detail mahasiswa by id 
>>>>>>> 9a56162b6714c6652dce5f94d541eb2fab779a0b
router.delete("/delete/:id", mhsController.destroy); //delete mahasiswa by id

module.exports = router;