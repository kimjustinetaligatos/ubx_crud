const sql = require("./db.js");

//constructor
const BrandModels = function(car){
    this.id = car.id,
    this.brand_id = car.brand_id,
    this.model_name = car.model_name
}


BrandModels.findModelsByID = (brand_id, result) => {
    let query = "SELECT * FROM models WHERE brand_id = ?";

    sql.query(query, brand_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("cars: ", res);
        result(null, res);
    });
};

BrandModels.createBrandModel = (newCar, result) => {
    sql.query("INSERT INTO models SET ?", newCar, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("added car brand models: ", { id: res.insertId, ...newCar });
        result(null, { result:true, id: res.insertId, ...newCar });
    });
};

BrandModels.updateBrandModelById = (car, result) => {
    sql.query(
        "UPDATE models SET model_name = ? WHERE id = ?",
        [car.model_name, car.id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {

                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated car brand model: ", { id: car.id, ...car });
            result(null, { result:true, id: car.id, ...car });
        }
    );
};


BrandModels.removeBrandModel = (id, result) => {
    sql.query("DELETE FROM models WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {

            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted car brand model with id: ", id);
        result(null, res);
    });
};


module.exports = BrandModels;