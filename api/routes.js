module.exports = app => {
    const cars = require("./controllers.js");
    let router = require("express").Router();

    //create new car brand
    router.post("/", cars.create);

    // Retrieve all car brand
    router.get("/", cars.findAll);

    // update car brand with id
    router.put("/", cars.update);

    // Delete a car with id
    router.delete("/:id", cars.delete);

    app.use('/api/cars', router);
}