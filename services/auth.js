import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./config";
import { collection, query, where, getDocs } from "firebase/firestore";

const verifyUserRole = async (email, role) => {
  try {
    const userRef = collection(db, "users");
    const u = query(userRef, where("email", "==", email), where("role", "==", role));

    const querySnapshot = await getDocs(u);

    if (querySnapshot.empty) {
      throw new Error(
        `Please log in as a ${role} to proceed.`
      );
    }
  } catch (error) {
    throw error;
  }
};

const login = async (email, password, role) => {
  try {
    await verifyUserRole(email, role);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User credential", userCredential);
    const user = userCredential.user;
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};

const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};

const signout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export { login, signup, signout };
