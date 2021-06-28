const express = require('express');
const axios = require('axios');

const api = express();
const port = process.env.PORT || 4001;

api.use(express.json());

//api home
api.get('/home',(req,res)=>{
    res.send('welcome to api gateway')
    console.log('in home');
})


//Get dealer
api.get('/dealer/get',(req,res)=>{
    axios.get('http://localhost:4000/dealer').then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

//Get farmer
api.get('/farmer/get',(req,res)=>{
    axios.get('http://localhost:3000/farmer').then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

//Get farmer by id
api.get('/farmer/:id', (req,res)=>{
    const id = req.params.id;
    axios.get('http://localhost:3000/farmer/'+id).then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

//Get dealer by id
api.get('/dealer/:id',(req,res)=>{
    const id = req.params.id;
    axios.get('http://localhost:4000/dealer/'+id).then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

//Post dealer
api.post('/dealer/post',(req,res)=>{
    axios.post('http://localhost:4000/dealer/',req.body).then((response)=>{
        res.send(response.data);
    })
})

//Post farmer
api.post('/farmer/post',(req,res)=>{
    axios.post('http://localhost:3000/farmer/',req.body).then((response)=>{
        res.send(response.data);
    })
})

//Patch farmer
api.patch('/farmer/patch/:id',(req,res)=>{
    const id = req.params.id;
    axios.patch('http://localhost:3000/farmer/'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

//Patch dealer
api.patch('/dealer/patch/:id',(req,res)=>{
    const id = req.params.id;
    axios.patch('http://localhost:4000/dealer/'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

//Delete farmer
api.delete('/farmer/delete/:id', (req,res)=>{
    const id = req.params.id;
    axios.patch('http://localhost:3000/farmer/'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

//Delete dealer
api.delete('/dealer/delete/:id', (req,res)=>{
    const id = req.params.id;
    axios.delete('http://localhost:4000/dealer/'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

//Get crop
api.get('/crop/get', (req,res)=>{
    axios.get('http://localhost:8080/crop/').then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        console.log(error);
    })
})

//Post crop
api.post('/crop/post', (req,res)=>{
    axios.post('http://localhost:8080/crop',req.body).then((response)=>{
        res.send(response.data);
    })
})


api.listen(port,()=>{
    console.log(`listning to port ${port}`);
});