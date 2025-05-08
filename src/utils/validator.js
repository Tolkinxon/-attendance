import Joi from 'joi';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const parolPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/;
const phonePattern = /^9989[012345789][0-9]{7}$/;


export function loginValidate(req, res, next){
    const loginSchema = Joi.object({
        email: Joi.string().min(3).max(20).pattern(emailPattern).required().messages({'string.pattern.base':'Incorrect email!', 'any.required':'Email is requeired!', 'string.empty': 'Email is empty please type your email!'}),
        password: Joi.string().min(3).max(20).pattern(parolPattern).required().messages({'string.pattern.base':'Incorrect password!', 'any.required':'Password is requeired!', 'string.empty': 'Password is empty please type your password!'})});

    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message, status: 400 });
    }
    return next();
}

export function employeeValidate(req, res, next){
    const employeeSchema = Joi.object({
        email: Joi.string().min(3).max(20).pattern(emailPattern).required().messages({'string.pattern.base':'Incorrect email!', 'any.required':'Email is requeired!', 'string.empty': 'Email is empty please type your email!'}),
        user_id: Joi.number().min(4).max(4).required().messages({'any.required':'Total is required!'}),
        lname: Joi.string().min(3).max(20).required().messages({'any.required':'Last name is requeired!'}),
        fname: Joi.string().min(3).max(20).required().messages({'any.required':'First name is requeired!'}),
        phone_num: Joi.string().min(3).max(20).pattern(phonePattern).required().messages({'string.pattern.base':'Incorrect phone number!',  'any.required':'Phone number is requeired!'}),
    });

    const { error, value } = employeeSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message, status: 400 });
    }
    return next();
}