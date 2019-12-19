import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

export const FirestoreError = {
  NOT_EXIST_DOC: 'firestore/not-exist-data',
  SYSTEM_ERROR: 'firestore/system-error',
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

export const updateFirebaseDocument = (collection, document, value) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .update(value);
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

export const findFirebaseDocuments = (collection, fields = [], values = []) => {
  let where = firebase.firestore().collection(collection);
  for (let i = 0; i < fields.length; i += 1) {
    where = where.where(fields[i], '==', values[i]);
  }

  return where
    .get()
    .then((querySnapshot) => {
      const dataList = [];
      querySnapshot.forEach((doc) => {
        dataList.push(doc.data());
      });
      return dataList;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const getFirebaseDatabaseRef = (path) => {
  return firebase.database().ref(path);
};

export const getFirebaseServerTimestamp = () => {
  return firebase.database.ServerValue.TIMESTAMP;
};

export const updateFirebaseDocuments = (collection, fields = [], values = [], value = {}) => {
  let where = firebase.firestore().collection(collection);
  for (let i = 0; i < fields.length; i += 1) {
    where = where.where(fields[i], '==', values[i]);
  }

  return where.get().then((querySnapshot) => {
    const updateList = [];
    querySnapshot.forEach((doc) => {
      updateList.push(updateFirebaseDocument(collection, doc.id, value));
    });
    return Promise.all(updateList);
  });
};
