const deal = require("../model/dealermodel");
const bcrypt = require('bcryptjs');

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
        req.body.password = await bcrypt.hash(req.body.password, 10);
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

exports.dlogin = (req, res) => {
    console.log(req.body.email);

    try{
        const Em = req.body.email;
        const pass = req.body.password;

        const dfind = deal.findOne({email:Em})
        const dmatch = bcrypt.compare(pass,dfind.password);
        if (dmatch){
            res.send("login success")
        }
    }
        catch(error)  {
            res.status(400).send(error);
        }
}
// to getby id
exports.dealerbyid = (req, res) => {
    deal.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500)(err);
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
};