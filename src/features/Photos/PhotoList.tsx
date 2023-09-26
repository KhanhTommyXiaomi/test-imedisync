import photoApi from '@/api/photoApi'
import InputText from '@/components/InputText'
import CloseIcon from '@/components/icons/CloseIcon'
import SearchIcon from '@/components/icons/Searchicon'
import { AppConstant } from '@/const'
import {
  PhotoItem,
  PhotoItemResponse,
  PhotosQueryParameters,
} from '@/models/photo'
import styles from '@/styles/photo.module.css'
import { download } from '@/utils'
import { useEffect, useState } from 'react'
import ModalPhotoItem from './ModalPhotoItem'
import PhotoListItem from './PhotoListItem'

interface PhotoListProps {
  columnCount?: number
}

const initPhotoData = (columnCount: number) => {
  const result: any = {}
  for (let i = 0; i < columnCount; i++) {
    result[i + 1] = [] as PhotoItem[]
  }
  return result
}

const PhotoList = ({
  columnCount = AppConstant.DEFAULT_COLUMN_COUNT,
}: PhotoListProps) => {
  const [photoListQuery, setPhotoListQuery] = useState<PhotosQueryParameters>({
    page: 1,
    limit: AppConstant.DEFAULT_LIMIT,
  })
  const [loading, setLoading] = useState(false)
  const [photoSelected, setPhotoSelected] = useState<PhotoItem>({})
  const [isOpenModalPhoto, setIsOpenModalPhoto] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [query, setQuery] = useState('')
  const [photoData, setPhotoData] = useState(() => initPhotoData(columnCount))
  const [photoSearchData, setPhotoSearchData] = useState(() =>
    initPhotoData(columnCount)
  )

  const itemsInColumn = photoListQuery.limit / columnCount

  const refactorPhotoList = (photoItem: PhotoItemResponse) => {
    return {
      id: photoItem.id,
      width: photoItem.width,
      height: photoItem.height,
      description: photoItem.description,
      alt_description: photoItem.alt_description,
      urls: photoItem.urls,
      links: photoItem.links,
      user: photoItem.user,
    }
  }

  const fillPhotoListState = (
    photoListResponse: PhotoItemResponse[],
    useSearching: boolean
  ) => {
    const newPhotoList = photoListResponse.map(refactorPhotoList)
    const newPhotoData: any = {
      ...(!useSearching ? photoData : {}),
    }
    for (let i = 0; i < columnCount; i++) {
      newPhotoData[i + 1] = [
        ...(!useSearching ? newPhotoData[i + 1] : []),
        ...newPhotoList.slice(
          i * itemsInColumn,
          i * itemsInColumn + photoListQuery.limit / columnCount
        ),
      ]
    }
    setPhotoData(newPhotoData)
  }

  const fillPhotoListSearch = (
    photoListResponse: PhotoItemResponse[],
    isScrolling?: boolean
  ) => {
    const newPhotoList = photoListResponse.map(refactorPhotoList)
    const newPhotoData: any = {
      ...(isScrolling ? photoSearchData : {}),
    }
    for (let i = 0; i < columnCount; i++) {
      newPhotoData[i + 1] = [
        ...(isScrolling ? newPhotoData[i + 1] : []),
        ...newPhotoList.slice(
          i * itemsInColumn,
          i * itemsInColumn + photoListQuery.limit / columnCount
        ),
      ]
    }
    setPhotoSearchData(newPhotoData)
  }

  const getPhotoList = async (params: {
    queries: PhotosQueryParameters
    useSearching: boolean
    isCleaning?: boolean
  }) => {
    setLoading(true)
    try {
      const res = await photoApi.getPhotos(params)
      const data = params.useSearching ? res.results : res
      fillPhotoListState(
        data as PhotoItemResponse[],
        !!params.isCleaning || params.useSearching
      )
      setHasMore(!!data.length)
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

  const handleSearch = (value: string) => {
    const newQueries = {
      ...photoListQuery,
      page: 1,
      query: value,
    }
    setPhotoListQuery(newQueries)
    getPhotoList({ queries: newQueries, useSearching: true })
  }

  const clearValueSearch = () => {
    if (!photoListQuery.query) return
    const newQueries = {
      page: 1,
      limit: AppConstant.DEFAULT_LIMIT,
    }
    setPhotoListQuery(newQueries)
    setPhotoData(initPhotoData(columnCount))
    getPhotoList({ queries: newQueries, useSearching: false, isCleaning: true })
  }

  useEffect(() => {
    getPhotoList({ queries: photoListQuery, useSearching: false })
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
        const newQueries = {
          ...photoListQuery,
          page: photoListQuery.page + 1,
        }
        setPhotoListQuery(newQueries)
        getPhotoList({
          queries: newQueries,
          useSearching: false,
        })
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loading, hasMore])

  return (
    <div className={styles.photoListFeature}>
      <InputText
        placeholder="Search images"
        value={query}
        onSubmit={handleSearch}
        startAdornment={<SearchIcon />}
        endAdornment={<CloseIcon fill="#767676" width={20} height={20} />}
        onEndAdornmentClick={clearValueSearch}
      />
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
        {isOpenModalPhoto && (
          <ModalPhotoItem
            setIsOpen={setIsOpenModalPhoto}
            photo={photoSelected}
            onDownload={handleDownloadImage}
          />
        )}
      </div>
    </div>
  )
}

export default PhotoList
