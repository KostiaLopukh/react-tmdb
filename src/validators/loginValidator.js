import Joi from 'joi';
import {regexp} from '../constants';

const {EMAIL_REGEXP, PASSWORD_REGEXP} = regexp;


export const loginValidator = Joi.object({
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
})
