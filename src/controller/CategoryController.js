const { getCategory, getCategoryById, deleteCategoryById, postCategory, putCategory } = require("../model/CategoryModel");

const CategoryController = {
    getData: async (req, res, next) => {
        let dataCategory = await getCategory();
        console.log("dataCategory");
        console.log(dataCategory);
        if (dataCategory) {
            res.status(200).json({ status: 200, message: "get data category success", data: dataCategory.rows });
        }
    },
    getDataById: async (req, res, next) => {
        const { id } = req.params;

        if (!id || id <= 0 || isNaN(id)) {
            return res.status(404).json({ message: "id wrong" });
        }

        let dataCategoryId = await getCategoryById(parseInt(id));

        console.log("dataCategory");
        console.log(dataCategoryId);

        if (!dataCategoryId.rows[0]) {
            return res.status(200).json({ status: 200, message: "get data category not found", data: [] });
        }

        return res.status(200).json({ status: 200, message: "get data category success", data: dataCategoryId.rows[0] });
    },
    deleteDataById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(404).json({ message: "id wrong" });
            }

            let result = await deleteCategoryById(parseInt(id));
            console.log(result);
            if (result.rowCount == 0) {
                throw new Error("delete data failed");
            }
            return res.status(200).json({ status: 200, message: "delete data category success", data: result.rows[0] });
        } catch (err) {
            return res.status(404).json({ status: 404, message: err.message });
        }
    },
    postData: async (req, res, next) => {
        const { name, description } = req.body;
        console.log("post data ");
        console.log(name, description);

        if (!name || !description) {
            return res.status(404).json({ message: "input name category required" });
        }
        let data = {
            name: name,
            description: description,
        };

        console.log("data");
        console.log(data);
        let result = postCategory(data);
        console.log(result);

        return res.status(200).json({ status: 200, message: "data category success", data });
    },
    putData: async (req, res, next) => {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!id || id <= 0 || isNaN(id)) {
            return res.status(404).json({ message: "id wrong" });
        }

        let dataCategoryId = await getCategoryById(parseInt(id));

        console.log("put data");
        console.log(dataCategoryId.rows[0]);

        let data = {
            name: name || dataCategoryId.rows[0].name,
            description: description || dataCategoryId.rows[0].description,
            id,
        };

        let result = putCategory(data);
        console.log(result);

        delete data.id;

        return res.status(200).json({ status: 200, message: "update data category success", data });
    },
};

module.exports = CategoryController;