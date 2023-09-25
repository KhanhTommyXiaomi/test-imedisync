import Image from '@/components/Image'
import DownloadIcon from '@/components/icons/DownloadIcon'
import { PhotoItem } from '@/models/photo'
import styles from '@/styles/photo.module.css'
import { cleanObject } from '@/utils'
import { useRef, useState } from 'react'

interface PhotoListItemProps {
  photo: PhotoItem
  onClick?: (photo: PhotoItem) => void
  onDownload?: (photo: PhotoItem) => void
}

const PhotoListItem = ({ photo, onClick, onDownload }: PhotoListItemProps) => {
  const [useClick, setUseClick] = useState(false)
  const handleClick = (e: any) => {
    e.stopPropagation()
    setUseClick(true)
    !!onClick && onClick(photo)
  }

  const handleDownload = () => {
    !!onDownload && onDownload(photo)
  }

  return (
    <div className={styles.photoItem} title={photo.alt_description}>
      <Image src={photo.urls?.small || ''} alt={photo.alt_description} />
      <div
        style={cleanObject({
          display: useClick && 'none',
        })}
        className={styles.mask}
        onClick={handleClick}
        onMouseOut={() => setUseClick(false)}
      >
        <div className={styles.maskContent}>
          <div className={styles.footer}>
            <div className={styles.userInfo}>
              <img
                className={styles.avatar}
                src={photo.user.profile_image.small}
              />
              <div className={styles.boxName}>
                <div className={styles.username}>
                  {`${photo.user.first_name} ${photo.user.last_name}`}
                </div>
                <div className={styles.status}>Available for hire</div>
              </div>
            </div>
            <DownloadIcon onClick={handleDownload} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoListItem
