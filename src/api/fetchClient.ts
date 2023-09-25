import { ApiConstant } from '@/const'
import { cleanObject, getQueryString } from '@/utils'

const fetchClient = async <T>(
  url: string,
  queryParameters: any
): Promise<T> => {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  const newQueryParameters = { ...queryParameters }
  delete newQueryParameters.limit
  const queryString = getQueryString({
    ...newQueryParameters,
    client_id: accessKey,
    per_page: queryParameters.limit || null,
  })
  const urlWithAccessKey = `${ApiConstant.BASE_URL_API}${url}${queryString}`
  const response = await fetch(urlWithAccessKey)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json() as Promise<T>
}

export default fetchClient
