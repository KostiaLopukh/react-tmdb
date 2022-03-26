import Joi from 'joi';
import {regexp} from '../constants';

const {EMAIL_REGEXP, PASSWORD_REGEXP, PHONE_REGEXP} = regexp;


export const registerValidator = Joi.object({
    name: Joi.string().messages({
        'string.base': 'Name should be a string',
        'string.empty': 'Name is required',
    }),
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.pattern.base': 'Not valid email',
        }),
    password: Joi
        .string()
        .trim()
        .regex(PASSWORD_REGEXP)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.pattern.base': 'Not valid password',
        }),
    phone:Joi
        .string()
        .trim()
        .regex(PHONE_REGEXP)
        .messages({
            'string.empty': 'Phone is required',
            'string.pattern.base': 'Not valid phone',
        })
})
