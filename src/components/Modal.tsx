import styles from '@/styles/modal.module.css'
import { Dispatch, ReactElement, SetStateAction, useEffect } from 'react'
import CloseIcon from './icons/CloseIcon'

interface ModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children?: ReactElement
  Header?: ReactElement
  Footer?: ReactElement
}

const Modal = ({ setIsOpen, children, Header, Footer }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])
  return (
    <div className={styles.modalContainer}>
      <div className={styles.closeIcon} onClick={() => setIsOpen(false)}>
        <CloseIcon />
      </div>
      <div className={styles.modal}>
        {Header}
        {children}
        {Footer}
      </div>
    </div>
  )
}

export default Modal
