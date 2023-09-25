import styles from '@/styles/modal.module.css'
import { Dispatch, ReactElement, SetStateAction, useEffect } from 'react'
import ConditionalRender from './ConditionalRender'
import CloseIcon from './icons/CloseIcon'

interface ModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  submitLabel?: string
  title?: string
  children?: ReactElement
  onSubmit?: () => void
}

const Modal = ({
  setIsOpen,
  submitLabel = 'Submit',
  onSubmit,
  title,
  children,
}: ModalProps) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.closeIcon}>
        <CloseIcon />
      </div>
      <CloseIcon />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <ConditionalRender conditional={!!title}>
              <div className={styles.heading}>{title}</div>
            </ConditionalRender>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            X
          </button>
          <ConditionalRender conditional={!!children}>
            <div className={styles.modalContent}>{children}</div>
          </ConditionalRender>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.submitBtn}
                onClick={() => !!onSubmit && onSubmit()}
              >
                {submitLabel}
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
