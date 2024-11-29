## MengInstall Dependency untuk Kebutuhan Authentikasi
`npm install dotenv express-jwt jsonwebtoken passport passport-local`

### Membuat Model User
1. Buat file `user.js` di dalam folder **app_server > models**
2. Import module `crypto` dan `jsonwebtoken`

> Crypto dan jsonwebtoken adalah dua dependensi penting dalam Node.js untuk mendukung keamanan aplikasi:

> Crypto : 
> - Modul bawaan Node.js yang menyediakan fungsi kriptografi seperti enkripsi, hashing, dan pembuatan kunci.
> - Digunakan untuk memastikan keamanan data, misalnya hashing password (dengan algoritma seperti SHA256) atau membuat token.

> Jsonwebtoken (JWT) :
> - Dependensi untuk membuat, menandatangani, dan memverifikasi JSON Web Tokens (JWT).
> - JWT digunakan untuk autentikasi stateless, sering dalam API REST.
> - Token dienkripsi dengan algoritma (HMAC atau RSA) untuk menjamin integritas dan dapat membawa payload berisi informasi pengguna.

``` js
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    hash: String,   \\untuk menyimpan password terenkripsi
    salt: String
});
```
3. Buat fungsi setPassword untuk mengencrypt plain text password
```js
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
}
```

4. Buat fungsi `validPassword` untuk memavaliasi password plain text dengan password yang terenkripsi
``` js
userSchema.methods.validPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.hash === hash;
}
```

5. Buat file `.env` dan simpan **Kunci Rahasia** anda pada file .env
``JWT_SECRET=kuncirahasia``
6. Buat fungsi `generateJwt` untuk membuat token yang akan digunakan oleh FrontEnd
``` js
userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // 7 hari

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
}
```
7. Panggil dependensi `dotenv` di awal script pada file **app.js**
```js
 require('dotenv').config();
 ```

### Buat Konfigurasi Middleware Passport
Passport adalah middleware untuk autentikasi pada aplikasi Node.js. Passport dirancang agar fleksibel dan modular, memungkinkan integrasi dengan berbagai strategi autentikasi, seperti login berbasis username dan password, OAuth (misalnya Google, Facebook, Twitter), dan lainnya.

Keunggulan utama Passport:
- Sederhana: Passport hanya menangani proses autentikasi, memisahkan logika autentikasi dari aplikasi utama.
- Modular: Mendukung berbagai strategi autentikasi melalui plugin (passport-local, passport-jwt, passport-google-oauth, dll.).

1. Buat folder `configs` di dalam folder **app_server** 
2. Buat file `passport.js`
3. Buat configurasi authentikasi menggunakan library passport
```js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");
 
passport.use(new LocalStrategy({
    usernameField: 'email',
}, (username, password, done) => {
    User.findOne({
        email: username
    }).then((user) => {
        //jika user tidak ditemukan
        if (!user) {
            return done(null, false, {
                message: 'Incorrect username'
            })
        }
        //jika password salah
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Incorrect password'
            })
        }
        return done(null, user);
    }).catch((err) => {
        if (err) {
            return done(err);
        }
    })
}))
```
4. Panggil modul `passport` pada **app.js**
```js 
require("./app_server/configs/passport"); //load file config
```


### Membuat Controller dan Routes
1. Buat file `controllerAuth.js` pada  folder **controllers**
2. Buat fungsi untuk controller `register` dan `login` yang memanggil method  `generateJwt()` saat user berhasil melakukan registrasi dan login
```js
const passport = require('passport');
const login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ "message": "All fields required" });
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(404).json(err);
        }
        if (user) {
            const token = user.generateJwt();
            res.status(200).json({token});
        } else {
            res.status(401).json(info);
        }
    })(req, res, next);
};

const register = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({"message": "All fields required"});
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    
    user.save()
        .then((result) => {
            const token = user.generateJwt();
            res.status(200).json({token});
        })
        .catch((err) => {
            res.status(400).json({
                    ... err,
                    "message": "User with the same username already registered"
                });
        });
};
module.exports = { register, login };
```

3. Buat route ke url `/login` dan `/register` pada route *users.js*
4. Import controllerAuth dan panggil controller pada route yang telah disiapkan
```js
const ctrlAuth = require('../controllers/controllerAuth');
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

```
## Uji Coba API 
- Lakukan ujicoba API menggunakan postman
- Pastikan route berhasil dipanggil, contoh response jika proses register dan login berhasil
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4NGM2YTk3NzVjODAyMjc5YjIwMmEiLCJlbWFpbCI6ImFkbWluIiwibmFtZSI6InJhY2htYXQiLCJleHAiOjE3MzMzOTY0NDcsImlhdCI6MTczMjc5MTY0N30.v3Qy1Z-8Z8vAho4UIFGTEbHAo37d7EgTtq7duDXAu50"
}
```

- Jika API tidak dapat diakses dikarenakan **CORS**, install dependensi **cors** menggunakan NPM
- Import modul cors dan daftarkan middleware cors pada file app.js
``` js
//letakkan di bawah var app = express();
var cors = require('cors');
app.use(cors())
```

## Kode Lengkap
Kode lengkap tentang membuat Authentikasi pada project express js dapat dilihat pada branch **auth-api** di repository Latihan Express berikut : 
[Auth API](https://github.com/Web-Programming/latihan-express-nurrachmat-nr-1/tree/auth-api)
