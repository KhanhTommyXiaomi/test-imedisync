import { ReactElement, useEffect, useState } from 'react'

interface InputTextProps {
  value?: string
  startAdornment?: ReactElement
  endAdornment?: ReactElement
  placeholder?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onEndAdornmentClick?: () => void
}

const InputText = ({
  value,
  onChange,
  startAdornment,
  endAdornment,
  placeholder,
  onSubmit,
  onEndAdornmentClick,
}: InputTextProps) => {
  const [internalValue, setInternalValue] = useState('')
  const [focus, setFocus] = useState(false)

  const handleChange = (e: any) => {
    const value = e.target.value
    setInternalValue(value)
    !!onChange && onChange(value)
  }

  const handleClear = () => {
    setInternalValue('')
    !!onChange && onChange('')
    !!onEndAdornmentClick && onEndAdornmentClick()
  }

  useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value || '')
    }
  }, [value])

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.key === 'Enter' && focus && value !== internalValue) {
        !!onSubmit && onSubmit(internalValue)
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
    }
  }, [focus, internalValue, value])

  return (
    <div className="input-container">
      {startAdornment}
      <input
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {!!endAdornment && <div onClick={handleClear}>{endAdornment}</div>}
    </div>
  )
}

export default InputText
