import React from 'react'
import { resendVerificationCode } from '../Redux/Auth'; // import this
const Resendcode = () => {
    const handleResend = async () => {
  try {
    const res = await dispatch(resendVerificationCode(email));
    if (!res.error) {
      toast.success("New verification code sent to your email.");
    } else {
      toast.error(res.payload || "Could not resend code");
    }
  } catch (error) {
    toast.error("Failed to resend code");
  }
};
  return (
    <div>
        <p className="mt-2 text-sm text-gray-600">
  Didn't receive the code?{' '}
  <button
    type="button"
    onClick={handleResend}
    className="text-blue-600 hover:underline font-semibold"
  >
    Resend Code
  </button>
</p>

    </div>
  )
}

export default Resendcode