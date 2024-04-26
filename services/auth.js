import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./config";

const login = async (email, password) => {
  console.log("Handle submit");
  console.log(email);
  console.log(password);
  try {
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

export { login, signup };
