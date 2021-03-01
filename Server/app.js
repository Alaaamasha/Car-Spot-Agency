
const express = require('express');
const app = express()
const port = 3000
const { mongoose } = require('./db/mongoose')

const { Vehicle } = require('./db/models')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});


/**
 * Get/Vehicles
 * get all the vehicles
 */
app.get('/vehicles',(req,res)=>{
    Vehicle.find({}).then((vehicles)=>{
        res.send(vehicles)
    })
})

/**
 * Post/vehiclles
 * create a new vehicle
 */
app.post('/vehicles',(req,res)=>{
    let v = {
        "type": req.body.type ,
        "brand":req.body.brand,
        "model":req.body.model,
        "year":req.body.year,
        "price":req.body.price,
        "publish_date":new Date()   
    }

    let newVehicle = new Vehicle(v)
    newVehicle.id = newVehicle._id
    newVehicle.save().then(v =>{
        res.send(v) 
    })
    
})

/**
 * Patch/vehicles/id
 * update a specific vehicle
 */
app.patch('/vehicles/:id',(req,res)=>{
    Vehicle.findByIdAndUpdate({ _id : req.params.id },{
        $set : req.body
    }).then(v=>{
        res.send(v)
    })  
})

/**
 * Delete/vehicles/id
 * delete a specific vehicle
 */
app.delete('/vehicles/:id',(req,res)=>{
    Vehicle.findOneAndRemove({ _id : req.params.id})
    .then((v)=>{
        res.send(v)
    })
})

app.listen(port,(req,res)=>{
    console.log('express api is running at port 3000');
})



