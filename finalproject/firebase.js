import dotenv from "dotenv";
dotenv.config();

export const firebaseConfig = {
  apiKey: process.env["FIREBASE_API_KEY"],
  authDomain: "eat-foods-with-you.firebaseapp.com",
  databaseURL: "https://eat-foods-with-you.firebaseio.com",
  projectId: "eat-foods-with-you",
  storageBucket: "eat-foods-with-you.appspot.com",
  messagingSenderId: "935328497051",
  appId: "1:935328497051:web:f8456877534e3f0ff1f53e",
  measurementId: process.env["FIREBASE_MEASUREMENT_ID"]
};
