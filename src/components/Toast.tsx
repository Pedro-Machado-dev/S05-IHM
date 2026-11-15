import { useApp } from '../context/AppContext';

export function Toast() {
  const { toast, fecharToast } = useApp();

  return (
    <div className="toast-area" aria-live="polite">
      {toast && (
        <div className="toast" key={toast.id}>
          <span>{toast.mensagem}</span>
          {toast.acao && (
            <button
              type="button"
              className="toast-acao"
              onClick={() => {
                toast.acao?.aoAcionar();
                fecharToast();
              }}
            >
              {toast.acao.rotulo}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
