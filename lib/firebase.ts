import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth, Auth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyCLEC4WO4YOsvC3JqGNBAZiMn3KMwLBSXI",
  authDomain: "desarrollomovil-c471c.firebaseapp.com",
  projectId: "desarrollomovil-c471c",
  storageBucket: "desarrollomovil-c471c.firebasestorage.app",
  messagingSenderId: "855818697183",
  appId: "1:855818697183:web:7c2f08ee2c5e64880e2c6a",
  measurementId: "G-BS3CXDGXSJ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Configurar autenticación
let auth: Auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: ReactNativeAsyncStorage ? 
      require('firebase/auth').getReactNativePersistence(ReactNativeAsyncStorage) : 
      require('firebase/auth').inMemoryPersistence
  });
}

const db = getFirestore(app);

// Manejar sesión en SecureStore para móviles
auth.onAuthStateChanged(async (user: any) => {
  if (Platform.OS !== "web") {
    if (user) {
      await SecureStore.setItemAsync("userToken", JSON.stringify(user));
    } else {
      await SecureStore.deleteItemAsync("userToken");
    }
  }
});

export { auth, db };