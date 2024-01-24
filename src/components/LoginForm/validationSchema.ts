import * as yup from 'yup'

export const schema = yup.object().shape({
  userName: yup
    .string()
    .required('Username is required')
    .trim()
    .min(5, 'Username must be at least 5 characters')
    .max(15, 'Username must be at most 15 characters'),
  password: yup
    .string()
    .required('Password is required')
    .trim()
    .min(5, 'Password must be at least 5 characters')
    .max(15, 'Password must be at most 15 characters'),
})
