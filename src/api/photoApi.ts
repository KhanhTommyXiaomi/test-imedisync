import { PhotosQueryParameters } from '@/models/photo'
import fetchClient from './fetchClient'

const photoApi = {
  getPhotos(params: {
    queries?: PhotosQueryParameters
    useSearching?: boolean
  }): any {
    const url = !!params.useSearching ? '/search/photos' : '/photos'
    return fetchClient(url, params.queries)
  },
}

export default photoApi
