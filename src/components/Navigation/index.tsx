'use client'

import Link from 'next/link'

import { useNavigation } from 'src/components/Navigation/useNavigation'

import styles from 'src/components/Navigation/styles.module.scss'

const Navigation = () => {
  const { navLinks, pathname } = useNavigation()

  return (
    <ul className={styles.nav}>
      {navLinks.map(link => {
        const isActive = pathname === link.href

        return (
          <li className={styles.nav_item} key={link.label}>
            <Link href={link.href} className={isActive ? styles.active : ''}>
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Navigation
