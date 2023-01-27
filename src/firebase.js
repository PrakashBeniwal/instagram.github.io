import  firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/database'
// import auth from 'firebase/auth'
import config from './config'
firebase.initializeApp(config)
const auth=firebase.auth()
const storage=firebase.storage()
const db=firebase.database()
export {auth,storage,db}