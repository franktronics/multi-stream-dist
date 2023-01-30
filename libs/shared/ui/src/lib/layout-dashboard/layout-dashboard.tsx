import { PropsWithChildren } from 'react';
import styles from './layout-dashboard.module.scss';

/* eslint-disable-next-line */
export interface LayoutDashboardProps {}

export function LayoutDashboard(props: PropsWithChildren<LayoutDashboardProps>) {
  const {children} = props

  return (
    <div className={styles['layout-dashboard']}>
      {children}
    </div>
  )
}

export default LayoutDashboard
