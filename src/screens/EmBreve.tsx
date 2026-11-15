import { TelaTopo } from '../components/TelaTopo';

export function EmBreve({ titulo }: { titulo: string }) {
  return (
    <>
      <TelaTopo titulo={titulo} />
      <p className="vazio">Esta área ainda não faz parte deste protótipo.</p>
    </>
  );
}
