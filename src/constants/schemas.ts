import joi from 'joi';

export const addNewFormSchema = joi.object({
  title: joi.string().required().label('Title').messages({
    'any.required': 'Title must be provided',
  }),
  description: joi.string().required().label('Description').messages({
    'any.required': 'Description must be provided',
  }),
  date: joi.object().required().label('Date').messages({
    'any.required': 'Date must be provided',
  }),
  time: joi.object().required().label('Time').messages({
    'any.required': 'Time must be provided',
  }),
});
