import { defineStore } from "pinia";
import { query, doc, collection, addDoc, setDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "src/config/firebase";

export const useCrud = defineStore('crud', () => {

    const addDocument = async (collectionPath, documentData) => {
        try {
            await addDoc(collection(db, collectionPath), documentData);
            console.log("Document added successfully");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const setDocument = async (collectionPath, documentId, documentData) => {
        try {
            await setDoc(doc(db, collectionPath, documentId), documentData);
            console.log("Document added with specified ID successfully");
        } catch (error) {
            console.error("Error setting document: ", error);
        }
    };

    const updateDocument = async (collectionPath, documentId, documentData) => {
        try {
            await updateDoc(doc(db, collectionPath, documentId), documentData);
            console.log("Document updated successfully");
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const deleteDocument = async (collectionPath, documentId) => {
        try {
            await deleteDoc(doc(db, collectionPath, documentId));
            console.log("Document deleted successfully");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const deleteAllDocuments = async (collectionPath) => {
        try {
            const collectionRef = collection(db, collectionPath);
            const querySnapshot = await getDocs(query(collectionRef));

            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
            console.log("All documents deleted successfully");
        } catch (error) {
            console.error("Error deleting all documents: ", error);
        }
    };

    return {
        addDocument,
        setDocument,
        updateDocument,
        deleteDocument,
        deleteAllDocuments,
    };
});