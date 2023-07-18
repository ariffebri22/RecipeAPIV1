const Pool = require("../config/db");

const getRecipe = async () => {
    console.log("model getRecipe");
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipe`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
                c;
            }
        })
    );
};

const postRecipe = async (data) => {
    const { title, ingredients, category } = data;
    console.log(data);
    console.log("model postRecipe");
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO recipe(title,ingredients,category,photo) VALUES('${title}','${ingredients}','${category}','https://placehold.co/600x400')`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const putRecipe = async (data) => {
    const { id, title, ingredients, category } = data;
    console.log("model postRecipe");
    return new Promise((resolve, reject) =>
        Pool.query(`UPDATE recipe SET title='${title}', ingredients='${ingredients}', category = '${category}' WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const getRecipeById = async (id) => {
    console.log("model recipe by id ->", id);
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipe WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const deleteById = async (id) => {
    console.log("delete recipe by id ->", id);
    return new Promise((resolve, reject) =>
        Pool.query(`DELETE FROM recipe WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

module.exports = { getRecipe, getRecipeById, deleteById, postRecipe, putRecipe };
