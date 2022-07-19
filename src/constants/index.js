const ENV = Object.freeze({
  DEV: 'dev',
  PROD: 'prod',
})

const ROUTES_NAMES = Object.freeze({
  HOME: '/',
  SIGN_UP: 'sign-up',
  CONFIRM_SIGN_UP: 'confirm-sign-up',
  SIGN_IN: 'sign-in',
  PUBLISH_NEW_POLL: 'publish-new-poll',
  PAGE_NOT_FOUND: '*',
})

const INPUT_ID = Object.freeze({
  USERNAME: 'username',
  PASSWORD: 'password',
  CONFIRMATION_CODE: 'confirmationCode',
  EMAIL: 'email',
})

const SPACING = Object.freeze({
  SM: '0.2rem',
  MD: '0.6rem',
  LG: '1.5rem',
  XL: '2rem',
})

export default {
  ENV: ENV.DEV,
  ROUTES_NAMES,
  INPUT_ID,
  SPACING,
  LOGO_URL:
    'https://bilal-cloud.s3.ap-northeast-1.amazonaws.com/assets/logo-black.svg',
}
