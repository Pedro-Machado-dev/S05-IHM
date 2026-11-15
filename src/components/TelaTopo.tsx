import { ArrowLeft } from 'lucide-react';
import { voltar } from '../lib/rotas';

type Props = { titulo: string; voltarPara?: string; semVoltar?: boolean };

export function TelaTopo({ titulo, voltarPara = 'inicio', semVoltar = false }: Props) {
  return (
    <div className="tela-topo">
      {!semVoltar && (
        <button type="button" className="btn-icone" aria-label="Voltar" onClick={() => voltar(voltarPara)}>
          <ArrowLeft size={22} aria-hidden="true" />
        </button>
      )}
      <h1>{titulo}</h1>
    </div>
  );
}
