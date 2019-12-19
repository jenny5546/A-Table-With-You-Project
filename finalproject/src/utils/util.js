import uuidv1 from 'uuid/v1';
import { findFirebaseDocuments, setFirestoreDocument } from './firebase';

export const findUser = (email) => {
  return findFirebaseDocuments('users', ['email'], [email]).then((data) => {
    if (data.length > 0) {
      return data[0];
    }
    return null;
  });
};

export const selectePlace = (email, title, address, mapX, mapY) => {
  const uid = uuidv1();
  return setFirestoreDocument('places', uid, {
    email,
    title,
    address,
    mapX,
    mapY,
    uid,
  });
};

export const findSelectedPlacesByUser = (email) => {
  return findFirebaseDocuments('places', ['email'], [email]);
};

export const findUsersByPlace = (title, address, mapX, mapY) => {
  return findFirebaseDocuments('places', ['title', 'address', 'mapX', 'mapY'], [title, address, mapX, mapY]);
};
