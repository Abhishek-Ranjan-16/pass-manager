import {addDoc,collection,serverTimestamp} from "firebase/firestore"
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
export const useAddTransaction=()=>{
    const {userID}=useGetUserInfo();
    const passdataRef=collection(db,"passdata")
    const addpassdata=async({site,username,pwd})=>{
     await addDoc(passdataRef,{
        userID,
        site ,
        username ,
        pwd ,
        createdAt:serverTimestamp(),
     }); 
     
    };

    return {addpassdata};
}