import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAaUW9zy_56HGL3SuOMeAzlZceQb-ni2aY",
  authDomain: "quizzapp-378ec.firebaseapp.com",
  databaseURL: "https://quizzapp-378ec.firebaseio.com",
  projectId: "quizzapp-378ec",
  storageBucket: "quizzapp-378ec.appspot.com",
  messagingSenderId: "757183694535"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
