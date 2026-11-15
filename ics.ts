import type { Edital } from '../types';
import { proximaData } from './datas';

const dois = (n: number) => String(n).padStart(2, '0');
const formatarData = (d: Date) => `${d.getFullYear()}${dois(d.getMonth() + 1)}${dois(d.getDate())}`;
const escapar = (texto: string) => texto.replace(/([,;\\])/g, '\\$1');

// Gera um arquivo .ics (evento de dia inteiro no prazo) e baixa no aparelho.
// Se houver lembrete ativo, inclui um alarme com a antecedência escolhida.
export function baixarICS(edital: Edital, diasAntes?: number) {
  const inicio = proximaData(edital.prazo);
  const fim = new Date(inicio);
  fim.setDate(fim.getDate() + 1);
  const carimbo = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const linhas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//App Inatel//S05 IHM//PT-BR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:edital-${edital.id}-${formatarData(inicio)}@app-inatel`,
    `DTSTAMP:${carimbo}`,
    `DTSTART;VALUE=DATE:${formatarData(inicio)}`,
    `DTEND;VALUE=DATE:${formatarData(fim)}`,
    `SUMMARY:${escapar(`Prazo de inscrição: ${edital.titulo}`)}`,
    `DESCRIPTION:${escapar(`${edital.cidade}, ${edital.pais} - ${edital.duracao} meses - ${edital.idioma}`)}`,
    `URL:${edital.link}`,
  ];

  if (diasAntes) {
    linhas.push(
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapar(`Prazo do ${edital.titulo} se aproxima`)}`,
      `TRIGGER:-P${diasAntes}D`,
      'END:VALARM'
    );
  }

  linhas.push('END:VEVENT', 'END:VCALENDAR');

  const blob = new Blob([linhas.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `prazo-${edital.titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
