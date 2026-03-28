import Joi from 'joi';

export const joiSchemas = {
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: false,
    })
    .max(255)
    .required()
    .label('Email'),

  password: Joi.string().min(8).max(255).required(),

  strictPassword: Joi.string()
    .min(8)
    .max(255)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one lowercase letter, one uppercase letter, and one number.',
      'any.required': 'Password is required.',
    }),

  name: Joi.string().min(3).max(255).required(),

  phone: Joi.string().length(11).required(),

  address: Joi.string().required().min(7).max(160).label('Address'),

  image: Joi.object()
    .required()
    .label('Image')
    .custom((value, helpers) => {
      if (!value?.uri) {
        return helpers.error('any.required');
      }
      return value;
    }),
};
