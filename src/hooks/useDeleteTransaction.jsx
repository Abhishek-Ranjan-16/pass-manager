import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useDeleteTransaction = () => {
  const { userID } = useGetUserInfo();

  const deletedata = async (id) => { 
    try {
      const passdataRef = doc(db, "passdata", id);
      await deleteDoc(passdataRef); 
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  return { deletedata };
};