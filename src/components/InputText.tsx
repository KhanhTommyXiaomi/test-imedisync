import { ReactElement, useEffect, useState } from 'react'

interface InputTextProps {
  value?: string
  startAdornment?: ReactElement
  endAdornment?: ReactElement
  placeholder?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
}

const InputText = ({
  value,
  onChange,
  startAdornment,
  endAdornment,
  placeholder,
  onSubmit,
}: InputTextProps) => {
  const [internalValue, setInternalValue] = useState('')
  const [focus, setFocus] = useState(false)

  const handleChange = (e: any) => {
    const value = e.target.value
    setInternalValue(value)
    !!onChange && onChange(value)
  }

  useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value || '')
    }
  }, [value])

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.key === 'Enter' && focus) {
        !!onSubmit && onSubmit(internalValue)
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
    }
  }, [focus, internalValue])

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
      {!!endAdornment && <div>{endAdornment}</div>}
    </div>
  )
}

export default InputText
