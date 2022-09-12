/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { IUpdatePassword, updatePassword } from './components/settings/SettingsModel'
import { resetPassword } from '../auth/core/_requests'
import clsx from 'clsx'

const passwordFormValidationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  newPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})

const ResetPassword: React.FC = () => {
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false)
  const [loading2, setLoading2] = useState(false)
  const [userId, setUserId] = useState<any>()

  useEffect(() => {
    const Id = JSON.parse(localStorage.getItem('kt-auth-react-v') || '');
    setUserId(Id.userId)
  }, [])

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: { ...passwordUpdateData, },
    validationSchema: passwordFormValidationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setLoading2(true)
      setTimeout(() => {
        resetPassword(
          values.oldPassword,
          values.newPassword,
          values.userId = userId
        )
        setLoading2(false)
        setPasswordForm(false)
      }, 1000)
    },
  })

  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik2.handleSubmit}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Reset Password</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>Enter your Old Password to reset your password.</div>
          {/* end::Link */}
        </div>

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label htmlFor='oldpassword' className='form-label fw-bolder text-gray-900 fs-6'>Old Password</label>
          <input
            type='password'
            id='oldpassword'
            placeholder=''
            autoComplete='off'
            {...formik2.getFieldProps('oldPassword')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik2.touched.oldPassword && formik2.errors.oldPassword },
              {
                'is-valid': formik2.touched.oldPassword && !formik2.errors.oldPassword,
              }
            )}
          />
          {formik2.touched.oldPassword && formik2.errors.oldPassword && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik2.errors.oldPassword}</span>
              </div>
            </div>
          )}
        </div>

        <div className='fv-row mb-10'>
          <label htmlFor='newpassword' className='form-label fw-bolder text-gray-900 fs-6'>New Password</label>
          <input
            type='password'
            id='newpassword'
            placeholder=''
            autoComplete='off'
            {...formik2.getFieldProps('newPassword')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik2.touched.newPassword && formik2.errors.newPassword },
              {
                'is-valid': formik2.touched.newPassword && !formik2.errors.newPassword,
              }
            )}
          />
          {formik2.touched.newPassword && formik2.errors.newPassword && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik2.errors.newPassword}</span>
              </div>
            </div>
          )}
        </div>

        <div className='fv-row mb-10'>
          <label htmlFor='confirmpassword' className='form-label fw-bolder text-gray-900 fs-6'>Confirm New Password</label>
          <input
            type='password'
            id='confirmpassword'
            placeholder=''
            autoComplete='off'
            {...formik2.getFieldProps('passwordConfirmation')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation },
              {
                'is-valid': formik2.touched.passwordConfirmation && !formik2.errors.passwordConfirmation,
              }
            )}
          />
          {formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik2.errors.passwordConfirmation}</span>
              </div>
            </div>
          )}
        </div>

        <div className='form-text mb-5'>
          Password must be at least 8 character and contain symbols
        </div>

        <div className='d-flex'>
          <button
            id='kt_password_submit'
            type='submit'
            className='btn btn-primary me-2 px-6'
          >
            {!loading2 && 'Update Password'}
            {loading2 && (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setPasswordForm(false)
            }}
            id='kt_password_cancel'
            type='button'
            className='btn btn-color-gray-400 btn-active-light-primary px-6'
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}
export { ResetPassword }