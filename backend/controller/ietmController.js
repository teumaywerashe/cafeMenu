import { itemModel } from "../models/itemModel.js";

export const addItem = async(req, res) => {
    try {
        if (!req.body.name ||
            !req.file ||
            !req.body.description ||
            !req.body.category ||
            !req.body.price ||
            !req.body.ownerId
        ) {
            console.log(req.body);
            return res
                .status(200)
                .json({ success: false, msg: "required field missed" });
        }

        const data = {
            name: req.body.name,
            image: req.file.filename,
            description: req.body.description,
            price: req.body.price,
            ownerId: req.body.ownerId,
            category: req.body.category,
        };

        const item = itemModel.create(data);
        res.status(200).json({ success: true, msg: "uploaded", item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};
export const getItem = async(req, res) => {
    try {
        const { id } = req.params;
        const item = await itemModel.findOne({ _id: id });
        if (!item) {
            return res.status(200).json({ success: false, msg: "item not found" });
        }
        return res.status(200).json({ success: true, item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error", success: false });
    }
};
export const getAllItems = async(req, res) => {
    try {
        const items = await itemModel.find();
        if (!items || items.length === 0) {
            return res
                .status(200)
                .json({ success: false, msg: "No items found for this user!" });
        }

        res.status(200).json({ success: true, items });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

export const getUserItems = async(req, res) => {
    try {
        const { id } = req.params;
        const items = await itemModel.find({ ownerId: id });
        if (!items || items.length === 0) {
            return res
                .status(200)
                .json({ success: false, msg: "No items found for this user!" });
        }
        res.status(200).json({ success: true, items });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

export const updateItem = async(req, res) => {
    try {
        const { id } = req.params;
        if (req.file) {
            req.body.image = req.file.filename;
        }
        const updatedItem = await itemModel.findByIdAndUpdate(
            id, { $set: req.body }, { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ success: false, msg: "Item not found" });
        }
        res.status(200).json({ success: true, msg: "updated", updatedItem });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

export const deleteItem = async(req, res) => {
    try {

        const { id } = req.params;
        const item = await itemModel.findByIdAndDelete(id);
        if (!item) {
            return res.status(200).json({ success: false, msg: "Item not found" });
        }

        res.status(200).json({ success: true, msg: "deleted", item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};