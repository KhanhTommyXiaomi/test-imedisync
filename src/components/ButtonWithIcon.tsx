import { ReactElement } from 'react'

interface ButtonWithIconProps {
  Icon?: ReactElement
  children?: string
}

const ButtonWithIcon = ({ Icon, children }: ButtonWithIconProps) => {
  return (
    <div className="button-with-icon">
      {!!Icon && Icon}
      {!!children && <div className='button-text'>{children}</div>}
    </div>
  )
}

export default ButtonWithIcon
