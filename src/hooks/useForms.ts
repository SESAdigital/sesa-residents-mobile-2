import Joi from 'joi';

import { PostUtilitiesKYCReq } from '@src/api/utilities.api';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';

const schema = Joi.object<PostUtilitiesKYCReq>({
  idType: Joi.string().required().min(1).max(255).label('ID Type'),
  idNumber: Joi.string().required().min(5).max(255).label('ID Number'),
  lga: Joi.string().optional().allow('').min(3).max(200).label('LGA'),
  firstName: Joi.string()
    .optional()
    .allow('')
    .min(3)
    .max(200)
    .label('First Name'),
  lastName: Joi.string()
    .optional()
    .allow('')
    .min(3)
    .max(200)
    .label('Last Name'),
  dateOfBirth: Joi.string()
    .optional()
    .allow('')
    .min(1)
    .max(200)
    .label('Date of birth'),
  state: Joi.string().optional().allow('').min(1).max(200).label('State'),
});

export const useVerifyKYCForm = () => {
  return useForm<PostUtilitiesKYCReq>({
    resolver: joiResolver(schema),
  });
};
