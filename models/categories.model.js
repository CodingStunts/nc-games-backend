const db = require("../db/connection");

exports.selectCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => {
    const categories = result.rows;
    /*          if (categories.length === 0){
        return Promise.reject({
          status: 404,
          msg: `No categories `,
        }); 
    }
 */ return categories;
  });
};
