import { Bookmark, Clock, House, PlaneTakeoff, type LucideIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ir, type Rota } from '../lib/rotas';

type Item = { caminho: string; rotulo: string; Icone: LucideIcon; grupo: Rota['nome'][] };

const ITENS: Item[] = [
  { caminho: 'inicio', rotulo: 'Início', Icone: House, grupo: ['inicio'] },
  { caminho: 'editais', rotulo: 'Intercâmbio', Icone: PlaneTakeoff, grupo: ['editais', 'resumo'] },
  { caminho: 'favoritos', rotulo: 'Favoritos', Icone: Bookmark, grupo: ['favoritos'] },
  { caminho: 'aulas', rotulo: 'Horários', Icone: Clock, grupo: ['aulas'] },
];

export function BottomNav({ rota }: { rota: Rota }) {
  const { favoritos } = useApp();

  return (
    <nav className="nav-inferior" aria-label="Navegação principal">
      {ITENS.map(({ caminho, rotulo, Icone, grupo }) => {
        const ativo = grupo.includes(rota.nome);
        return (
          <button
            key={caminho}
            type="button"
            className="nav-item"
            aria-current={ativo ? 'page' : undefined}
            onClick={() => ir(caminho, true)}
          >
            <span className="nav-icone">
              <Icone size={22} aria-hidden="true" />
              {caminho === 'favoritos' && favoritos.length > 0 && (
                <span className="contador" aria-label={`${favoritos.length} favoritos`}>{favoritos.length}</span>
              )}
            </span>
            <span>{rotulo}</span>
          </button>
        );
      })}
    </nav>
  );
}
