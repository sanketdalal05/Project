
const Crop = require("../model/cropmodel");

// to get all 
exports.getcrops = (req, res) => {
    Crop.find()
        .then((result) => {
            res.status(200).send(result)
        }).catch((error) => {
            res.status(400).send(error);
        })
}
// to post
exports.postcrop = async (req, res) => {
    console.log(req.body);
    const Cropi = new Crop(req.body);
    try {
        await Cropi.save();              //saving to database under collection
        res.status(200).send(Cropi);
    } catch (error) {
        res.status(500).send(error);
    }
};

// to getby id
exports.onecrop = (req, res) => {
    Crop.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500)(err);
        })
};

// patch crop
exports.crop_patch = async (req, res) => {
    try {
        const _id = req.params.id;
        const Cpatch = await Crop.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).send(Cpatch);
    } catch (error) {
        res.status(500).send(error);
    }
};

// to delete crop
exports.crop_delete = (req, res) => {
    Crop.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send("not done");
        })
};

