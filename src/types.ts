// Tipos baseados no diagrama de classes da atividade (Edital, Requisito, Lembrete, Favorito, Filtro)

export type Edital = {
  id: number;
  titulo: string;
  pais: string;
  cidade: string;
  duracao: number; // meses
  idioma: string;
  prazo: string; // dd/mm
  link: string;
};

export type Lembrete = { ativo: boolean; diasAntes: number };
export type Favorito = { id: number; lembrete: Lembrete };

export type DuracaoFiltro = 'qualquer' | 'ate6' | '12';
export type Filtros = { pais: string; idioma: string; duracao: DuracaoFiltro };
export type Ordenacao = 'prazo' | 'duracao';
export type Consulta = { busca: string; filtros: Filtros; ordem: Ordenacao };

export type NomeTema = 'inatel' | 'limao' | 'dark';
export type Sessao = { matricula: string };

export type Aula = {
  id: number;
  disciplina: string;
  data: string;
  horario: string;
  local: string;
  prova_alert: boolean;
  prova: string;
  frequencia: string;
  nota: string;
};
