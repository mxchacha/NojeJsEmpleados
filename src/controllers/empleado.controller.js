const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { Router } = require('express');
const Empleado = require("../models/empleado");



//API: DEVUELVE TODOS LOS REGISTROS DE EMPLEADOS

router.get('/api', async (req, res)=>{
    try {
        const empleados=await Empleado.find();
        res.json(empleados);
        
    } catch (err) {
        res.json({message:err})
    }
});
//API: DEVUELVE UN REGISTRO ESPECIFICO POR ID
/*router.get('/api/:id',async (req,res)=>{
    console.log(req.params.id);
    const empleado= await Empleado.findById(req.params.id);
    res.json(empleado);
    try {
        const empleado=await Empleado.findById(req.params.id);
        res.json(empleado);
    } catch (err) {
        res.json({message: err});
        
    }

});*/
//API: DEVUELVE UN REGISTRO BUSCADO MEDIANTE CEDULA
router.get('/api/:cedula',async (req,res)=>{
    console.log(req.params.cedula);

    const regex=new RegExp(req.params.cedula),query={cedula: regex};
    Empleado.find(query,function(err,empleados){
        if(err){
            res.json(err);
        }
        res.json(empleados)
    });

});

//API: ELIMINAR REGISTRO
router.delete('/api/:id',async (req,res)=>{
    console.log(req.params.id);
    try {
        const eliminarEmpleado=await Empleado.remove({_id:req.params.id});
        res.json(eliminarEmpleado);
    } catch (err) {
        res.json({message: err});
    }
});


router.get('/',async (req, res) => {
    res.render("empleado/addOrEdit", {
        viewTitle: "Insertar nuevo empleado"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var empleado = new Empleado();
    empleado.nombre = req.body.nombre;
    empleado.cedula = req.body.cedula;
    empleado.email = req.body.email;
    empleado.telefono = req.body.telefono;
    empleado.ciudad = req.body.ciudad;
    empleado.addres= req.body.addres;
    empleado.save((err, doc) => {
        console.log(req.params.id);
        if (!err)
            res.redirect('empleado/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("empleado/addOrEdit", {
                    viewTitle: "Insertar empleado",
                    empleado: req.body
                });
            }
            else
                console.log('Error al guardar empleado : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Empleado.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('empleado/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("empleado/addOrEdit", {
                    viewTitle: 'Update empleado',
                    empleado: req.body
                });
            }
            else
                console.log('Error al actualizar los datos : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Empleado.find((err, docs) => {
        if (!err) {
            res.render("empleado/list", {
                list: docs
            });
        }
        else {
            console.log('Error al mostrar lista de empleados :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'nombre':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Empleado.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("empleado/addOrEdit", {
                viewTitle: "Actualizar datos de empleado",
                empleado: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Empleado.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/empleado/list');
        }
        else { console.log('Error in empleado delete :' + err); }
    });
});

module.exports = router;