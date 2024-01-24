import { usePathname } from 'next/navigation'

import { ROUTES } from 'src/lib/routes'

export const useNavigation = () => {
  const pathname = usePathname()

  const navLinks = [
    { label: 'Home', href: ROUTES.HOME },
    {
      label: 'Calendar',
      href: ROUTES.CALENDAR,
    },
  ]

  return { navLinks, pathname }
}
