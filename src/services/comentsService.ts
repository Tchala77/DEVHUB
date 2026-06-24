import { Comment } from '../types/Comment';
import { getItem, setItem } from './storageService';

const COMMENTS_KEY = 'comments';

export const getComments = (): Comment[] => {
  return getItem<Comment[]>(COMMENTS_KEY, []);
};

export const addComment = (comment: Comment): void => {
  const comments = getComments();
  comments.push(comment);
  setItem(COMMENTS_KEY, comments);
};

export const deleteComment = (id: string): void => {
  const comments = getComments();
  setItem(COMMENTS_KEY, comments.filter(c => c.id !== id));
};

export const getCommentsByProject = (projectId: string): Comment[] => {
  return getComments()
    .filter(c => c.projectId === projectId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};