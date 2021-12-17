import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const config = {
  apiKey: "AIzaSyAmkUSOUvkPWusSifjXZig6cLEVIHVwf0o",
    authDomain: "creativeproject4-cadc1.firebaseapp.com",
    projectId: "creativeproject4-cadc1",
    storageBucket: "creativeproject4-cadc1.appspot.com",
    messagingSenderId: "264868670087",
    appId: "1:264868670087:web:ca07e87b51453f19c6e622",
    measurementId: "G-ZXJLFHL4HZ"
  }

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
