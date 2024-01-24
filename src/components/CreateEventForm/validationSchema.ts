import * as yup from 'yup'

export const schema = yup.object().shape({
  start: yup
    .string()
    .required('Start is required')
    .trim()
    .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid start'),
  end: yup
    .string()
    .required('End is required')
    .trim()
    .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid end'),
  title: yup.string().required('Title is required'),
})
