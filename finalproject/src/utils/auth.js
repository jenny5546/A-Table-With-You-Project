import {
  setFirestoreDocument,
  createEmailWithPassword,
  signInWithEmailAndPassword,
  getFirebaseDocument,
  uploadImageToStorage,
  getImageDownloadPath,
} from './firebase';

export class AuthError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export const SignUpErrorCode = {
  ALREADY_EMAIL_USE: 'already-email-use',
  INVALID_EMAIL: 'invalid-email',
  OPERATION_NOT_ALLOWED: 'operation-not-allowed',
  WEAK_PASSWORD: 'weak-password', // Minimum password length is 6
  NOT_EXIST_DATA: 'not-exist-data',
  SYSTEM_ERROR: 'system-error',
};

export const SignInErrorCode = {
  INVALID_EMAIL: 'invalid-email',
  USER_DISABLED: 'user-disabled',
  USER_NOT_FOUND: 'user-not-found',
  WRONG_PASSWORD: 'wrong-password',
  NOT_EXIST_DATA: 'not-exist-data',
  SYSTEM_ERROR: 'system-error',
};

export const signUp = ({ profileImage, email, password, name, age, nickname, phone, gender }) => {
  if (!profileImage || !email || !password || !name || !age || !nickname || !phone || !gender) {
    return Promise.reject(new AuthError(SignUpErrorCode.NOT_EXIST_DATA, '모든 데이터를 입력해주세요.'));
  }

  return createEmailWithPassword(email, password)
    .catch((err) => {
      if (err.code === 'auth/email-already-in-use') {
        return Promise.reject(new AuthError(SignUpErrorCode.ALREADY_EMAIL_USE, '이미 사용중인 이메일 주소입니다.'));
      }
      if (err.code === 'auth/invalid-email') {
        return Promise.reject(new AuthError(SignUpErrorCode.INVALID_EMAIL, '올바르지 않은 이메일 주소 형식입니다.'));
      }
      if (err.code === 'auth/operation-not-allowed') {
        return Promise.reject(new AuthError(SignUpErrorCode.OPERATION_NOT_ALLOWED, '회원가입이 불가능합니다.'));
      }
      if (err.code === 'auth/weak-password') {
        return Promise.reject(new AuthError(SignUpErrorCode.WEAK_PASSWORD, '비밀번호를 6자 이상 입력해주세요.'));
      }

      return Promise.reject(new AuthError(SignUpErrorCode.SYSTEM_ERROR, err.message));
    })
    .then(({ user }) => {
      const { uid } = user;
      return setFirestoreDocument('users', uid, {
        uid,
        email,
        name,
        age,
        nickname,
        phone,
        gender,
        chatRooms: {},
      }).then(() => {
        return uploadImageToStorage(`profiles/${uid}.jpg`, profileImage);
      });
    });
};

export const signIn = ({ email: loginEmail, password: loginPassword }) => {
  return signInWithEmailAndPassword(loginEmail, loginPassword)
    .catch((err) => {
      if (err.code === 'auth/invalid-email') {
        return Promise.reject(new AuthError(SignInErrorCode.INVALID_EMAIL, '올바르지 않은 이메일 주소 형식입니다.'));
      }
      if (err.code === 'auth/user-disabled') {
        return Promise.reject(new AuthError(SignInErrorCode.USER_DISABLED, '비활성화된 유저입니다.'));
      }
      if (err.code === 'auth/user-not-found') {
        return Promise.reject(new AuthError(SignInErrorCode.USER_NOT_FOUND, '이메일을 찾을 수 없습니다.'));
      }
      if (err.code === 'auth/wrong-password') {
        return Promise.reject(new AuthError(SignInErrorCode.WRONG_PASSWORD, '비밀번호가 틀렸습니다.'));
      }

      return Promise.reject(new AuthError(SignInErrorCode.SYSTEM_ERROR, err.message));
    })
    .then(({ user }) => {
      const { uid } = user;
      return getFirebaseDocument('users', uid)
        .then(async (data) => {
          const { email, name, nickname, age, gender, phone } = data;
          const profileImagePath = await getImageDownloadPath(`profiles/${uid}.jpg`);
          return {
            profileImagePath,
            email,
            name,
            nickname,
            age,
            gender,
            phone,
          };
        })
        .catch(() => {
          return Promise.reject(new AuthError(SignInErrorCode.NOT_EXIST_DATA, '유저 데이터를 불러올 수 없습니다.'));
        });
    });
};
