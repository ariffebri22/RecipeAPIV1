const { getUsers, getUsersById, deleteUsersById, postUsers, putUsers } = require("../model/UsersModel");

const UsersController = {
    getData: async (req, res, next) => {
        let dataUsers = await getUsers();
        console.log("dataUsers");
        console.log(dataUsers);
        if (dataUsers) {
            res.status(200).json({ status: 200, message: "get data users success", data: dataUsers.rows });
        }
    },
    getDataById: async (req, res, next) => {
        const { id } = req.params;

        if (!id || id <= 0 || isNaN(id)) {
            return res.status(404).json({ message: "id wrong" });
        }

        let dataUsersId = await getUsersById(parseInt(id));

        console.log("dataUsers");
        console.log(dataUsersId);

        if (!dataUsersId.rows[0]) {
            return res.status(200).json({ status: 200, message: "get data users not found", data: [] });
        }

        return res.status(200).json({ status: 200, message: "get data users success", data: dataUsersId.rows[0] });
    },
    deleteDataById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(404).json({ message: "id wrong" });
            }

            let result = await deleteUsersById(parseInt(id));
            console.log(result);
            if (result.rowCount == 0) {
                throw new Error("delete data failed");
            }
            return res.status(200).json({ status: 200, message: "delete data users success", data: result.rows[0] });
        } catch (err) {
            return res.status(404).json({ status: 404, message: err.message });
        }
    },
    postData: async (req, res, next) => {
        const { username, password, email } = req.body;
        console.log("post data ");
        console.log(username, password, email);

        if (!username || !password || !email) {
            return res.status(404).json({ message: "input username password email required" });
        }
        let data = {
            username: username,
            password: password,
            email: email,
        };

        console.log("data");
        console.log(data);
        let result = postUsers(data);
        console.log(result);

        return res.status(200).json({ status: 200, message: "data users success", data });
    },
    putData: async (req, res, next) => {
        const { id } = req.params;
        const { username, password, email } = req.body;

        if (!id || id <= 0 || isNaN(id)) {
            return res.status(404).json({ message: "id wrong" });
        }

        let dataUsersId = await getUsersById(parseInt(id));

        console.log("put data");
        console.log(dataUsersId.rows[0]);

        let data = {
            username: username || dataUsersId.rows[0].username,
            password: password || dataUsersId.rows[0].password,
            email: email || dataUsersId.rows[0].email,
            id,
        };

        let result = putUsers(data);
        console.log(result);

        delete data.id;

        return res.status(200).json({ status: 200, message: "update data users success", data });
    },
};

module.exports = UsersController;
