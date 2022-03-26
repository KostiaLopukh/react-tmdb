import Joi from 'joi';
import {regexp} from '../constants';

const {PASSWORD_REGEXP} = regexp;


export const passwordValidator = Joi.object({
    password: Joi
        .string()
        .trim()
        .regex(PASSWORD_REGEXP)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.pattern.base': 'Not valid password',
        }),
    repeatPassword: Joi
        .string()
        .trim()
        .regex(PASSWORD_REGEXP)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.pattern.base': 'Not valid password',
        }),
})
