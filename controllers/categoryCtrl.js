const Category = require('../models/categoryModel')

const categoryCtrl = {
    getCategory: async (req, res) => {
        const categories = await Category.find()
        res.json(categories)
    },
    createCategory: async (req, res) => {
        try {
            // only admin can create, delete and update category
            const { name } = req.body
            const category = await Category.findOne({ name })
            if (category) return res.status(400).json({ msg: "This categody already exsits." })

            const newCategory = new Category({ name })

            await newCategory.save()
            res.json({ msg: "Create a category" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a category" })
        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body
            await Category.findByIdAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "Updated a category" })
        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = categoryCtrl