import { useState } from 'react'
import '../styles/FormInputs.css'

export default function FormInputs({ label, htmlFor, onChange, errorMessage, ...inputsProps }) {
  const [focused, setFocused] = useState(false)

  const handleFocus = () => {
    setFocused(!focused)
  }

  return (
    <div className='input-bloc'>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        {...inputsProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  )
};
