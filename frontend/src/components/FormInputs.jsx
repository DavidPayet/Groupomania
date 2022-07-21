import { useState } from 'react'
import '../styles/FormInputs.css'

export default function FormInputs({ label, htmlFor, onChange, accountCreated, errorMessage, ...inputsProps }) {
  const [focused, setFocused] = useState(false)

  const handleFocus = () => {
    !accountCreated && setFocused(true)
  }

  const passwordConfFocus = () => {
    inputsProps.name === 'passwordConf' && !accountCreated ? setFocused(true) : setFocused(false)
  }

  return (
    <div className='input-bloc'>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        {...inputsProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        onFocus={passwordConfFocus}
      />
      <span>{errorMessage}</span>
    </div>
  )
};
