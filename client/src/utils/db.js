import { openDB } from "idb";

export const initDB = async () => {
  return await openDB("codifyDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("lessons")) {
        db.createObjectStore("lessons", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("progress")) {
        db.createObjectStore("progress", { keyPath: "lessonId" });
      }
    }
  });
};

// Save lesson
export const saveLesson = async lesson => {
  const db = await initDB();
  await db.put("lessons", lesson);
};

// Get lesson
export const getLesson = async id => {
  const db = await initDB();
  return await db.get("lessons", id);
};

// Save progress
export const saveProgress = async progress => {
  const db = await initDB();
  await db.put("progress", progress);
};
