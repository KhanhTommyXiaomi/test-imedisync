export const getQueryString = (obj: any) => {
  if (!obj || JSON.stringify(obj) === '{}') return ''
  return (
    '?' +
    Object.keys(obj)
      .map(key => {
        return `${key}=${encodeURIComponent(obj[key])}`
      })
      .join('&')
  )
}

export const cleanObject = (obj: any) => {
  if (!obj || JSON.stringify(obj) === '{}') return {}
  const result: any = {}
  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      result[key] = obj[key]
    }
  })
  return result
}

export const download = ({
  url,
  filename,
}: {
  url?: string
  filename?: string
}) => {
  fetch(url || '')
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = filename || ''
      link.click()
    })
    .catch(console.error)
}
