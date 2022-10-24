import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase.config.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore/lite";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getAllEvents = async () => {
  const data = await collection(db, "events_app");
  const docs = await getDocs(data);
  const events = docs.docs.map((doc) => doc.data());
  return events;
};

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getComments(id) {
  const docRef = doc(db, "events_app", id);
  const commentDoc = await getDoc(docRef);
  return (await commentDoc.data());
}

export async function addComment(id, comment) {
  let comments = await getComments(id);
  if (!comments) {
    comments = [];
  }
  comments.push(comment);
  const docRef = doc(db, "events_app", id);
  return await updateDoc(docRef, "comments", comments);
}
