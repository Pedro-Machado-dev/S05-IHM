import {
  ChevronDown, GraduationCap, House, Library, LogOut, Palette, PlaneTakeoff, Wallet, X, Clock, type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ir } from '../lib/rotas';
import { NOMES_TEMAS } from '../lib/temas';

type Props = { aberto: boolean; onFechar: () => void };

const ITENS: { rotulo: string; caminho: string; Icone: LucideIcon }[] = [
  { rotulo: 'Início', caminho: 'inicio', Icone: House },
  { rotulo: 'Notas', caminho: 'aulas', Icone: GraduationCap },
  { rotulo: 'Horários', caminho: 'aulas', Icone: Clock },
  { rotulo: 'Financeiro', caminho: 'breve/Financeiro', Icone: Wallet },
  { rotulo: 'Intercâmbio', caminho: 'editais', Icone: PlaneTakeoff },
  { rotulo: 'Biblioteca', caminho: 'breve/Biblioteca', Icone: Library },
];

export function MenuLateral({ aberto, onFechar }: Props) {
  const { tema, setTema, sair } = useApp();
  const [temasAbertos, setTemasAbertos] = useState(false);
  const botaoFechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    botaoFechar.current?.focus();
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') onFechar();
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [aberto, onFechar]);

  if (!aberto) return null;

  const navegar = (caminho: string) => {
    onFechar();
    ir(caminho, true);
  };

  return (
    <nav id="menu_aba" aria-label="Menu principal">
      <div className="menu-topo">
        <span className="menu-titulo">Menu</span>
        <button ref={botaoFechar} type="button" className="btn-icone" aria-label="Fechar menu" onClick={onFechar}>
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      {ITENS.map(({ rotulo, caminho, Icone }) => (
        <button key={rotulo} type="button" className="menu_bot" onClick={() => navegar(caminho)}>
          <Icone size={22} aria-hidden="true" />
          {rotulo}
        </button>
      ))}

      <button
        type="button"
        className="menu_bot"
        aria-expanded={temasAbertos}
        onClick={() => setTemasAbertos((aberto) => !aberto)}
      >
        <Palette size={22} aria-hidden="true" />
        Temas
        <ChevronDown size={20} className="seta" aria-hidden="true" />
      </button>

      {temasAbertos && (
        <div className="submenu">
          {NOMES_TEMAS.map(({ id, rotulo }) => (
            <button
              key={id}
              type="button"
              className={`menu_sub${tema === id ? ' atual' : ''}`}
              aria-pressed={tema === id}
              onClick={() => {
                setTema(id);
                onFechar();
              }}
            >
              {rotulo}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        className="menu_bot"
        onClick={() => {
          onFechar();
          sair();
        }}
      >
        <LogOut size={22} aria-hidden="true" />
        Sair
      </button>
    </nav>
  );
}
