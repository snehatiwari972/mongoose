const express = require('express');
const app = express();
const CrudControllers = require('../controller/crud.controllers')
const router = express.Router();
 
// const {usercontroller} = require('../controller/crudController');

router.get('/', CrudControllers.showUser);
router.post('/create', CrudControllers.CreateUser);
router.put('/update/:_id', CrudControllers.UpdateUser);
router.delete('/delete/:id', CrudControllers.DeletedUser);




// router.post('/',usercontroller.create);

// router.get('/',usercontroller.findAll);

// router.get('/:id',usercontroller.findById);

// router.put('/:id',usercontroller.update);

// router.delete('/:id',usercontroller.delete);




module.exports = router;
