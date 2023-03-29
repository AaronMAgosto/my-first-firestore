// import our tools from firebase-admin
import { initializeApp, cert } from "firebase-admin/app";//use to conect to our firebase project
import {getFirestore} from "firebase-admin/firestore";//use to connect to Firestore

// import our credentials from a secret file
import { credentials } from "./credentials.js";

//connect to our firebase project
initializeApp({
    credential: cert(credentials)
});

// connect to firestore database AKA DB
const db = getFirestore();

// add a product to our prodects collection
const candy = {
name: "skittles",
unitPrice: 3.99,
size: "16 oz",
color: "green",
inventory: 144,
productNumber: 7,
}

const candy2 = {
    name: "twix",
    unitPrice: 2.99,
    size: "12 oz",
    color: "gold",
    inventory: 288,
    productNumber: 2,
    }
    // how to add a document to Firestore
// db.collection('products').add(candy2)// while we are waiting for the promise
//     .then((doc) => {
//     console.log("added doc: " + doc.id)
//          // i can be sure inside .then() that the 1st process was completed succesfully
// })
// .catch(err => console.log(err))

// how to update a document in Firestore:
db.collection('products').doc('1Xt56wVzOs9xOyueIS0Z').update({
    inventory: 555,
    customerFavorite: true 

})

//how to read a document from firestore:

db.collection('products').doc('1Xt56wVzOs9xOyueIS0Z').get()
.then(doc =>{
    console.log(doc.data())
    
})
.catch(err => console.log(err))

//how to get a whole collection:

db.collection('products').get()
.then(collection =>{
   const productList =  collection.docs.map(doc => ({...doc.data(), id: doc.id }))
   console.log(productList);
   console.table(productList)
})
.catch(err => console.log(err));