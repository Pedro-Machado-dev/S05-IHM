import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CardEdital } from '../components/CardEdital';
import { FiltrosSheet } from '../components/FiltrosSheet';
import { TelaTopo } from '../components/TelaTopo';
import { useApp } from '../context/AppContext';
import { EDITAIS } from '../data/editais';
import { diasParaPrazo } from '../lib/datas';
import type { Edital, Filtros, Ordenacao } from '../types';

const norm = (texto: string) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function passa(edital: Edital, busca: string, filtros: Filtros): boolean {
  if (filtros.pais && edital.pais !== filtros.pais) return false;
  if (filtros.idioma && edital.idioma !== filtros.idioma) return false;
  if (filtros.duracao === 'ate6' && edital.duracao > 6) return false;
  if (filtros.duracao === '12' && edital.duracao !== 12) return false;
  if (busca) {
    const alvo = norm(`${edital.titulo} ${edital.cidade} ${edital.pais} ${edital.idioma}`);
    if (!alvo.includes(norm(busca))) return false;
  }
  return true;
}

function comparar(ordem: Ordenacao) {
  return (a: Edital, b: Edital) =>
    ordem === 'duracao'
      ? a.duracao - b.duracao || diasParaPrazo(a) - diasParaPrazo(b)
      : diasParaPrazo(a) - diasParaPrazo(b);
}

export function Editais() {
  const { consulta, setConsulta } = useApp();
  const { busca, filtros, ordem } = consulta;
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);

  const lista = useMemo(
    () => EDITAIS.filter((edital) => passa(edital, busca, filtros)).sort(comparar(ordem)),
    [busca, filtros, ordem]
  );

  const chips: { chave: string; rotulo: string; remover: () => void }[] = [];
  if (filtros.pais) chips.push({ chave: 'pais', rotulo: filtros.pais, remover: () => setConsulta({ filtros: { ...filtros, pais: '' } }) });
  if (filtros.idioma) chips.push({ chave: 'idioma', rotulo: filtros.idioma, remover: () => setConsulta({ filtros: { ...filtros, idioma: '' } }) });
  if (filtros.duracao !== 'qualquer') {
    chips.push({
      chave: 'duracao',
      rotulo: filtros.duracao === 'ate6' ? '≤ 6 meses' : '12 meses',
      remover: () => setConsulta({ filtros: { ...filtros, duracao: 'qualquer' } }),
    });
  }

  return (
    <>
      <TelaTopo titulo="Intercâmbio" semVoltar />

      <div className="busca">
        <div className="campo-busca">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar edital"
            aria-label="Buscar edital"
            value={busca}
            onChange={(e) => setConsulta({ busca: e.target.value })}
          />
        </div>
        <button type="button" className="btn btn--secundario" onClick={() => setFiltrosAbertos(true)}>
          <SlidersHorizontal size={18} aria-hidden="true" />
          Filtrar
          {chips.length > 0 && <span className="contador">{chips.length}</span>}
        </button>
      </div>

      {chips.length > 0 && (
        <ul className="chips-ativos" aria-label="Filtros ativos">
          {chips.map(({ chave, rotulo, remover }) => (
            <li key={chave}>
              <button type="button" className="chip-remover" onClick={remover} aria-label={`Remover filtro ${rotulo}`}>
                {rotulo}
                <X size={14} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="resultado-topo">
        <p className="contagem" aria-live="polite">
          {lista.length === 1 ? '1 resultado' : `${lista.length} resultados`}
        </p>
        <label className="ordem">
          Ordenar por
          <select value={ordem} onChange={(e) => setConsulta({ ordem: e.target.value as Ordenacao })}>
            <option value="prazo">Prazo</option>
            <option value="duracao">Duração</option>
          </select>
        </label>
      </div>

      {lista.length > 0 ? (
        <ul className="lista">
          {lista.map((edital) => <CardEdital key={edital.id} edital={edital} />)}
        </ul>
      ) : (
        <div className="vazio">
          <p>Nenhum edital encontrado com esses filtros.</p>
          <button
            type="button"
            className="btn btn--secundario"
            onClick={() => setConsulta({ busca: '', filtros: { pais: '', idioma: '', duracao: 'qualquer' } })}
          >
            Limpar busca e filtros
          </button>
        </div>
      )}

      {filtrosAbertos && (
        <FiltrosSheet
          filtros={filtros}
          onFechar={() => setFiltrosAbertos(false)}
          onAplicar={(novos) => {
            setConsulta({ filtros: novos });
            setFiltrosAbertos(false);
          }}
        />
      )}
    </>
  );
}
