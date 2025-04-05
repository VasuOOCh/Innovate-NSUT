import Item from "../models/Item.js"

export const uploadQuery = async (req,res,next) => {
    try {
        const {name,desc,location} = req.body;
        const images = req.body;
        const newItem = new Item({
            ...req.body,
            owner : req.user.userId
        })

        console.log(newItem);
        res.status(200).json("ok")
    } catch (error) {
        next(error)
    }
}