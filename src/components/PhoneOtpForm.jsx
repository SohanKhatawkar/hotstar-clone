import { useState } from 'react'
import OtpInput from './OtpInput'

const validateNumber = /[^0-9]/g

const PhoneOtpForm = () => {
  const [phoneNumberInput, setphoneNumberInput] = useState('')
  const [phoneNumberError, setphoneNumberError] = useState('')
  const [showGetOtpButton, setshowGetOtpButton] = useState(false)
  const [showOtpInput, setshowOtpInput] = useState(false)

  const handlePhoneNumberChange = (event) => {
    const phoneNumber = event.target.value

    if (phoneNumber.length <= 10) setphoneNumberInput(event.target.value)
    if (phoneNumber.length === 10) {
      setshowGetOtpButton(true)
      return
    }
    setshowGetOtpButton(false)
  }

  const handleGetOtp = (event) => {
    event.preventDefault()

    if (phoneNumberInput.length < 10 || validateNumber.test(phoneNumberInput)) {
      setphoneNumberError('Please enter a valid mobile number')
      return
    }
    setshowOtpInput(true)
  }

  const handleOtpSubmit = (otp) => {
    console.log('Login successfull', otp)
  }
  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handleGetOtp}>
          <input
            type='text'
            onChange={handlePhoneNumberChange}
            value={phoneNumberInput}
            placeholder='Enter mobile number'
            maxLength={10}
          />
          {phoneNumberError && (
            <span className='error'>{phoneNumberError}</span>
          )}
          {showGetOtpButton && <button type='submit'>Get OTP</button>}
        </form>
      ) : (
        <div>
          Enter OTP sent to {phoneNumberInput}
          <OtpInput otpLength={4} handleOtpSubmit={handleOtpSubmit} />
        </div>
      )}
    </div>
  )
}

export default PhoneOtpForm
