import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const FirestoreError = {
  NOT_EXIST_DOC: 'firestore/not-exist-data',
  SYSTEM_ERROR: 'firestroe/system-error',
};

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBSaHFq3eMNuqfceqfAuOgr5cV9VNJ9vlU',
    authDomain: 'eat-foods-with-you.firebaseapp.com',
    databaseURL: 'https://eat-foods-with-you.firebaseio.com',
    projectId: 'eat-foods-with-you',
    storageBucket: 'eat-foods-with-you.appspot.com',
    messagingSenderId: '935328497051',
    appId: '1:935328497051:web:f8456877534e3f0ff1f53e',
    measurementId: 'G-EQFRV5TFJM',
  };

  firebase.initializeApp(firebaseConfig);
};

export const createEmailWithPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const setFirestoreDocument = (collection, document, value, merge = false) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .set(value, { merge })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getFirebaseDocument = (collection, document) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
      return Promise.reject(new Error(FirestoreError.NOT_EXIST_DOC));
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const uploadImageToStorage = (fileName, image) => {
  return firebase
    .storage()
    .ref(fileName)
    .put(image);
};

export const getImageDownloadPath = (fileName) => {
  return firebase
    .storage()
    .ref(fileName)
    .getDownloadURL();
};

export const getSelectedFirebaseDocument = (collection, fieldName, valueName) => {
  return firebase
    .firestore()
    .collection(collection)
    .where(fieldName, '==', valueName)
    .get()
    .then((querySnapshot) => {
      const placeList = [];
      console.log(querySnapshot);
      querySnapshot.forEach(function(doc) {
        console.log(doc.data());
        placeList.push(doc.data());
      });
      console.log(placeList);
      return placeList;
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};
