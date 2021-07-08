const adm = require("../model/admmodel");
const axios = require('axios');

exports.findall = (req, res) => {
    adm.find()
        .then((result) => {
            res.status(201).send(result);
        })
        .catch(error => {
            res.status(500).send(error);
        });

};

exports.findone = (req, res) => {
    adm.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })

}
// creat a new user

exports.create = (async (req, res) => {
    console.log(req.body);
    const Adm = new adm(req.body);

    try {
        await Adm.save();
        res.status(201).send(Adm);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});


exports.update = (req, res) => {
    adm.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(404).send(err);
        })
};

exports.remove = (req, res) => {
    adm.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
};

// exports.addfarmer = (req,res)=>{
//     axios.post('http://localhost:3000/farmer/',req.body).then((response)=>{
//         res.send(response.data);
//     })
// }



// exports.patch = (async (req, res) => {
//     try {
//         const _id = req.params.id;
//         const fpatch = await adm.findByIdAndUpdate(_id, req.body, { new: true });
//         res.status(201).send(fpatch);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });
