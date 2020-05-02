const express = require("express");
const router = express.Router();

//Item Model (make query)

const Item = require("../../models/Item");

//@route GET api/items
//@desc GET All Items
//@access Public

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//@route GET api/items
//@desc GET specific Item
//@access Public

router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

//@route POST api/items
//@desc Create A Item
//@access Public

router.post("/", (req, res) => {
  const newITem = new Item({
    name: req.body.name,
  });

  newITem.save().then((item) => res.json(item));
});

//@route DELETE api/items
//@desc DELETE A Item
//@access Public

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
