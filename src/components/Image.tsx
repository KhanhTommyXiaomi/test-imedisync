interface ImageProps {
  width?: number
  height?: number
  src: string
  alt?: string
}

const Image = (props: ImageProps) => {
  return <img {...props} alt={props.alt || 'Image from Unsplash API'} />
}

export default Image
