import { achar } from '../data/editais';
import type { Favorito } from '../types';
import { diasParaPrazo, fraseDias } from './datas';

// Só gera aviso quando o prazo está dentro da antecedência escolhida no lembrete.
export function mensagensLembrete(favoritos: Favorito[]): string[] {
  return favoritos
    .filter((f) => f.lembrete.ativo)
    .flatMap((f) => {
      const edital = achar(f.id);
      if (!edital) return [];
      const dias = diasParaPrazo(edital);
      return dias <= f.lembrete.diasAntes ? [{ dias, titulo: edital.titulo }] : [];
    })
    .sort((a, b) => a.dias - b.dias)
    .map(({ dias, titulo }) =>
      dias === 0 ? `Hoje é o último dia do prazo do ${titulo}` : `${fraseDias(dias)} para o prazo do ${titulo}`
    );
}
