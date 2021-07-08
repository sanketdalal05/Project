const express = require('express');
const axios = require('axios');
require('./model/gatedb');
const Api = require('./model/gateschema');
const bcrypt = require('bcryptjs');
const authent = require('../middleware/auth');
const cookieParser = require('cookie-parser');
const api = express();
const port = process.env.PORT || 4001;
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

api.use(express.json());
api.use(cookieParser())


// const { response } = require('express');


//  api register
api.post('/register',async (req,res)=>{
    try {
      const user = new Api(req.body);
      //pass bcrypt
      //json web token
      const token = await user.generateAuthToken();
      //cookies
      res.cookie('jwt',token,{
        expires:new Date(Date.now()+600000),
        httpOnly:true
    });
      
      //saving data to database
      await user.save();
      res.status(201).send(user)
      console.log("working post");
    }catch (error) {
        console.log(error);
    }    
})

//login api


/**
 * @swagger
 * /login:
 *   post:
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object                      
 *     responses:
 *       200:
 *         description: Returns the requested dealer
 */

api.post('/login', async (req,res)=>{
    try {
        const username = req.body.username;
        const pass = req.body.password;

    const user = await Api.findOne({username:username});
    //bcrypt
    const isMatch = await bcrypt.compare(pass, user.password);
    //jwt
    const token = await user.generateAuthToken();


    console.log(token);
   
    //cookies
    res.cookie('jwt',token,{
        expires:new Date(Date.now()+600000),
        httpOnly:true
    });
    //console.log(token);
    
    if(isMatch){
        res.status(201).send('login succesfull');
    }else{
        res.send("invalide password");
    }
    } catch (error) {
        //res.status(400).send("invalide emailId");
        console.log(error);
    }
  
})


api.get('/logout',async(req,res)=>{
    try{
        res.clearCookie('jwt');
        res.send('logout success')
    }catch (err){
        console.log(err)
    }
})



//api home
api.get('/home',(req,res)=>{
    res.send('welcome')
    console.log('in home');
})

/**
 * @swagger
 * /dealer/get:
 *   get:
 *     responses:
 *       200:
 *         description: Returns all the dealers
 */

//Get dealer
api.get('/dealer/get',authent,(req,res)=>{
    axios.get('http://localhost:4000/dealer').then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

/**
 * @swagger
 * /farmer/get:
 *   get:
 *     responses:
 *       200:
 *         description: Returns all the farmers
 */

//Get farmer
api.get('/farmer/get',authent,(req,res)=>{
    axios.get('http://localhost:3000/farmer').then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

/**
 * @swagger
 * /farmer/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     description: farmer get by id
 *     responses:
 *       200:
 *         description: Returns the requested farmer
 */

//Get farmer by id
api.get('/farmer/:id',authent,(req,res)=>{
    const id = req.params.id;
    axios.get('http://localhost:3000/farmer/'+id).then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

/**
 * @swagger
 * /dealer/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     description: dealer get by id
 *     responses:
 *       200:
 *         description: Returns the requested dealer
 */

//Get dealer by id
api.get('/dealer/:id',authent,(req,res)=>{
    const id = req.params.id;
    axios.get('http://localhost:4000/dealer/'+id).then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})


//Post dealer
api.post('/dealer/post',authent,(req,res)=>{
    axios.post('http://localhost:4000/dealer/',req.body).then((response)=>{
        res.send(response.data);
    })
})

//Post farmer
api.post('/farmer/post',authent,(req,res)=>{
    axios.post('http://localhost:3000/farmer/',req.body).then((response)=>{
        res.send(response.data);
    })
})

//Patch farmer
api.patch('/farmer/patch/:id',authent,(req,res)=>{
    const id = req.params.id;
    axios.patch('http://localhost:3000/farmer/'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

//Patch dealer
api.patch('/dealer/patch/:id',authent,(req,res)=>{
    const id = req.params.id;
    axios.patch('http://localhost:4000/dealer/'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

/**
 * @swagger
 * /farmer/delete/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     description: dealer get by id
 *     responses:
 *       200:
 *         description: Returns the requested dealer
 */
//Delete farmer
api.delete('/farmer/delete/:id',authent,(req,res)=>{
    const id = req.params.id;
    axios.delete('http://localhost:3000/farmer/'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

//Delete dealer
api.delete('/dealer/delete/:id',authent,(req,res)=>{
    const id = req.params.id;
    axios.delete('http://localhost:4000/dealer/'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

//Get crop
api.get('/crop/get',(req,res)=>{
    axios.get('http://localhost:7000/crop/').then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

api.get('/crop/:id',authent,(req,res)=>{
    const id = req.params.id
    axios.get('http://localhost:7000/crop/'+id).then((response)=>{
        res.send(response.data);
    }).catch((error)=>{
        console.log(error);
    })
})

//Post crop
api.post('/crop/post',authent,(req,res)=>{
    axios.post('http://localhost:7000/crop',req.body).then((response)=>{
        res.send(response.data);
    })
})

// /**
//  * @swagger
//  * /crop/{name}:
//  *   get:
//  *     parameters:
//  *      - in: path
//  *        name: name
//  *        type: string
//  *     description: crop get by id
//  *     responses:
//  *       200:
//  *         description: Returns the requested crop
//  */

// //search crop
// api.get('/crop/:name',auth,(req,res)=>{
//     const name = req.params.name;
//     axios.get('http://localhost:7000/crop/'+name).then((response)=>{
//         res.send(response.data)
//     }).catch((error)=>{
//         console.log(error);
//     })
// })

//swagger
const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'API',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['api.js'],
};
api.use('/adminapi', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

api.listen(port,()=>{
    console.log(`listning to port ${port}`);
});