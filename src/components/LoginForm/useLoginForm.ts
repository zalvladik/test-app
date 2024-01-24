import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import type { LoginT } from 'src/components/LoginForm/types'
import type { AppDispatch } from 'src/redux/store'

import { useDispatch } from 'react-redux'
import { useAppSelector } from 'src/redux/store'
import { authLogin } from 'src/redux/services/auth-operations'

import { schema } from 'src/components/LoginForm/validationSchema'

export const useLoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, userId } = useAppSelector(state => state.authReducer)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginT>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: { userName: '', password: '' },
  })

  const onSubmit = async (data: LoginT) => {
    await dispatch(authLogin(data))
  }

  return {
    errors,
    userId,
    control,
    isLoading,
    handleSubmit: handleSubmit(onSubmit),
  }
}
