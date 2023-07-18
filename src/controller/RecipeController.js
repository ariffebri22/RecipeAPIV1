const { getRecipe, getRecipeById, deleteById, postRecipe, putRecipe } = require("../model/RecipeModel");

const RecipeController = {
    getData: async (req, res, next) => {
        let dataRecipe = await getRecipe();
        console.log("dataRecipe");
        console.log(dataRecipe);
        if (dataRecipe) {
            res.status(200).json({ status: 200, message: "get data recipe success", data: dataRecipe.rows });
        }
    },
    getDataById: async (req, res, next) => {
        const { id } = req.params;

        if (!id || id <= 0 || isNaN(id)) {
            return res.status(404).json({ message: "id wrong" });
        }

        let dataRecipeId = await getRecipeById(parseInt(id));

        console.log("dataRecipe");
        console.log(dataRecipeId);

        if (!dataRecipeId.rows[0]) {
            return res.status(200).json({ status: 200, message: "get data recipe not found", data: [] });
        }

        return res.status(200).json({ status: 200, message: "get data recipe success", data: dataRecipeId.rows[0] });
    },
    deleteDataById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(404).json({ message: "id wrong" });
            }

            let result = await deleteById(parseInt(id));
            console.log(result);
            if (result.rowCount == 0) {
                throw new Error("delete data failed");
            }
            return res.status(200).json({ status: 200, message: "delete data recipe success", data: result.rows[0] });
        } catch (err) {
            return res.status(404).json({ status: 404, message: err.message });
        }
    },
    postData: async (req, res, next) => {
        const { title, ingredients, category } = req.body;
        console.log("post data ");
        console.log(title, ingredients, category);

        if (!title || !ingredients || !category) {
            return res.status(404).json({ message: "input title ingredients category required" });
        }
        let data = {
            title: title,
            ingredients: ingredients,
            category: category,
        };

        console.log("data");
        console.log(data);
        let result = postRecipe(data);
        console.log(result);

        return res.status(200).json({ status: 200, message: "data recipe success", data });
    },
    putData: async (req, res, next) => {
        const { id } = req.params;
        const { title, ingredients, category } = req.body;

        if (!id || id <= 0 || isNaN(id)) {
            return res.status(404).json({ message: "id wrong" });
        }

        let dataRecipeId = await getRecipeById(parseInt(id));

        console.log("put data");
        console.log(dataRecipeId.rows[0]);

        let data = {
            title: title || dataRecipeId.rows[0].title,
            ingredients: ingredients || dataRecipeId.rows[0].ingredients,
            category: category || dataRecipeId.rows[0].category,
            id,
        };

        let result = putRecipe(data);
        console.log(result);

        delete data.id;

        return res.status(200).json({ status: 200, message: "update data recipe success", data });
    },
};

module.exports = RecipeController;
