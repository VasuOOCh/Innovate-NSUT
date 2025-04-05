import Item from "../models/Item.js"

export const uploadQuery = async (req,res,next) => {
    try {
        const {name,desc,location} = req.body;
        const images = req.body;
        if(images.length == 0) {
            images.push('https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg')
        }
        console.log(images);
        
        const newItem = new Item({
            ...req.body,
            owner : req.user.userId
        })

        await newItem.save();
        res.status(200).json(newItem);
    } catch (error) {
        next(error)
    }
}

export const getItems = async (req,res,next) => {
    try {
        const items = await Item.find().populate('owner', 'username email avatar');
        res.status(200).json(items)
    } catch (error) {
        next(error)
    }
}