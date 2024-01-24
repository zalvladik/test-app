'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Navigation from 'src/components/Navigation'

import type { AppDispatch } from 'src/redux/store'

import { authLogout, authRefresh } from 'src/redux/services/auth-operations'
import { useAppSelector } from 'src/redux/store'

import styles from 'src/components/TheHeader/styles.module.scss'

const TheHeader = () => {
  const { userName, userId, isLoading } = useAppSelector(state => state.authReducer)
  const dispatch = useDispatch<AppDispatch>()

  const navItems = [
    { label: 'Home', href: '/' },
    {
      label: 'Calendar',
      href: '/calendar',
    },
  ]

  useEffect(() => {
    dispatch(authRefresh())
  }, [dispatch])

  return (
    <header className={styles.header}>
      <Navigation navLinks={navItems} />
      {userName && (
        <div>
          <button
            disabled={isLoading}
            onClick={() => dispatch(authLogout(userId))}
            type="button"
          >
            {isLoading ? 'Loading...' : 'Logout'}
          </button>
          <p>User: {userName}</p>
        </div>
      )}
    </header>
  )
}

export default TheHeader
