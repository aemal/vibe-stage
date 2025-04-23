export interface User {
  uid?: string;
  username?: string;
  email?: string;
  country?: string;
  isAdmin?: boolean;
  photoURL?: string;
}

export interface Question {
  id?: string;
  title: string;
  description?: string;
  userId?: string;
  username?: string;
  timestamp: number;
  upvoteCount: number;
  answered: boolean;
  pinned: boolean;
  countryCode?: string;
}

export interface Upvote {
  userId: string;
  questionId: string;
  timestamp: number;
}

export interface QuestionWithUpvoteStatus extends Question {
  hasUserUpvoted: boolean;
} 