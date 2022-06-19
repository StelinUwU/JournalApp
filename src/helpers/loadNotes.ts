import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';
import { INote } from '../interfaces';

export const loadNotes = async (uid: string) => {
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

  const docs = await getDocs(collectionRef);

  const notes: INote[] = [];

  docs.forEach((doc) => {
    notes.push({
      ...doc.data(),
      id: doc.id,
    } as INote);
  });

  return notes;
};
