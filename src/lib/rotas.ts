import { useSyncExternalStore } from 'react';

export type Rota =
  | { nome: 'inicio' }
  | { nome: 'editais' }
  | { nome: 'resumo'; id: number }
  | { nome: 'favoritos' }
  | { nome: 'aulas' }
  | { nome: 'breve'; titulo: string };

export function lerRota(hash: string): Rota {
  const partes = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  switch (partes[0]) {
    case 'editais':
      return partes[1] ? { nome: 'resumo', id: Number(partes[1]) } : { nome: 'editais' };
    case 'favoritos':
      return { nome: 'favoritos' };
    case 'aulas':
      return { nome: 'aulas' };
    case 'breve':
      return { nome: 'breve', titulo: decodeURIComponent(partes[1] ?? 'Em breve') };
    default:
      return { nome: 'inicio' };
  }
}

function assinar(aviso: () => void) {
  window.addEventListener('popstate', aviso);
  window.addEventListener('hashchange', aviso);
  window.addEventListener('rota', aviso);
  return () => {
    window.removeEventListener('popstate', aviso);
    window.removeEventListener('hashchange', aviso);
    window.removeEventListener('rota', aviso);
  };
}

export function useHash(): string {
  return useSyncExternalStore(assinar, () => window.location.hash);
}

// Navega sem recarregar. "substituir" troca a entrada atual do histórico (usado nas abas).
export function ir(caminho: string, substituir = false) {
  const url = `#/${caminho}`;
  if (substituir) window.history.replaceState(window.history.state, '', url);
  else window.history.pushState({ interno: true }, '', url);
  window.dispatchEvent(new Event('rota'));
}

// Volta uma tela. Se a página foi aberta direto por um link, vai para a tela padrão.
export function voltar(padrao = 'inicio') {
  if (window.history.state?.interno) window.history.back();
  else ir(padrao, true);
}
