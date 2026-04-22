import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
  query,
  deleteDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const postsRef = collection(db, "posts");

// CREATE POST
export const createPost = async (data, user) => {
  await addDoc(postsRef, {
    title: data.title,
    image: data.image,
    category: data.category || "Other",
    content: data.content,

    createdAt: serverTimestamp(),
    userId: user.uid,
    userName: user.displayName || user.email.split("@")[0],
    userEmail: user.email,
  });
};

// GET POSTS
export const getPosts = async () => {
  const snapshot = await getDocs(postsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

//GET SINGLEDETAILPAGE

export const getPostById = async (id) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Post not found");
  }

  return { id: docSnap.id, ...docSnap.data() };
};

//GET ALL POST(USERID)

export const getUserPosts = async (userId) => {
  const q = query(postsRef, where("userId", "==", userId));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

//UPDATE POST

export const updatePost = async (postId, data) => {
  const docRef = doc(db, "posts", postId);

  await updateDoc(docRef, {
    title: data.title,
    content: data.content,
    image: data.image,
    category: data.category,
  });
};

//DELETE POST

export const deletePost = async (postId) => {
  const docRef = doc(db, "posts", postId);
  await deleteDoc(docRef);
};
