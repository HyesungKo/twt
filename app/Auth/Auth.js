import firebase from 'firebase';

export const signInWithEmailAndPassword = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
}

export const signUpWithEmailAndPassword = async (email, password) => {
    return await firebase.auth().createUserWithEmailAndPassword(email, password);
}

export const isSignedIn = async () => {
    return await firebase.auth().onAuthStateChanged()
}

export const signOut = async () => {
    return await firebase.auth().signOut()
}