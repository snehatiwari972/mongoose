// require('../model/crud.model');
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),

        number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),

        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

       
      })
      const validateData = (data) => {
        return schema.validate(data);
    };

    
    module.exports = { validateData };