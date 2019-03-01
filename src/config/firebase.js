
// Initialize Firebase
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

const config = {
    apiKey: "AIzaSyCQ7s6wLxDOSbYLHZ4JYWfm6RlltRoFViY",
    authDomain: "saylani-8099b.firebaseapp.com",
    databaseURL: "https://saylani-8099b.firebaseio.com",
    projectId: "saylani-8099b",
    storageBucket: "saylani-8099b.appspot.com",
    messagingSenderId: "1028251352751"
};

firebase.initializeApp(config);

const db = firebase.firestore();

function register(email, password, name) {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (data) {
                console.log('account created');
                console.log('data', data);
                db.collection('users').doc(data.user.uid).set({ email: email, name: name });
                resolve(data);
            })
            .catch(function (error) {
                var errorMessage = error.message;
                reject(errorMessage)
            });
    })
}

function login(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (data) {
                resolve(data);
            }).catch(function (error) {
                reject(error.message);
            });
    })
}

function logout() {
    firebase.auth().signOut().then(logout => {
        console.log('logged out user', logout)
    });
}

function getAllAds() {
    let data = [];
    return new Promise((resolve, reject) => {
        db.collection('ads')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        data.push(doc.data());
                    }
                });
                resolve(data);
            }).catch(err => {
                console.log(' err in ads', err)
                reject(err);
            })
    })
}

function searchProductByText(text) {
    let data = [];
    return new Promise((resolve, reject) => {
        const startText = text;
        const endText = startText + '\uf8ff';
        // console.log('start', endText)
        // console.log('end', endText)
        db.collection('ads').orderBy('title')
            .startAt(startText)
            .endAt(endText)
            .get().then(querySnapshot=>{
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        data.push(doc.data());
                    }
                });
                resolve(data);
            })
    }).catch(err => {
        console.log('err', err)
    })

}

function userAuth() {
    return firebase.auth();
}

function isLoggedIn() {
    return firebase.auth().currentUser;
}



export {
    userAuth,
    register,
    login,
    logout,
    getAllAds,
    isLoggedIn,
    searchProductByText
}