const mongoose = require("mongoose");
const Mahasiswa = mongoose.model("Mahasiswa");

//untuk menghandle request get all mahasiswa
const index = (req, res, next) => {
    // try {
    //     const mhs = await Mahasiswa.find({}, { __v: 0 });
    //     console.error(mhs);
    //     const responseMessage = {
    //         code: 200,
    //         success: true,
    //         message: "Successful",
    //         data: mhs
    //     };
    //     res.status(200).json(responseMessage);
    // } catch (error) {
    //     console.error(error); // Log the error for debugging
    //     const responseMessage = {
    //         code: 500,
    //         success: false,
    //         message: "Internal server error"
    //     };
    //     res.status(500).json(responseMessage);
    // }
    Mahasiswa.find({}, { __v: 0 })
      .then((mhs) => {
        const responseMessage = {
            code: 200,
            success: true,
            message: "Successfull",
            data: mhs
        };
        res.status(200).json(responseMessage);
      })
      .catch((e) => {
        const responseMessage = {
            code: 400,
            success: false,
            message: "Bad request"
        };
        res.status(400).json(responseMessage);
      });
};

//untuk menghandle request insert mahasiswa
const insert = (req, res, next) => {
    const mhs = new Mahasiswa({
      nama: req.body.nama,
      npm: req.body.npm,
      email: req.body.email,
      tanggal_lahir: req.body.tanggal_lahir,
      aktif: true
    });
  
    mhs
      .save()
      .then((result) => {
            const responseMessage = {
                code: 200,
                success: true,
                message: "Successfull",
                data: result
            };
            res.status(200).json(responseMessage);
        })
        .catch((e) => {
            const responseMessage = {
                code: 400,
                success: true,
                message: "Bad request"
            };
            res.status(400).json(responseMessage);
        });
};

//untuk menghandle request update mahasiswa
const update = (req, res, next) => {
     Mahasiswa
       .findByIdAndUpdate(req.params.id,{
            nama: req.body.nama,
            npm: req.body.npm,
            email: req.body.email,
            tanggal_lahir: req.body.tanggal_lahir,
         })
        .then((result) => {
            Mahasiswa
            .findById(req.params.id)
            .then((mhs) =>{
                const responseMessage = {
                    code: 200,
                    success: true,
                    message: "Successfull",
                    data: mhs
                };
                res.status(200).json(responseMessage);
            });        
        })
        .catch((e) => {
            const responseMessage = {
                code: 404,
                success: false,
                message: "ID " + req.params.id + " Not Found",
                error: e
            };
            res.status(404).json(responseMessage);
        });
};

//untuk menghandle request show detail
const show = (req, res, next) => {
    Mahasiswa
        .findById(req.params.id)
        .then((mhs) =>{
            const responseMessage = {
                code: 200,
                success: true,
                message: "Successfull",
                data: mhs
            };
            res.status(200).json(responseMessage);
        })
        .catch((e) => {
            const responseMessage = {
                code: 404,
                success: false,
                message: "ID " + req.params.id + " Not Found",
            };
            res.status(404).json(responseMessage);
        });
};


//untuk menghandle request delete
const destroy = (req, res, next) => {
    Mahasiswa
        .findByIdAndDelete(req.params.id)
        .then((mhs) => {
            const responseMessage = {
                code: 200,
                success: true,
                message: "Successfull",
            };
            res.status(200).json(responseMessage);
        })
        .catch((e) => {
            const responseMessage = {
                code: 404,
                success: false,
                message: "ID " + req.params.id + " Not Found",
                error: e
            };
            res.status(404).json(responseMessage);
        });
};

module.exports = {
    index, insert, update, show, destroy
}