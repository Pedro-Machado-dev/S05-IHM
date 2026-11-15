import { TelaTopo } from '../components/TelaTopo';
import aulasJson from '../data/aulas.json';
import type { Aula } from '../types';

const aulas: Aula[] = aulasJson;
const DIA_DEMO = 'ter'; // o JSON de exemplo só tem aulas de terça

function classeNota(nota: number) {
  if (nota >= 8) return 'nota--boa';
  if (nota >= 6) return 'nota--media';
  return 'nota--baixa';
}

export function Aulas() {
  const doDia = aulas.filter((aula) => aula.data === DIA_DEMO);

  return (
    <>
      <TelaTopo titulo="Aulas e notas" />
      <ul className="lista">
        {doDia.map((aula) => (
          <li key={aula.id} className="card aula">
            {aula.prova_alert && <p className="aula-prova">Prova: <b>{aula.prova}</b></p>}
            <h2>{aula.disciplina}</h2>
            <p>Local e horário: <b>{aula.local} - {aula.horario}</b></p>
            <div className="aula-selos">
              <span className="selo">Faltas: <b>{aula.frequencia}</b></span>
              <span className={`selo ${classeNota(parseFloat(aula.nota))}`}>CR: <b>{aula.nota}</b></span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
