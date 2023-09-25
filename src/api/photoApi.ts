import { PhotosQueryParameters } from '@/models/photo'
import fetchClient from './fetchClient'

const photoApi = {
  getPhotos(queryParameters?: PhotosQueryParameters) {
    const url = `/photos`
    return fetchClient(url, queryParameters)
  },
}

export default photoApi
