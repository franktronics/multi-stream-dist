import { IconButton, Text } from '@chakra-ui/react';
import ButtonTheme from '../button-theme/button-theme';
import styles from './navbar.module.scss';
import { DashboardContextType } from "apps/multi-stream/context/dashboard.context"
import Logo from '../logo/logo'
import { SlidebarIcon, NotifIcon } from "@multi-stream/shared/ui"

/* eslint-disable-next-line */
export interface NavbarProps {
  className?: string,
  dashboardContext: DashboardContextType
  [key: string]: any
}

export function Navbar(props: NavbarProps) {
  const {className, dashboardContext, ...rest} = props
  const toggleSlidebar = () => {
    document.body.classList.toggle("slidebar-open")
  }

  return (
    <nav className={styles['navbar'] + ` ${className || ''}`} {...rest}>
      <div className={styles['nav-container']}>
        <div className={styles['nav-left']}>
          <IconButton
            variant={"outline"}
            colorScheme="black.100"
            aria-label='Ouvrir/Fermer menu'
            icon={<SlidebarIcon color="var(--chakra-colors-black-100)"/>}
            size="sm"
            border="none"
            onClick={toggleSlidebar}
          />
          <Logo size={25} color="var(--chakra-colors-primary)"/>
          <Text color="black.100" fontSize="16px">Description de l&apos;action</Text>
        </div>
        <div className={styles['nav-right']}>
          <ButtonTheme
            theme={dashboardContext.theme}
            toggle={dashboardContext.toggleTheme}
          />
          <IconButton
            variant={"outline"}
            colorScheme="black.100"
            aria-label='Notifications'
            icon={<NotifIcon color="var(--chakra-colors-black-100)"/>}
            size="sm"
            border="none"
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
