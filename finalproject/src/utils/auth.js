import {
  setFirestoreDocument,
  createEmailWithPassword,
  signInWithEmailAndPassword,
  getFirebaseDocument
} from "./firebase";

export const SignupError = {
  ALREADY_EMAIL_USE: 1,
  INVALID_EMAIL: 2,
  OPERATION_NOT_ALLOWED: 3,
  WEAK_PASSWORD: 4, // Minimum password length is 6
  SYSTEM_ERROR: 5
};

export const SigninError = {
  INVALID_EMAIL: 1,
  USER_DISABLED: 2,
  USER_NOT_FOUND: 3,
  WRONG_PASSWORD: 4,
  NOT_EXIST_DATA: 5
};

export const signUp = ({
  email,
  password,
  name,
  age,
  nickname,
  phone,
  gender
}) => {
  return createEmailWithPassword(email, password)
    .catch(err => {
      if (err.code === "auth/email-already-in-use") {
        // 이메일 이미 사용 중
        return Promise.reject({
          code: SignupError.ALREADY_EMAIL_USE
        });
      } else if (err.code === "auth/invalid-email") {
        // 올바르지 않은 이메일 형식
        return Promise.reject({
          code: SignupError.INVALID_EMAIL
        });
      } else if (err.code === "auth/operation-not-allowed") {
        // 회원가입 비활성화
        return Promise.reject({
          code: SignupError.OPERATION_NOT_ALLOWED
        });
      } else if (err.code === "auth/weak-password") {
        // 비밀번호 규칙 어김
        return Promise.reject({
          code: SignupError.WEAK_PASSWORD
        });
      }

      return Promise.reject(err);
    })
    .then(({ user }) => {
      const uid = user.uid;
      return setFirestoreDocument("users", uid, {
        email,
        name,
        age,
        nickname,
        phone,
        gender
      });
    });
};

export const signIn = ({ email, password }) => {
  return signInWithEmailAndPassword(email, password)
    .catch(err => {
      if (err.code === "auth/invalid-email") {
        // 올바르지 않은 이메일 형식
        return Promise.reject({
          code: SigninError.INVALID_EMAIL
        });
      } else if (err.code === "auth/user-disabled") {
        // 유저 비활성화
        return Promise.reject({
          code: SigninError.USER_DISABLED
        });
      } else if (err.code === "auth/user-not-found") {
        // 유저 없음
        return Promise.reject({
          code: SigninError.USER_NOT_FOUND
        });
      } else if (err.code === "auth/wrong-password") {
        // 비밀번호 틀림
        return Promise.reject({
          code: SigninError.WRONG_PASSWORD
        });
      }

      return Promise.reject(err);
    })
    .then(({ user }) => {
      const uid = user.uid;
      return getFirebaseDocument("users", uid)
        .then(data => {
          const { email, name, nickname, age, gender, phone } = data;
          return { email, name, nickname, age, gender, phone };
        })
        .catch(err => {
          return Promise.reject({ code: SigninError.NOT_EXIST_DATA });
        });
    });
};
