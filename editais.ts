import type { Edital, Favorito } from '../types';

export const REQUISITOS = [
  'Coeficiente de rendimento mínimo',
  'Proficiência no idioma',
  'Carta de motivação',
];

const LINK_EDITAL = 'https://inatel.br'; // troque pelo link real de cada edital

// Dados fictícios, só para o protótipo.
export const EDITAIS: Edital[] = [
  { id: 1, titulo: 'Edital Portugal', pais: 'Portugal', cidade: 'Porto', duracao: 6, idioma: 'Português', prazo: '15/11', link: LINK_EDITAL },
  { id: 2, titulo: 'Edital Canadá', pais: 'Canadá', cidade: 'Toronto', duracao: 12, idioma: 'Inglês', prazo: '30/11', link: LINK_EDITAL },
  { id: 3, titulo: 'Edital Alemanha', pais: 'Alemanha', cidade: 'Berlim', duracao: 6, idioma: 'Inglês', prazo: '11/12', link: LINK_EDITAL },
  { id: 4, titulo: 'Edital Espanha', pais: 'Espanha', cidade: 'Madri', duracao: 6, idioma: 'Espanhol', prazo: '20/12', link: LINK_EDITAL },
  { id: 5, titulo: 'Edital França', pais: 'França', cidade: 'Paris', duracao: 12, idioma: 'Francês', prazo: '10/01', link: LINK_EDITAL },
  { id: 6, titulo: 'Edital Itália', pais: 'Itália', cidade: 'Milão', duracao: 6, idioma: 'Italiano', prazo: '25/01', link: LINK_EDITAL },
  { id: 7, titulo: 'Edital Irlanda', pais: 'Irlanda', cidade: 'Dublin', duracao: 6, idioma: 'Inglês', prazo: '05/02', link: LINK_EDITAL },
  { id: 8, titulo: 'Edital Holanda', pais: 'Holanda', cidade: 'Amsterdã', duracao: 12, idioma: 'Inglês', prazo: '20/02', link: LINK_EDITAL },
  { id: 9, titulo: 'Edital Estados Unidos', pais: 'Estados Unidos', cidade: 'Boston', duracao: 12, idioma: 'Inglês', prazo: '10/03', link: LINK_EDITAL },
  { id: 10, titulo: 'Edital Austrália', pais: 'Austrália', cidade: 'Sydney', duracao: 12, idioma: 'Inglês', prazo: '25/03', link: LINK_EDITAL },
  { id: 11, titulo: 'Edital Japão', pais: 'Japão', cidade: 'Tóquio', duracao: 12, idioma: 'Japonês', prazo: '15/04', link: LINK_EDITAL },
  { id: 12, titulo: 'Edital Coreia do Sul', pais: 'Coreia do Sul', cidade: 'Seul', duracao: 6, idioma: 'Coreano', prazo: '30/04', link: LINK_EDITAL },
];

export const achar = (id: number) => EDITAIS.find((edital) => edital.id === id);

// Começa com Portugal (lembrete ativo) e Canadá (desativado), como no wireframe.
// Para começar sem favoritos, troque por [].
export const FAVORITOS_INICIAIS: Favorito[] = [
  { id: 1, lembrete: { ativo: true, diasAntes: 7 } },
  { id: 2, lembrete: { ativo: false, diasAntes: 7 } },
];
