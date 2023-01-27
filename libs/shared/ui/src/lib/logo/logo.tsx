import { SVGProps } from 'react'
import styles from './logo.module.scss'

/* eslint-disable-next-line */
export interface LogoProps {
  color?: string,
  size?: string
  [k: string]: any
}

export function Logo(props: LogoProps) {
  const {color = '#fff', size = "big", ...rest} = props
  return (
    <svg {...rest} className={styles.big} width="430" height="430" viewBox="0 0 430 430" fill={color} xmlns="http://www.w3.org/2000/svg">
      <circle cx="55" cy="59" r="45" stroke={color} strokeWidth="10"/>
      <circle cx="347" cy="135" r="55" stroke={color} strokeWidth="10"/>
      <circle cx="123" cy="365" r="55" stroke={color} strokeWidth="10"/>
      <circle cx="215" cy="215" r="25" fill={color}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M189.574 245.881C192.142 247.997 194.978 249.8 198.024 251.23L172.262 293.237L163.738 288.009L189.574 245.881Z" fill={color}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M251.658 198.969L285.799 178.276L280.616 169.724L246.53 190.383C248.578 193.003 250.307 195.884 251.658 198.969Z" fill={color}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M190.763 183.176L130.49 124.42L123.51 131.58L183.626 190.184C185.703 187.562 188.102 185.206 190.763 183.176Z" fill={color}/>
    </svg>
  )
}

export default Logo
