const deal = require("../model/dealermodel");
const bcrypt = require('bcryptjs');
const axios = require('axios')

// to get all 
exports.dealerAll = (req, res) => {
    deal.find()
        .then((result) => {
            res.status(200).send(result)
        }).catch((error) => {
            res.status(400).send(error);
        })
}
// to post
exports.postDeal = async (req, res) => {
    try {
        // req.body.password = await bcrypt.hash(req.body.password, 10);
        const Del = new deal(req.body);
        //json web token
        const token = await Del.generateAuthToken();
        //cookies
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 200000),
            httpOnly: true
        });

        console.log(req.body);
        await Del.save();              //saving to database under collection
        res.status(200).send(Del);

    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
};

exports.cartpost = async (req, res) => {
    try {
        const cropResponse = await axios.post("http://localhost:7000/crop", req.body)
        if (cropResponse.status === 200) {
            deal.findById(req.body.customerid, (err, user) => {
                user.cropscart.push(cropResponse.data._id)
                user.save().then(() => {
                    res.send(`crop added `)
                }).catch((err) => {
                    res.send("error")
                })
            })
        }
    } catch (err) {
        console.log(err)
    }
}

exports.deallogin = async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;

        const user = await deal.findOne({ email: email });
        //bcrypt
        const isMatch = await bcrypt.compare(pass, user.password);
        //jwt
        const token = await user.generateAuthToken();
        //cookies
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        });
        //console.log(token); 
        if (isMatch) {
            res.status(201).send('login succesfull');
        } else {
            res.send("invalide password");
        }
    } catch (error) {
        res.status(400).send("invalide emailId");
    }

}
// exports.dlogin = async (req, res) => {


//     // console.log(req.body.email);

//     try {
//         const Em = req.body.email;
//         const pass = req.body.password;


//         const dfind = deal.findOne({ email: Em })
//         const dmatch = await bcrypt.compare(pass, dfind.password);

//         const token = await Del.generateAuthToken();
//         //cookies
//         res.cookie('jwt', token, {
//             expires: new Date(Date.now() + 200000),
//             httpOnly: true
//         });
//         if (dmatch) {
//             res.send("login success")
//         }
//     }
//     catch (error) {
//         console.log(error)
//         res.status(400).send(error);
//     }
// }
// to getby id
exports.dealerbyid = (req, res) => {
    deal.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
};

// patch 
exports.deal_patch = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const _id = req.params.id;
        const dpatch = await deal.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).send(dpatch);
    } catch (error) {
        res.status(500).send(error);
    }
};

// to delete 
exports.deal_delete = (req, res) => {
    deal.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send("not done");
        })
}

// exports.viewallcrop = (req,res)=>{
//     axios.get('http://localhost:7000/crop/').then((response)=>{
//         res.send(response.data)
//     }).catch((error)=>{
//         console.log(error);
//     })
// }