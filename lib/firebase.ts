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

// ✅ Auth con const (sin let)
export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: require("firebase/auth").getReactNativePersistence(
          ReactNativeAsyncStorage
        ),
      });

export const db = getFirestore(app);

// Manejar sesión en SecureStore para móviles
auth.onAuthStateChanged(async (user) => {
  if (Platform.OS !== "web") {
    if (user) {
      await SecureStore.setItemAsync("userToken", JSON.stringify(user));
    } else {
      await SecureStore.deleteItemAsync("userToken");
    }
  }
});