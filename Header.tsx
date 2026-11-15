import { Menu, User } from 'lucide-react';
import { Logo } from './Logo';

type Props = { alta: boolean; onMenu: () => void; onPerfil: () => void };

export function Header({ alta, onMenu, onPerfil }: Props) {
  return (
    <header className={`faixa${alta ? ' faixa--alta' : ''}`}>
      <button type="button" className="faixa-btn" aria-label="Abrir menu" onClick={onMenu}>
        <Menu size={26} aria-hidden="true" />
      </button>
      <Logo className="logo" />
      <button type="button" className="faixa-btn" aria-label="Sair do app" onClick={onPerfil}>
        <User size={26} aria-hidden="true" />
      </button>
    </header>
  );
}
