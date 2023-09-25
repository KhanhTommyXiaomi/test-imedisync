interface DownloadIconProps {
  onClick?: () => void
}

const DownloadIcon = ({ onClick }: DownloadIconProps) => {
  return (
    <div
      className="download-icon"
      onClick={() => {
        !!onClick && onClick()
      }}
    >
      <svg
        width="16"
        height="16"
        className="m9vYO"
        viewBox="0 0 24 24"
        version="1.1"
        aria-hidden="false"
      >
        <desc lang="en-US">Arrow pointing down</desc>
        <path d="m19.35 11.625-5.85 5.4V1.5h-3v15.525l-5.85-5.4-2.025 2.25L12 22.425l9.375-8.55-2.025-2.25Z"></path>
      </svg>
    </div>
  )
}

export default DownloadIcon
