import LoginForm from 'src/components/LoginForm'

import styles from 'src/app/auth/styles.module.scss'

const Page = () => {
  return (
    <div className={styles.auth_container}>
      <h1>Login form</h1>
      <LoginForm />
    </div>
  )
}

export default Page
