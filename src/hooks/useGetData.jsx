import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";
import { db } from "../config/firebase-config";
import { useEffect, useState } from "react";

export const useGetData = () => {
  const { userID } = useGetUserInfo();
  const passdataRef = collection(db, "passdata");
  const [data, setdata] = useState([]);

  const getData = async () => {
    let unsubscribe;
    try {
      const querypassdata = query(passdataRef, where("userID", "==", userID));
      orderBy("createdAt");

      unsubscribe = onSnapshot(querypassdata, (snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
        });
        setdata(docs);
      });
    } catch (error) {
      console.log(error);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    getData();
  }, []);
  return { data };
};
