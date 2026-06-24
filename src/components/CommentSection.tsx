import { useState, useEffect } from 'react';
import { Comment } from '../types/Comment';
import { getCommentsByProject, addComment, deleteComment } from '../services/commentsService';

interface Props {
  projectId: string;
}

export default function CommentsSection({ projectId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const load = () => {
    setComments(getCommentsByProject(projectId));
  };

  useEffect(() => {
    load();
  }, [projectId]);

  const handleSubmit = () => {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      projectId,
      author: author.trim() || 'Anônimo',
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    addComment(newComment);
    setText('');
    load();
  };

  const handleDelete = (id: string) => {
    deleteComment(id);
    load();
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <h4>Comentários</h4>
      <div>
        <input
          type="text"
          placeholder="Seu nome (opcional)"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <textarea
          placeholder="Deixe um comentário (máx 300 caracteres)"
          maxLength={300}
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <div style={{ fontSize: '0.8rem', textAlign: 'right' }}>{text.length}/300</div>
        <button onClick={handleSubmit}>Enviar</button>
      </div>
      {comments.length === 0 && <p>Sem comentários ainda</p>}
      {comments.map(c => (
        <div key={c.id} style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
          <strong>{c.author}</strong> <small>{new Date(c.createdAt).toLocaleString()}</small>
          <p>{c.text}</p>
          <button
            onClick={() => handleDelete(c.id)}
            style={{ fontSize: '0.8rem', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
          >
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}