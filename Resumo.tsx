import { Bookmark, CalendarPlus, ExternalLink, GraduationCap, Share2 } from 'lucide-react';
import { BadgePrazo } from '../components/Badge';
import { Switch } from '../components/Switch';
import { TelaTopo } from '../components/TelaTopo';
import { useApp } from '../context/AppContext';
import { achar, REQUISITOS } from '../data/editais';
import { diasParaPrazo, pluralDias } from '../lib/datas';
import { baixarICS } from '../lib/ics';

export function Resumo({ id }: { id: number }) {
  const { favoritos, salvarFavorito, removerFavorito, definirLembrete, mostrarToast } = useApp();
  const edital = achar(id);

  if (!edital) {
    return (
      <>
        <TelaTopo titulo="Resumo do edital" voltarPara="editais" />
        <p className="vazio">Edital não encontrado.</p>
      </>
    );
  }

  const dias = diasParaPrazo(edital);
  const favorito = favoritos.find((f) => f.id === edital.id);

  async function compartilhar() {
    if (!edital) return;
    const url = `${window.location.origin}${window.location.pathname}#/editais/${edital.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: edital.titulo,
          text: `${edital.titulo}: inscrições até ${edital.prazo}`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        mostrarToast('Link do edital copiado');
      }
    } catch (erro) {
      if ((erro as DOMException).name !== 'AbortError') mostrarToast('Não foi possível compartilhar o edital');
    }
  }

  return (
    <>
      <TelaTopo titulo="Resumo do edital" voltarPara="editais" />

      <div className="hero">
        <GraduationCap size={40} aria-hidden="true" />
        <span>{edital.cidade}, {edital.pais}</span>
      </div>

      <section className="card" aria-labelledby="edital-titulo">
        <h2 id="edital-titulo">{edital.titulo}</h2>
        <div className="linha">
          <span>Prazo: <b>{edital.prazo}</b></span>
          <BadgePrazo dias={dias} />
        </div>
        <div className="linha"><span>Duração: <b>{edital.duracao} meses</b></span></div>
        <div className="linha"><span>Destino: <b>{edital.cidade}, {edital.pais}</b></span></div>
        <div className="linha"><span>Idioma: <b>{edital.idioma}</b></span></div>

        <h3>Requisitos</h3>
        <ul className="requisitos">
          {REQUISITOS.map((requisito) => <li key={requisito}>{requisito}</li>)}
        </ul>
      </section>

      <div className="acoes-resumo">
        <button
          type="button"
          className="btn btn--primario"
          onClick={() => (favorito ? removerFavorito(edital.id) : salvarFavorito(edital.id))}
        >
          <Bookmark size={18} fill={favorito ? 'currentColor' : 'none'} aria-hidden="true" />
          {favorito ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
        </button>

        <a className="btn btn--secundario" href={edital.link} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={18} aria-hidden="true" />
          Ver edital completo
        </a>

        <div className="acoes-linha">
          <button
            type="button"
            className="btn btn--secundario"
            onClick={() => {
              baixarICS(edital, favorito?.lembrete.ativo ? favorito.lembrete.diasAntes : undefined);
              mostrarToast('Arquivo do calendário baixado');
            }}
          >
            <CalendarPlus size={18} aria-hidden="true" />
            Adicionar ao calendário
          </button>
          <button type="button" className="btn btn--secundario" onClick={compartilhar}>
            <Share2 size={18} aria-hidden="true" />
            Compartilhar
          </button>
        </div>
      </div>

      {favorito && (
        <label className="card linha-switch">
          <Switch
            checked={favorito.lembrete.ativo}
            rotulo="Lembrete de prazo"
            onChange={(ativo) => {
              definirLembrete(edital.id, { ativo });
              mostrarToast(ativo ? 'Lembrete ativado' : 'Lembrete desativado');
            }}
          />
          <span>Lembrar {pluralDias(favorito.lembrete.diasAntes)} antes do prazo</span>
        </label>
      )}
    </>
  );
}
