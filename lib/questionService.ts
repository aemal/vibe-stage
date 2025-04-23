import { db } from './firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  where, 
  increment, 
  runTransaction,
  DocumentData,
  QueryDocumentSnapshot,
  Transaction
} from 'firebase/firestore';
import { Question, Upvote, QuestionWithUpvoteStatus } from './models';

const QUESTIONS_COLLECTION = 'questions';
const UPVOTES_COLLECTION = 'upvotes';

// Create a new question
export async function createQuestion(question: Omit<Question, 'id' | 'upvoteCount' | 'answered' | 'pinned' | 'timestamp'>): Promise<string> {
  const questionData = {
    ...question,
    userId: question.userId || 'anonymous',
    username: question.username || 'Anonymous User',
    upvoteCount: 0,
    answered: false,
    pinned: false,
    timestamp: Date.now()
  };

  const docRef = await addDoc(collection(db, QUESTIONS_COLLECTION), questionData);
  return docRef.id;
}

// Get all questions
export async function getQuestions(sort: 'recent' | 'popular' = 'recent', userId?: string): Promise<QuestionWithUpvoteStatus[]> {
  let q;
  if (sort === 'recent') {
    q = query(collection(db, QUESTIONS_COLLECTION), orderBy('pinned', 'desc'), orderBy('timestamp', 'desc'));
  } else {
    q = query(collection(db, QUESTIONS_COLLECTION), orderBy('pinned', 'desc'), orderBy('upvoteCount', 'desc'));
  }

  const querySnapshot = await getDocs(q);
  const questions: Question[] = [];
  
  querySnapshot.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
    questions.push({
      id: docSnapshot.id,
      ...docSnapshot.data() as Omit<Question, 'id'>
    });
  });

  // If userId is provided, check which questions the user has upvoted
  if (userId) {
    const upvotePromises = questions.map(async (question) => {
      const upvoteDoc = await getDoc(doc(db, QUESTIONS_COLLECTION, question.id!, UPVOTES_COLLECTION, userId));
      return {
        ...question,
        hasUserUpvoted: upvoteDoc.exists()
      };
    });
    
    return Promise.all(upvotePromises);
  }

  // If no userId, mark all as not upvoted
  return questions.map(question => ({
    ...question,
    hasUserUpvoted: false
  }));
}

// Get user's questions
export async function getUserQuestions(userId: string): Promise<Question[]> {
  const q = query(collection(db, QUESTIONS_COLLECTION), where('userId', '==', userId), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  
  const questions: Question[] = [];
  querySnapshot.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
    questions.push({
      id: docSnapshot.id,
      ...docSnapshot.data() as Omit<Question, 'id'>
    });
  });
  
  return questions;
}

// Upvote a question
export async function upvoteQuestion(questionId: string, userId: string = 'anonymous'): Promise<void> {
  const questionRef = doc(db, QUESTIONS_COLLECTION, questionId);
  const upvoteRef = doc(db, QUESTIONS_COLLECTION, questionId, UPVOTES_COLLECTION, userId);

  const upvote: Upvote = {
    userId,
    questionId,
    timestamp: Date.now()
  };

  await runTransaction(db, async (transaction: Transaction) => {
    const upvoteDoc = await transaction.get(upvoteRef);
    
    if (!upvoteDoc.exists()) {
      // Add upvote and increment count
      transaction.set(upvoteRef, upvote);
      transaction.update(questionRef, {
        upvoteCount: increment(1)
      });
    }
  });
}

// Remove upvote from a question
export async function removeUpvote(questionId: string, userId: string = 'anonymous'): Promise<void> {
  const questionRef = doc(db, QUESTIONS_COLLECTION, questionId);
  const upvoteRef = doc(db, QUESTIONS_COLLECTION, questionId, UPVOTES_COLLECTION, userId);

  await runTransaction(db, async (transaction: Transaction) => {
    const upvoteDoc = await transaction.get(upvoteRef);
    
    if (upvoteDoc.exists()) {
      // Remove upvote and decrement count
      transaction.delete(upvoteRef);
      transaction.update(questionRef, {
        upvoteCount: increment(-1)
      });
    }
  });
}

// Mark question as answered (moderator only)
export async function markQuestionAsAnswered(questionId: string, answered: boolean): Promise<void> {
  const questionRef = doc(db, QUESTIONS_COLLECTION, questionId);
  await updateDoc(questionRef, { answered });
}

// Pin a question (moderator only)
export async function pinQuestion(questionId: string, pinned: boolean): Promise<void> {
  const questionRef = doc(db, QUESTIONS_COLLECTION, questionId);
  await updateDoc(questionRef, { pinned });
}

// Delete a question
export async function deleteQuestion(questionId: string): Promise<void> {
  await deleteDoc(doc(db, QUESTIONS_COLLECTION, questionId));
} 