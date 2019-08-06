export default {
  checkAccount: {
    status: 404,
    message: '일치하는 계정이 없습니다.'
  },
  needAuth: {
    status: 401,
    message: '인증이 필요합니다.'
  },
  failAuth: {
    status: 401,
    message: '인증을 실패했습니다.'
  },
  unknownError: {
    status: 500,
    message: '알 수 없는 에러가 발생했습니다.'
  }
}
