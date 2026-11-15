import { ehUrgente, fraseDias } from '../lib/datas';

export function BadgePrazo({ dias }: { dias: number }) {
  return <span className={`badge${ehUrgente(dias) ? ' badge--urgente' : ''}`}>{fraseDias(dias)}</span>;
}
