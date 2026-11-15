import { Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { diasParaPrazo } from '../lib/datas';
import { ir } from '../lib/rotas';
import type { Edital } from '../types';
import { BadgePrazo } from './Badge';

export function CardEdital({ edital }: { edital: Edital }) {
  const { ehFavorito } = useApp();

  return (
    <li>
      <button type="button" className="edital" onClick={() => ir(`editais/${edital.id}`)}>
        <span className="edital-texto">
          <strong className="edital-titulo">{edital.titulo}</strong>
          <span className="edital-meta">
            {edital.cidade} · {edital.duracao} meses · {edital.idioma}
          </span>
        </span>
        <span className="edital-lado">
          {ehFavorito(edital.id) && <Bookmark size={18} fill="currentColor" aria-label="Nos favoritos" />}
          <BadgePrazo dias={diasParaPrazo(edital)} />
        </span>
      </button>
    </li>
  );
}
