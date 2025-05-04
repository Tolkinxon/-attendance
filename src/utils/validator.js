import Joi from 'joi';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const parolPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/;


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