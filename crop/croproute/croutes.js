const express = require("express")
const router = new express.Router();

const Crop = require("../model/cropmodel");


// get request
router.get('/', (req, res) => {
    res.send('Hello crop here');
  })

// get request
router.get('/crop', (req, res) => {
    Crop.find().then((result) => {
      res.send(result)
    }).catch((error) => {
      res.status(500).send(error);
    })
  
  })
  
  router.get('/crop/:id', (req, res) => {
    Crop.findById(req.params.id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      })
  
  })
  
  router.post("/crop", async (req, res) => {
    console.log(req.body);
    const Cropi = new Crop(req.body);
  
    try {
      await Cropi.save();
      res.status(201).send(Cropi);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
//   router.put("/crop/:id", (req, res) => {
//     Crop.findByIdAndUpdate(req.params.id, req.body)
//       .then((result) => {
//         res.send(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   });
  
  router.delete("/crop/:id", (req, res) => {
    Crop.findByIdAndRemove(req.params.id, req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.patch("/crop/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const Cpatch = await Crop.findByIdAndUpdate(_id,req.body, {new:true});
      res.status(201).send(Cpatch);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  module.exports = router;