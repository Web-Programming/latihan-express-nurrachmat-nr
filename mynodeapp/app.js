// app.js
const express =  require('express');
const app =  express();
const port = 3000;

//Route GET
// app.get("/", (req, res) => {
//     res.send("Hallo, GET request");
// });

//Middleware untuk parsing body request
app.use(express.json());
//Route POST
app.post("/submit", (req, res) => {
    const { name } = req.body
    res.send(`Hello, ${name}`);
});

//Serving static file
app.use(express.static('public'));

app.listen(port, () => {
    console.log('Server running at http://localhost:3000/');
});