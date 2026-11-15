import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { EDITAIS } from '../data/editais';
import type { DuracaoFiltro, Filtros } from '../types';

type Props = { filtros: Filtros; onAplicar: (filtros: Filtros) => void; onFechar: () => void };

const ordenar = (valores: string[]) => [...new Set(valores)].sort((a, b) => a.localeCompare(b, 'pt-BR'));
const PAISES = ordenar(EDITAIS.map((e) => e.pais));
const IDIOMAS = ordenar(EDITAIS.map((e) => e.idioma));

const DURACOES: { id: DuracaoFiltro; rotulo: string }[] = [
  { id: 'ate6', rotulo: '≤ 6 meses' },
  { id: '12', rotulo: '12 meses' },
  { id: 'qualquer', rotulo: 'Qualquer' },
];

export function FiltrosSheet({ filtros, onAplicar, onFechar }: Props) {
  const [rascunho, setRascunho] = useState<Filtros>(filtros);
  const primeiroCampo = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    primeiroCampo.current?.focus();
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') onFechar();
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [onFechar]);

  return (
    <div className="sheet">
      <div className="sheet-fundo" onClick={onFechar} />
      <div className="sheet-painel" role="dialog" aria-modal="true" aria-labelledby="filtrosTitulo">
        <div className="sheet-topo">
          <h2 id="filtrosTitulo">Filtros</h2>
          <button type="button" className="btn-icone" aria-label="Fechar filtros" onClick={onFechar}>
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <label htmlFor="fPais">País</label>
        <select
          id="fPais"
          ref={primeiroCampo}
          value={rascunho.pais}
          onChange={(e) => setRascunho({ ...rascunho, pais: e.target.value })}
        >
          <option value="">Todos</option>
          {PAISES.map((pais) => <option key={pais} value={pais}>{pais}</option>)}
        </select>

        <label htmlFor="fIdioma">Idioma</label>
        <select
          id="fIdioma"
          value={rascunho.idioma}
          onChange={(e) => setRascunho({ ...rascunho, idioma: e.target.value })}
        >
          <option value="">Todos</option>
          {IDIOMAS.map((idioma) => <option key={idioma} value={idioma}>{idioma}</option>)}
        </select>

        <span className="rotulo" id="rotuloDuracao">Duração</span>
        <div className="chips" role="radiogroup" aria-labelledby="rotuloDuracao">
          {DURACOES.map(({ id, rotulo }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={rascunho.duracao === id}
              className={`chip${rascunho.duracao === id ? ' chip--ativo' : ''}`}
              onClick={() => setRascunho({ ...rascunho, duracao: id })}
            >
              {rotulo}
            </button>
          ))}
        </div>

        <div className="sheet-acoes">
          <button
            type="button"
            className="btn btn--secundario"
            onClick={() => setRascunho({ pais: '', idioma: '', duracao: 'qualquer' })}
          >
            Limpar
          </button>
          <button type="button" className="btn btn--primario" onClick={() => onAplicar(rascunho)}>
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}
