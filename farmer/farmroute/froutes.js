const express = require("express")
const router = express.Router();

const Farm = require("../model/farmmodel");


// get request.

router.get("/", (req, res) => {
  res.send("hello farmer here");
});

router.get('/farmer', (req, res) => {
  Farm.find().then((result) => {
    res.status(201).send(result)
  }).catch(error => {
    res.send(error);
  });

});

router.get('/farmer/:id', (req, res) => {
  Farm.findById(req.params.id)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log(err);
    })

})
// creat a new farmer 
router.post("/farmer", async (req, res) => {
  console.log(req.body);
  const farm = new Farm(req.body);

  try {
    await farm.save();
    res.status(201).send(farm);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.post("/farmer/login", (req,res) => {},

router.put("/farmer/:id", (req, res) => {
  Farm.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});

router.delete("/farmer/:id", (req, res) => {
  Farm.findByIdAndRemove(req.params.id, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});

router.patch("/farmer/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const fpatch = await Farm.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(201).send(fpatch);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;