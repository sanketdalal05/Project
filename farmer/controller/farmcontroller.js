const Farm = require("../model/farmmodel");
const bcrypt = ('bcryptjs');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken')
const axios = require('axios');

const getfarmer = (req, res) => {

    Farm.find().then((result) => {
        res.status(201).send(result);
    }).catch(error => {
        res.status(400).send(error);
        console.log("error in load all")
    });

};

// const createfarmer = async (req, res) => {
//     // console.log(req.body);
//    try{
//     const farm = new Farm(req.body);

//     const token = await farm.generateAuthToken();

//     res.cookie('jwt',token,{
//       expires:new Date(Date.now()+50000),
//       httpOnly:true
//     });

//     await farm.save();
//     res.status(200).send(result);
    

//   }catch (error) {
//     res.status(400).send(error);
//   }
// };


const createfarmer = async (req,res) => {
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    const farm = new Farm(req.body);
    farm.save()
    .then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.send(error);
        console.log(error)
    });
}


const getonefarmer = (req, res) => {

    Farm.findById(req.params.id).then((result) => {
        res.status(200).send(result);
    }).catch(error => {
        res.send(error);
        console.log(error);
    });

};

const farmupdate = (req, res) => {
    Farm.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(400).send("error found");
        })
};

const farmdelete = (req, res) => {
    Farm.findByIdAndRemove(req.params.id, req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
};

const farmpatch = async (req, res) => {
    try {
        const _id = req.params.id;
        const fpatch = await Farm.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(201).send(fpatch);
    } catch (error) {
        res.status(500).send(error);
    }
};

const farmlogin = async (req, res) => {
    try {
        var email = req.body.email;
        var pass = req.body.password;

        const user = await Farm.findOne({ email: email });

        const isMatch = await bcrypt.compare(pass, user.password);

        const token = await user.generateAuthToken();

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 50000),
            httpOnly: true
        });
        if (isMatch) {
            res.status(200).send("login done");
        } else {
            res.send("invalid password");
        }

    } catch (error) {
        res.status(400).send("invalid email");
        console.log(error)
    }
} 

const faddcrop = async (req, res) => {
    try {
        const cropResponse = await axios.post("http://localhost:7000/crop", req.body)
        if (cropResponse.status === 200) {
            Farm.findById(req.body.farmerid, (err, user) => {
                user.crops.push(cropResponse.data._id)
                user.save().then(() => {
                    res.send(`crop added `)
                }).catch((err) => {
                    res.send(err)
                })
            })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getfarmer,
    createfarmer,
    getonefarmer,
    farmupdate,
    farmdelete,
    farmpatch,
    faddcrop,
    farmlogin
}