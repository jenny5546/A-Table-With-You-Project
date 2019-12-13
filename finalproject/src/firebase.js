import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const FirebaseSignupError = {
  ALREADY_EMAIL_USE: 1,
  INVALID_EMAIL: 2,
  OPERATION_NOT_ALLOWED: 3,
  WEAK_PASSWORD: 4 // Minimum password length is 6
};

export const FirebaseSigninError = {
  INVALID_EMAIL: 1,
  USER_DISABLED: 2,
  USER_NOT_FOUND: 3,
  WRONG_PASSWORD: 4,
  NOT_EXIST_DATA: 5
};

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: process.env["REACT_APP_FIREBASE_API_KEY"],
    authDomain: "eat-foods-with-you.firebaseapp.com",
    databaseURL: "https://eat-foods-with-you.firebaseio.com",
    projectId: "eat-foods-with-you",
    storageBucket: "eat-foods-with-you.appspot.com",
    messagingSenderId: "935328497051",
    appId: "1:935328497051:web:f8456877534e3f0ff1f53e",
    measurementId: process.env["REACT_APP_FIREBASE_MEASUREMENT_ID"]
  };

  firebase.initializeApp(firebaseConfig);
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
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(err => {
      if (err.code === "auth/email-already-in-use") {
        // 이메일 이미 사용 중
        return Promise.reject({
          code: FirebaseSignupError.ALREADY_EMAIL_USE
        });
      } else if (err.code === "auth/invalid-email") {
        // 올바르지 않은 이메일 형식
        return Promise.reject({
          code: FirebaseSignupError.INVALID_EMAIL
        });
      } else if (err.code === "auth/operation-not-allowed") {
        // 회원가입 비활성화
        return Promise.reject({
          code: FirebaseSignupError.OPERATION_NOT_ALLOWED
        });
      } else if (err.code === "auth/weak-password") {
        // 비밀번호 규칙 어김
        return Promise.reject({
          code: FirebaseSignupError.WEAK_PASSWORD
        });
      }

      return Promise.reject(err);
    })
    .then(({ user }) => {
      const uid = user.uid;
      return firebase
        .database()
        .ref(`users/${uid}`)
        .set({
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
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      if (err.code === "auth/invalid-email") {
        // 올바르지 않은 이메일 형식
        return Promise.reject({
          code: FirebaseSigninError.INVALID_EMAIL
        });
      } else if (err.code === "auth/user-disabled") {
        // 유저 비활성화
        return Promise.reject({
          code: FirebaseSigninError.USER_DISABLED
        });
      } else if (err.code === "auth/user-not-found") {
        // 유저 없음
        return Promise.reject({
          code: FirebaseSigninError.USER_NOT_FOUND
        });
      } else if (err.code === "auth/wrong-password") {
        // 비밀번호 틀림
        return Promise.reject({
          code: FirebaseSigninError.WRONG_PASSWORD
        });
      }

      return Promise.reject(err);
    })
    .then(({ user }) => {
      const uid = user.uid;
      return firebase
        .database()
        .ref(`users/${uid}`)
        .once("value")
        .then(snapshot => {
          if (snapshot.val()) {
            const {
              email,
              name,
              nickname,
              age,
              gender,
              phone
            } = snapshot.val();
            return { email, name, nickname, age, gender, phone };
          } else {
            return Promise.reject({ code: FirebaseSigninError.NOT_EXIST_DATA });
          }
        })
        .catch(err => {
          return Promise.reject(err);
        });
    });
};
