import Link from 'next/link'

import styles from 'src/app/styles.module.scss'

const Page = () => {
  return (
    <div className={styles.auth_container}>
      <h1>Welcome !</h1>
      <h3>Please check README.md</h3>
      <div>
        <Link href={'/auth/register'}>REGISTRATION</Link>
        <Link href={'/auth/login'}>LOGIN</Link>
      </div>
    </div>
  )
}

export default Page
