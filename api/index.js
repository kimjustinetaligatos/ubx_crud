const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//ALLOW CORS
app.use(cors({
    origin: 'http://localhost:8080'
}));

// default get route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to UBx Crud - Cars API" });
});

//call routes
require("./routes.js")(app);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})