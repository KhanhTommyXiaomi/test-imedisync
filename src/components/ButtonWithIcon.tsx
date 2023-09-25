import { ReactElement } from 'react'

interface ButtonWithIconProps {
  Icon?: ReactElement
  children?: string
  onClick?: () => void
}

const ButtonWithIcon = ({ Icon, children, onClick }: ButtonWithIconProps) => {
  return (
    <div className="button-with-icon" onClick={() => !!onClick && onClick()}>
      {!!Icon && Icon}
      {!!children && <div className="button-text">{children}</div>}
    </div>
  )
}

export default ButtonWithIcon
