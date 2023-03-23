const Cars = require("./model.js");
const BrandModels = require("./model.brand.models");

// Create new Car Brand
exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Missing Parameter"
        });
    }

    //Create a Car Brand
    const car = new Cars({
        brand_name: req.body.brand_name,
    });

    // Save car brand in the database
    Cars.create(car, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error Saving Car Brand"
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Missing Parameter"
        });
    }


    // Get All car brand in the database
    Cars.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error Saving Car Brand"
            });
        else res.send(data);
    });
};

exports.update = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Missing Parameter"
        });
    }


    Cars.updateById(
        new Cars(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Cars with id ${req.body.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Cars with id " + req.body.id
                    });
                }
            } else res.send(data);
        }
    );
};


exports.delete = (req, res) => {
    Cars.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found car with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete car with id " + req.params.id
                });
            }
        } else res.send({ result:true, message: `car was deleted successfully!` });
    });
};

exports.findModelsByID = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Missing Parameter"
        });
    }


    // Get All car brand models in the database
    BrandModels.findModelsByID(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error Saving Car Brand"
            });
        else res.send(data);
    });
};


// Create new Car Brand
exports.createBrandModel = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Missing Parameter"
        });
    }

    //Create a Car Brand
    const brandModels = new BrandModels({
        brand_id: req.body.brand_id,
        model_name: req.body.model_name,
    });

    // Save car brand in the database
    BrandModels.createBrandModel(brandModels, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error Saving Car Brand Model"
            });
        else res.send(data);
    });
};

exports.updateBrandModel = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Missing Parameter"
        });
    }


    BrandModels.updateBrandModelById(
        new BrandModels(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Car Brand Model with id ${req.body.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Car Brand Model with id " + req.body.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.deleteBrandModel = (req, res) => {
    BrandModels.removeBrandModel(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found car with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete car with id " + req.params.id
                });
            }
        } else res.send({ result:true, message: `car brand model was deleted successfully!` });
    });
};
