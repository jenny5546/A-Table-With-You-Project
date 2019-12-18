import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const FirestoreError = {
  NOT_EXIST_DOC: 1,
  SYSTEM_ERROR: 2
};

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: 
    
    authDomain: "eat-foods-with-you.firebaseapp.com",
    databaseURL: "https://eat-foods-with-you.firebaseio.com",
    projectId: "eat-foods-with-you",
    storageBucket: "eat-foods-with-you.appspot.com",
    messagingSenderId: "935328497051",
    appId: "1:935328497051:web:f8456877534e3f0ff1f53e",
    measurementId: 
    
    
  };

  firebase.initializeApp(firebaseConfig);
};

export const createEmailWithPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const setFirestoreDocument = (collection, document, value) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .set(value)
    .catch(err => {
      return Promise.reject(err);
    });
};

export const getFirebaseDocument = (collection, document) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      }
      return Promise.reject({ code: FirestoreError.NOT_EXIST_DOC });
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

export const uploadImageToStorage = (fileName, image) => {
  return firebase
    .storage()
    .ref(fileName)
    .put(image);
};

export const getImageDownloadPath = fileName => {
  return firebase
    .storage()
    .ref(fileName)
    .getDownloadURL();
};
