const Farm = require("../model/farmmodel");
// const bcrypt = ('bcryptjs');

const getfarmer = (req, res) => {

    Farm.find().then((result) => {
        res.status(201).send(result);
    }).catch(error => {
        res.send(error);
        console.log("error in load all")
    });

};

const createfarmer = async (req, res) => {
    console.log(req.body);
    var farm = new Farm(req.body);
    farm.save()
    .then(result => {
        res.send(result)
    }).catch(error => {
        res.send(error);
        console.log("error in load all")
    });

}

//   try {

//     const farm = new Farm(req.body);
//     const token = await farm.generateAuthToken();

//     res.cookie('jwt',token,{
//       expires:new Date(Date.now()+50000),
//       httpOnly:true
//     });

//     await farm.save();
//     res.status(201).send(farm);

//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

const getonefarmer = (req, res) => {

    Farm.findById(req.params.id).then((result) => {
        res.status(201).send(result);
    }).catch(error => {
        res.send(error);
        console.log("error in load all")
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
        var email = req.bosy.email;
        var pass = req.body.password;

        const user = await Farm.findOne({ email: email });

        const isMatch = await bcrypt.compare(pass, user.password);

        const token = await user.generateAuthToken();

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 50000),
            httpOnly: true
        });
        if (isMatch) {
            res.send("login done");
        } else {
            res.send("invalid password")

        }

    } catch (error) {
        res.status(400).send("invalid email");
    }
}

module.exports = {
    getfarmer,
    createfarmer,
    getonefarmer,
    farmupdate,
    farmdelete,
    farmpatch,
    farmlogin
}