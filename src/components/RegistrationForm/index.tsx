'use client'

import { Controller } from 'react-hook-form'

import { useRegistrationForm } from 'src/components/RegistrationForm/useRegistrationForm'

import styles from 'src/components/RegistrationForm/styles.module.scss'

const RegistrationForm = (): JSX.Element => {
  const { control, isLoading, handleSubmit, errors } = useRegistrationForm()

  return (
    <div className={styles.form_container}>
      <Controller
        control={control}
        name="userName"
        render={({ field: { value, onChange, onBlur } }) => (
          <div className={styles.input_container}>
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
          <div className={styles.input_container}>
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
      <Controller
        control={control}
        name="passwordAgain"
        render={({ field: { value, onChange, onBlur } }) => (
          <div className={styles.input_container}>
            <input
              placeholder="Confirm the password"
              type="text"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {errors.passwordAgain && <p>{errors.passwordAgain.message}</p>}
          </div>
        )}
      />
      <button disabled={isLoading} type="submit" onClick={handleSubmit}>
        {isLoading ? 'Loading...' : 'Registration'}
      </button>
    </div>
  )
}

export default RegistrationForm
