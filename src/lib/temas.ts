import type { NomeTema } from '../types';

export const NOMES_TEMAS: { id: NomeTema; rotulo: string }[] = [
  { id: 'inatel', rotulo: 'Tema Inatel' },
  { id: 'limao', rotulo: 'Tema Limão' },
  { id: 'dark', rotulo: 'Tema Dark' },
];

export const TEMAS: Record<NomeTema, Record<string, string>> = {
  inatel: {
    '--cor-click': '#126ae2', '--cor-sombra': '#0a599b', '--cor-text': '#111111',
    '--cor-muted': '#5b6770', '--cor-back1': '#edf2f4', '--cor-card': '#ffffff',
    '--cor-borda': '#c4ccd1', '--cor-on-click': '#ffffff',
    '--cor-erro': '#c62828', '--cor-on-erro': '#ffffff',
  },
  limao: {
    '--cor-click': '#38184C', '--cor-sombra': '#9b0a59', '--cor-text': '#111111',
    '--cor-muted': '#55604a', '--cor-back1': '#CEF09D', '--cor-card': '#ffffff',
    '--cor-borda': '#b7c79a', '--cor-on-click': '#ffffff',
    '--cor-erro': '#c62828', '--cor-on-erro': '#ffffff',
  },
  dark: {
    '--cor-click': '#CEF09D', '--cor-sombra': '#9b0a59', '--cor-text': '#f2f2f2',
    '--cor-muted': '#cdbbdb', '--cor-back1': '#38184C', '--cor-card': '#4a2a63',
    '--cor-borda': '#7d5a96', '--cor-on-click': '#38184C',
    '--cor-erro': '#ff8a80', '--cor-on-erro': '#3b0a0a',
  },
};
