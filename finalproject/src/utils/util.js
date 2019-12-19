import uuidv1 from 'uuid/v1';
import {
  findFirebaseDocuments,
  getFirebaseDocument,
  getImageDownloadPath,
  setFirestoreDocument,
  updateFirebaseDocuments,
} from './firebase';

export const findUser = (email) => {
  return findFirebaseDocuments('users', ['email'], [email])
    .then(async (data) => {
      if (data.length > 0) {
        const user = data[0];
        const profileImagePath = await getImageDownloadPath(`profiles/${user.uid}.jpg`);
        user.profileImagePath = profileImagePath;
        return user;
      }
      return null;
    })
    .catch(() => null);
};

export const getUser = (uid) => {
  return getFirebaseDocument('users', uid)
    .then(async (data) => {
      const user = data;
      const profileImagePath = await getImageDownloadPath(`profiles/${user.uid}.jpg`);
      user.profileImagePath = profileImagePath;
      return user;
    })
    .catch(() => null);
};

export const getPlace = (uid) => {
  return getFirebaseDocument('places', uid)
    .then((data) => {
      return data;
    })
    .catch(() => null);
};

export const selectPlace = (email, userUid, title, address, mapX, mapY) => {
  const uid = uuidv1();
  return setFirestoreDocument('places', uid, {
    email,
    userUid,
    title,
    address,
    mapX,
    mapY,
    uid,
    isFinish: false,
  }).then(() => uid);
};

export const getPlaceByInfo = (email, title, address, mapX, mapY) => {
  return findFirebaseDocuments(
    'places',
    ['email', 'title', 'address', 'mapX', 'mapY'],
    [email, title, address, mapX, mapY]
  )
    .then((dataList) => {
      if (dataList.length > 0) {
        return dataList[0];
      }

      return null;
    })
    .catch(() => []);
};

export const findSelectedPlacesByUser = (email) => {
  return findFirebaseDocuments('places', ['email'], [email]).catch(() => []);
};

export const findUsersByPlace = (title, address, mapX, mapY) => {
  return findFirebaseDocuments(
    'places',
    ['title', 'address', 'mapX', 'mapY', 'isFinish'],
    [title, address, mapX, mapY, false]
  ).catch(() => []);
};

export const finishMatch = (email, targetUserUid, title, address, mapX, mapY) => {
  return updateFirebaseDocuments('places', ['email', 'title', 'address', 'mapX', 'mapY'], [email, title, address, mapX, mapY], {
    isFinish: true,
    targetUserUid,
  });
};
