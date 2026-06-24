interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({ isOpen, title, message, onConfirm, onCancel }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onConfirm} style={{ marginRight: '1rem', backgroundColor: '#d9534f', color: 'white' }}>
          Deletar Permanentemente
        </button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}