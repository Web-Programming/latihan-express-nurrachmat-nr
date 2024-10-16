## Explore MongoDB with MongoDB Compass
1. Buka aplikasi MongoDB Compass
1. Buat koneksi ke server mongo db dengan uri : mongodb://localhost:27017
2. Buat Database dan Collection baru, contoh :
3. Nama Database pawII-si52 dan Nama Collection latihan-mongo

## Connect to MongoDB with mongoose
1. Buka project express-mvc
1. Install dependensi mongoose di dalam project express-mvc
2. Buat file db.js di dalam folder app_server > models
> - file db.js digunakan untuk menghandle koneksi ke server mongodb menggunakan mongoose
> - pastikan server mongodb telah dijalankan 
> - coba jalankan file db.js menggunakan node, pastikan muncul pesan "Connected to MongoDB"

3. Panggil file db.js dari file app.js
4. Jalankan server express dan pastikan "Connected to MongoDB"