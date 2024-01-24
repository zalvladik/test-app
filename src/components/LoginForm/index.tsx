'use client'

import { Controller } from 'react-hook-form'
import { redirect } from 'next/navigation'

import { useLoginForm } from 'src/components/LoginForm/useLoginForm'

import style from 'src/components/LoginForm/styles.module.scss'

const LoginForm = (): JSX.Element => {
  const { errors, control, userId, isLoading, handleSubmit } = useLoginForm()

  if (userId) {
    redirect(`/calendar`)
  }

  return (
    <div className={style.form_container}>
      <Controller
        control={control}
        name="userName"
        render={({ field: { value, onChange, onBlur } }) => (
          <div className={style.input_container}>
            <input
              placeholder="Username"
              type="text"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {errors.userName && <p>{errors.userName.message}</p>}
          </div>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <div className={style.input_container}>
            <input
              placeholder="Password"
              type="text"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        )}
      />
      <button disabled={isLoading} type="submit" onClick={handleSubmit}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
    </div>
  )
}

export default LoginForm
