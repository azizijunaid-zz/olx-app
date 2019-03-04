
// Initialize Firebase
import * as firebase from 'firebase';

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

firebase.storage()
    .ref('expertizo-olx/')
    .constructor.prototype
    .putFiles = function (files) {
        let ref = this;
        debugger
        return Promise.all(files.map(function (file) {
            const name = (+new Date()) + '-' + file.name;
            return ref.child(name).put(file);
        }));
    }

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
            .get().then(querySnapshot => {
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

function createAds(ad) {
    return db.collection('ads').add(ad)
}

function uploadImageAsPromise(imageFile) {
    return new Promise((resolve, reject) => {
        const name = (+new Date()) + '-' + imageFile.name;
        const storageRef = firebase.storage().ref('expertizo-olx/' + name);
        const metadata = {
            contentType: imageFile.type
        };

        storageRef.put(imageFile, metadata)
            .then(() => {
                storageRef.getDownloadURL()
                    .then(url => {
                        resolve(url);
                    }).catch((error) => {
                        // Handle any errors here
                        reject(error)
                        console.log('error', error)
                    });
            })


        // uploadtask.on('state_changed',
        //     function progress(snapshot) {
        //         let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        //         // uploader.value = percentage;
        //         console.log('percentage', percentage);
        //     },
        //     function error(err) {
        //         reject(error)
        //     },
        //     function complete() {
        //         console.log('storageRef', storageRef)
        //         storageRef.getDownloadURL().then(url => {
        //             resolve(url);
        //         }).catch((error) => {
        //             // Handle any errors here
        //             reject(error)
        //             console.log('error', error)
        //         });
        //         // console.log('downloadURL', downloadURL)
        //     }
        // );

        // return new Promise(function (resolve, reject) {
        //     var storageRef = firebase.storage().ref("expertizo-olx/" + imageFile.name);

        //     //Upload file
        //     var task = storageRef.put(imageFile);

        //     //Update progress bar
        //     task.on('state_changed',
        //         function progress(snapshot) {
        //             var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        //             // uploader.value = percentage;
        //         },
        //         function error(err) {

        //         },
        //         function complete() {
        //             storageRef.getDownloadURL().then(url => {
        //                 var downloadURL = url
        //                 console.log('vdownloadURL', downloadURL)
        //             }).catch((error) => {
        //                 // Handle any errors here
        //                 console.log('error', error)
        //             });
        //         }
        //     );
        // });
    })
}

function userAuth() {
    return firebase.auth();
}

function isLoggedIn() {
    return firebase.auth().currentUser;
}

function currentUser(){
    return firebase.auth().currentUser;
}



export {
    userAuth,
    register,
    login,
    logout,
    getAllAds,
    createAds,
    isLoggedIn,
    searchProductByText,
    uploadImageAsPromise,
    currentUser
}