const mongoose = require('mongoose')

const url = "mongodb+srv://SD-pro1:sdp1@cluster1.p4muh.mongodb.net/dealer?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ');
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })