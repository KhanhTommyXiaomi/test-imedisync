import ButtonWithIcon from '@/components/ButtonWithIcon'
import Image from '@/components/Image'
import Modal from '@/components/Modal'
import HeartIcon from '@/components/icons/HeartIcon'
import PlusIcon from '@/components/icons/PlusIcon'
import { PhotoItem } from '@/models/photo'
import styles from '@/styles/photo.module.css'
import { Dispatch, SetStateAction } from 'react'

interface ModalPhotoItemProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  photo: PhotoItem
  onSubmit?: (photo: PhotoItem) => void
}

const Header = ({ photo }: { photo: PhotoItem }) => {
  return (
    <div className={styles.modalHeader}>
      <div className={styles.userInfo}>
        <img className={styles.avatar} src={photo.user.profile_image.small} />
        <div className={styles.boxName}>
          <div className={styles.username}>
            {`${photo.user.first_name} ${photo.user.last_name || ''}`}
          </div>
          <div className={styles.status}>Available for hire</div>
        </div>
      </div>
      <div className={styles.headerActions}>
        <ButtonWithIcon Icon={<HeartIcon />} />
        <ButtonWithIcon Icon={<PlusIcon />} />
        <ButtonWithIcon>Download</ButtonWithIcon>
      </div>
    </div>
  )
}

const ModalPhotoItem = ({ setIsOpen, photo }: ModalPhotoItemProps) => {
  return (
    <Modal setIsOpen={setIsOpen} Header={<Header photo={photo} />}>
      <div className={styles.modalPhotoItem}>
        <Image src={photo.urls?.raw || ''} />
      </div>
    </Modal>
  )
}

export default ModalPhotoItem
