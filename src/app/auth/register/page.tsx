import RegistrationForm from 'src/components/RegistrationForm'

import styles from 'src/app/auth/styles.module.scss'

const Page = () => {
  return (
    <div className={styles.auth_container}>
      <h1>Registration form</h1>
      <RegistrationForm />
    </div>
  )
}

export default Page
