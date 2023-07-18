const Pool = require("../config/db");

const getUsers = async () => {
    console.log("model getUsers");
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users ORDER BY id ASC`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const postUsers = async (data) => {
    const { username, password, email } = data;
    console.log(data);
    console.log("model postUsers");
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO users(username, password, email) VALUES('${username}','${password}','${email}')`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const putUsers = async (data) => {
    const { id, username, password, email } = data;
    console.log("model postUsers");
    return new Promise((resolve, reject) =>
        Pool.query(`UPDATE users SET username='${username}', password='${password}', email='${email}' WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const getUsersById = async (id) => {
    console.log("model users by id ->", id);
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const deleteUsersById = async (id) => {
    console.log("delete users by id ->", id);
    return new Promise((resolve, reject) =>
        Pool.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

module.exports = { getUsers, getUsersById, deleteUsersById, postUsers, putUsers };
