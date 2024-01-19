import { useEffect, useRef, useState } from 'react'

const OtpInput = ({ otpLength = 4, handleOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(otpLength).fill(''))
  const inputRefs = useRef([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleOtpChange = (index, event) => {
    const value = event.target.value
    const newOtpValue = [...otp]

    newOtpValue[index] = value.substring(value.length - 1)
    setOtp(newOtpValue)

    const combinedOtp = newOtpValue.join('')
    if (combinedOtp.length === otpLength) handleOtpSubmit(combinedOtp)

    if (value && index < otpLength - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleOtpClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1)
    console.log(otp.indexOf(''))
    if (index >= 0 && !otp[otp.indexOf('')]) {
      inputRefs.current[otp.indexOf('')].focus()
    }
  }

  const handleOtpKeyDown = (index, event) => {
    console.log(otp[index])
    if (
      event.key === 'Backspace' &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus()
    }
  }

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            type='text'
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleOtpChange(index, e)}
            onClick={() => handleOtpClick(index)}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            className='otpInput'
            // maxLength={1}
          />
        )
      })}
    </div>
  )
}

export default OtpInput
