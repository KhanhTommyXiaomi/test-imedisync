import Image from '@/components/Image'
import Modal from '@/components/Modal'
import { PhotoItem } from '@/models/photo'
import { Dispatch, SetStateAction } from 'react'

interface ModalPhotoItemProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  photo: PhotoItem
  onSubmit?: (photo: PhotoItem) => void
}

const ModalPhotoItem = ({
  setIsOpen,
  photo,
  onSubmit,
}: ModalPhotoItemProps) => {
  const handleSubmit = () => {
    !!onSubmit && onSubmit(photo)
  }
  return (
    <Modal
      setIsOpen={setIsOpen}
      title={photo.alt_description}
      submitLabel="Download"
      onSubmit={handleSubmit}
    >
      <Image src={photo.urls?.small || ''} />
    </Modal>
  )
}

export default ModalPhotoItem
