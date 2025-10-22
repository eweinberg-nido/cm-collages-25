// src/utils/submitFeedback.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const submitFeedback = async (feedbackData) => {
  try {
    const docRef = await addDoc(collection(db, "feedback"), feedbackData);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
