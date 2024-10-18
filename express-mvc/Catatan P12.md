## Config the MongoDB Connection 
1. Buka file app_server > models > db.js
2. Ubah variable `dbURI` menuju server mongodb.com
`let dbURI = "mongodb+srv://paw2:si@paw2.iendmj6.mongodb.net/?retryWrites=true&w=majority&appName=paw2"`

## Create Collection Schema
1. Buat file baru di dalam folder app_server > models dengan nama `mahasiswa.js`
2. Buat Schema sesuai struktur dokumen berikut :
```
nama : String
npm : String / required
email : String /required
tanggal_lahir : Date
aktif : Boolean
```
> - Dokumentasi Schema dapat dilihat pada link berikut https://mongoosejs.com/docs/guide.html

## Compiling Model
Untuk membuat model, gunakan fungsi `mongoose.model()`
Contoh :
```
const schema = new mongoose.Schema({ name: String, size: String });
const Tank = mongoose.model('Tank', schema);
```
Parameter pertama pada fungsi `.model()` adalah nama model untuk collection anda. *Mongoose secara otomatis mencari versi jamak, huruf kecil dari nama model Anda.* 
Jadi, untuk contoh di atas, model Tank adalah untuk collection `tanks` di dalam database MongoDB anda.

## Create Model from Schema
1. Lanjutkan mengedit file mahasiswa.js
2. Buat model `Mahasiswa` dari schema mahasiswa yang telah anda buat sebelumnya

    > Source code model `mahasiswa.js` https://gist.github.com/nurrachmat-nr/38e528b6c9174445a24a0ea82c8e39b7 

## Use the Model in Controller and Route
1. Lanjutkan mengedit file db.js
2. Panggil model mahasiswa.js menggunakan fungsi `require()`
```js
// ... your db connection
//letakkan di dalam file db.js

require("./mahasiswa");
```
3. Buat file controller di dalam folder app_server > controllers dengan nama `mahasiswa.js`
4. Buat controller untuk menghandle request dan memberikan response JSON dari model Mahasiswa dengan kebutuhan sebagai berikut :
> - index -> untuk menghandle request get all data mahasiswa
> - insert -> untuk menghandle request insert data mahasiswa
> - update -> untuk menghandle request update data mahasiswa
> - show -> untuk menghandle request detail data mahasiswa berdasarkan id
> - delete -> untuk menghandle request delete data mahasiswa

> Source code controller mahasiswa : https://gist.github.com/nurrachmat-nr/6c449ef1cd54ad51f98b428d5f4a1c2e

5. Buat route untuk mendaftarkan URL dari setiap request yang sebelumnya telah dibuat pada controller, antara lain `index, insert, uodate, show dan destroy`
```js
const mhsController = require('../controllers/mahasiswa');
router.get("/", mhsController.index); //list mahasiswa
router.post("/insert", mhsController.insert); //insert mahasiswa
router.patch("/update/:id", mhsController.update); //mengupdate mahasiswa
router.get("/show/:id", mhsController.show); //show detail mahasiswa by id
router.delete("/delete/:id", mhsController.destroy); //delete mahasiswa by id
```


### Challange
> 1. Pisahkan router mahasiswa pada modul terpisah, di dalam folder app_server > routes dengan nama file `mahasiswa.js`
> 2. Panggil route mahasiswa.js di dalam file app.js
> 3. Lakukan pengaturan router pada file app.js sehingga modul mahasiswa dapat diakses melalui url `/mahasiswa/path_url` contoh :
`http://localhost:3000/mahasiswa/index`
> 4. Lakukan pengujian menggunakan POSTMAN

