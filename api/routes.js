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

    // Retrieve all car brand models
    router.get("/brand/:id", cars.findModelsByID);

    //create new car brand model
    router.post("/brand", cars.createBrandModel);

    // update car brand with id
    router.put("/brand", cars.updateBrandModel);

    // Delete a car with id
    router.delete("/brand/:id", cars.deleteBrandModel);

    app.use('/api/cars', router);
}