import type { Edital } from '../types';

function hojeSemHora(): Date {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return hoje;
}

// O prazo é guardado como dd/mm e o app usa a próxima ocorrência dessa data,
// assim o protótipo nunca fica com edital "vencido".
export function proximaData(ddmm: string): Date {
  const [dia, mes] = ddmm.split('/').map(Number);
  const hoje = hojeSemHora();
  let data = new Date(hoje.getFullYear(), mes - 1, dia);
  if (data < hoje) data = new Date(hoje.getFullYear() + 1, mes - 1, dia);
  return data;
}

export function diasParaPrazo(edital: Edital): number {
  return Math.round((proximaData(edital.prazo).getTime() - hojeSemHora().getTime()) / 86400000);
}

export function fraseDias(dias: number): string {
  if (dias === 0) return 'Termina hoje';
  if (dias === 1) return 'Falta 1 dia';
  return `Faltam ${dias} dias`;
}

export const ehUrgente = (dias: number) => dias <= 14;

export const pluralDias = (n: number) => `${n} ${n === 1 ? 'dia' : 'dias'}`;
