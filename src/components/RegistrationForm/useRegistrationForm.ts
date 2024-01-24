import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import type { RegistrationT } from 'src/components/RegistrationForm/types'
import type { AppDispatch } from 'src/redux/store'

import { useDispatch } from 'react-redux'
import { useAppSelector } from 'src/redux/store'

import { authRegistration } from 'src/redux/services/auth-operations'

import { badToast } from 'src/lib/toastify'
import { schema } from 'src/components/RegistrationForm/validationSchema'

export const useRegistrationForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading } = useAppSelector(state => state.authReducer)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationT>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: { userName: '', password: '', passwordAgain: '' },
  })

  const onSubmit = ({ userName, password, passwordAgain }: RegistrationT) => {
    if (password !== passwordAgain) {
      badToast('Passwords must match')

      return
    }

    dispatch(authRegistration({ userName, password }))
  }

  return {
    errors,
    control,
    isLoading,
    handleSubmit: handleSubmit(onSubmit),
  }
}
