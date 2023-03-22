const sql = require("./db.js");

//constructor
const Cars = function(car){
    this.id = car.id,
    this.brand_name = car.brand_name
}

Cars.create = (newCar, result) => {
    sql.query("INSERT INTO brands SET ?", newCar, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("added car brand: ", { id: res.insertId, ...newCar });
        result(null, { result:true, id: res.insertId, ...newCar });
    });
};

Cars.findAll = (result) => {
    let query = "SELECT * FROM brands";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("cars: ", res);
        result(null, res);
    });
};

Cars.updateById = (car, result) => {
    sql.query(
        "UPDATE brands SET brand_name = ? WHERE id = ?",
        [car.brand_name, car.id],
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

            console.log("updated car brand: ", { id: car.id, ...car });
            result(null, { result:true, id: car.id, ...car });
        }
    );
};


Cars.remove = (id, result) => {
    sql.query("DELETE FROM brands WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {

            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted car with id: ", id);
        result(null, res);
    });
};

module.exports = Cars;