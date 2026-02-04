"use client";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "./firebase"; // default import

/**
 * Upload image file to Firebase Storage
 * @param file File to upload
 * @param folder Folder name in Firebase Storage
 * @returns public URL of uploaded image
 */
export async function UploadImageToFirebase(file: File, folder: string): Promise<string> {
  if (!file) return "";

  const storage = getStorage(firebaseApp);
  const fileRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
}
