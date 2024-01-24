'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import styles from 'src/components/Navigation/styles.module.scss'

type NavLink = {
  label: string
  href: string
}
type Props = {
  navLinks: NavLink[]
}

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname()

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
