const router = require('express').Router();
const auth = require('../middleware/auth');
// create an isAdmin middleware
const ToDo = require('../models/todo.model');
const Item = require('../models/item.model');
const { faker } = require('@faker-js/faker');
router.get("/faker", async(req,res)=>{
    for(let i=0;i<10;i++){
        try {
            const title = faker.company.companyName()
            const image = faker.image.fashion()
            const description = faker.company.catchPhrase()
            const price = faker.datatype.number({
                'min': 10,
                'max': 50
            });
            const newItem = new Item({
            title,image,description,price
            });
            const savedItem = await newItem.save();
        } catch (err) {
            res.json(err)
        }
    }
    res.json({"created 10 entries?":"yes"});
})

router.get("/total",async (req,res)=>{
    try {
        const allItems = await Item.count();
        res.json({
            count:allItems
        })
    } catch (error) {
        res.sendStatus(404).json({error})
    }
})

router.get("/",  async(req,res) => {
// router.get("/", async(req,res) => {
    try{
        let{page,size} = req.query;
        if(!page) page=1; 
        if(!size) size=4; 
        const limit = parseInt(size)
        const skip = (page-1)*size;
        const items = await Item.find().limit(limit).skip(skip)
        res.json(items)
    } catch(err){
        res.sendStatus(500).send(err.message)
    }
})
router.delete("/:id", auth, async(req,res) => {
    const item = await Item.findOne({_id: req.params.id });
    if(!item) return res.status(400).json({msg: "Item not found !!"});
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
});
// TODO: update item
router.post("/:id",auth, async(req,res) => {
    try{
        const {id} = req.params
        if(!id) res.json({"err":"what to delete? please specify id"})

    } catch(err){
        res.sendStatus(500).send(err.message)
    }
})


module.exports = router;