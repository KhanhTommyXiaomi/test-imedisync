import photoApi from '@/api/photoApi'
import { AppConstant } from '@/const'
import {
  PhotoItem,
  PhotoItemResponse,
  PhotosQueryParameters,
} from '@/models/photo'
import { cleanObject, download } from '@/utils'
import { useEffect, useState } from 'react'
import ModalPhotoItem from './ModalPhotoItem'
import PhotoListItem from './PhotoListItem'
import styles from '@/styles/photo.module.css'

const PhotoList = () => {
  const [photoListQuery, setPhotoListQuery] = useState<PhotosQueryParameters>({
    page: 1,
    limit: AppConstant.DEFAULT_LIMIT,
  })
  const [loading, setLoading] = useState(false)
  const [photoSelected, setPhotoSelected] = useState<PhotoItem>({})
  const [isOpenModalPhoto, setIsOpenModalPhoto] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [photoData, setPhotoData] = useState(() => {
    const result: any = {}
    for (let i = 0; i < 3; i++) {
      result[i + 1] = [] as PhotoItem[]
    }
    return result
  })

  const fillPhotoListState = (photoListResponse: PhotoItemResponse[]) => {
    const newPhotoList = photoListResponse.map(photoItem => ({
      id: photoItem.id,
      width: photoItem.width,
      height: photoItem.height,
      description: photoItem.description,
      alt_description: photoItem.alt_description,
      urls: photoItem.urls,
      links: photoItem.links,
      user: photoItem.user,
    }))
    const newPhotoData: any = {
      ...photoData,
    }
    for (let i = 0; i < 3; i++) {
      newPhotoData[i + 1] = [
        ...newPhotoData[i + 1],
        ...newPhotoList.slice(
          i * (photoListQuery.limit / 3),
          i * (photoListQuery.limit / 3) + photoListQuery.limit / 3
        ),
      ]
    }
    setPhotoData(newPhotoData)
  }

  const getPhotoList = async (queryParameters: PhotosQueryParameters) => {
    setLoading(true)
    try {
      const photoListResponse = await photoApi.getPhotos(queryParameters)
      fillPhotoListState(photoListResponse as PhotoItemResponse[])
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoClick = (photoItem: PhotoItem) => {
    setPhotoSelected(photoItem)
    setIsOpenModalPhoto(true)
  }

  const handleDownloadImage = (photo: PhotoItem) => {
    download({ url: photo.urls?.small, filename: photo.id })
  }

  useEffect(() => {
    getPhotoList(photoListQuery)
  }, [])

  useEffect(() => {
    const isAtBottom = () => {
      return (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
      )
    }
    const handleScroll = () => {
      if (isAtBottom() && !loading && hasMore) {
        const newQuery = {
          ...photoListQuery,
          page: photoListQuery.page + 1,
        }
        setPhotoListQuery(newQuery)
        getPhotoList(newQuery)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loading, hasMore])

  return (
    <div className={styles.photoList}>
      {Object.keys(photoData).map(col => (
        <div className={styles.column} key={col}>
          {photoData[col].map((photo: PhotoItem) => (
            <PhotoListItem
              onClick={handlePhotoClick}
              photo={photo}
              key={photo.id}
              onDownload={handleDownloadImage}
            />
          ))}
        </div>
      ))}
      {loading && <div className="loading">Loading...</div>}
      {isOpenModalPhoto && (
        <ModalPhotoItem
          setIsOpen={setIsOpenModalPhoto}
          photo={photoSelected}
          onSubmit={handleDownloadImage}
        />
      )}
    </div>
  )
}

export default PhotoList
