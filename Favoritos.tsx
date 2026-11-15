import { BellRing, Trash2 } from 'lucide-react';
import { BadgePrazo } from '../components/Badge';
import { Switch } from '../components/Switch';
import { TelaTopo } from '../components/TelaTopo';
import { useApp } from '../context/AppContext';
import { achar } from '../data/editais';
import { diasParaPrazo, pluralDias } from '../lib/datas';
import { mensagensLembrete } from '../lib/lembretes';
import { ir } from '../lib/rotas';

const ANTECEDENCIAS = [1, 3, 7, 14];

export function Favoritos() {
  const { favoritos, removerFavorito, definirLembrete } = useApp();
  const avisos = mensagensLembrete(favoritos);

  return (
    <>
      <TelaTopo titulo="Meus favoritos" semVoltar />

      {avisos.length > 0 && (
        <div className="banners">
          {avisos.map((mensagem) => (
            <div key={mensagem} className="banner">
              <BellRing size={18} aria-hidden="true" />
              <span>{mensagem}</span>
            </div>
          ))}
        </div>
      )}

      {favoritos.length === 0 ? (
        <div className="vazio">
          <p>Você ainda não salvou nenhum edital.</p>
          <button type="button" className="btn btn--primario" onClick={() => ir('editais')}>
            Ver editais
          </button>
        </div>
      ) : (
        <ul className="lista">
          {favoritos.map((favorito) => {
            const edital = achar(favorito.id);
            if (!edital) return null;
            const { lembrete } = favorito;

            return (
              <li key={edital.id} className="card fav">
                <div className="fav-topo">
                  <button type="button" className="fav-info" onClick={() => ir(`editais/${edital.id}`)}>
                    <h2>{edital.titulo}</h2>
                    <span className="fav-prazo">
                      Prazo: {edital.prazo} <BadgePrazo dias={diasParaPrazo(edital)} />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn-icone"
                    aria-label={`Remover ${edital.titulo} dos favoritos`}
                    onClick={() => removerFavorito(edital.id)}
                  >
                    <Trash2 size={20} aria-hidden="true" />
                  </button>
                </div>

                <div className="fav-lembrete">
                  <Switch
                    checked={lembrete.ativo}
                    rotulo={`Lembrete de prazo do ${edital.titulo}`}
                    onChange={(ativo) => definirLembrete(edital.id, { ativo })}
                  />
                  {lembrete.ativo ? (
                    <span>
                      Lembrar{' '}
                      <select
                        aria-label="Antecedência do lembrete"
                        value={lembrete.diasAntes}
                        onChange={(e) => definirLembrete(edital.id, { diasAntes: Number(e.target.value) })}
                      >
                        {ANTECEDENCIAS.map((n) => <option key={n} value={n}>{pluralDias(n)}</option>)}
                      </select>{' '}
                      antes
                    </span>
                  ) : (
                    <span>Lembrete desativado</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
