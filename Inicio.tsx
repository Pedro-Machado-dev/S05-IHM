import { AlarmClock, BellRing, Mail, PlaneTakeoff, type LucideIcon } from 'lucide-react';
import { Carrossel } from '../components/Carrossel';
import { useApp } from '../context/AppContext';
import { mensagensLembrete } from '../lib/lembretes';
import { ir } from '../lib/rotas';

type NotificacaoProps = { Icone: LucideIcon; texto: string; destaque?: boolean; aoClicar?: () => void };

function Notificacao({ Icone, texto, destaque = false, aoClicar }: NotificacaoProps) {
  const conteudo = (
    <>
      <span className="notif-icone"><Icone size={18} aria-hidden="true" /></span>
      <span>{texto}</span>
    </>
  );
  const classe = `notif${destaque ? ' notif--destaque' : ''}`;

  return (
    <li>
      {aoClicar ? (
        <button type="button" className={`${classe} notif--botao`} onClick={aoClicar}>{conteudo}</button>
      ) : (
        <div className={classe}>{conteudo}</div>
      )}
    </li>
  );
}

export function Inicio() {
  const { favoritos } = useApp();
  const lembretes = mensagensLembrete(favoritos);

  return (
    <>
      <section className="card card--sobreposto" aria-labelledby="saudacao">
        <h1 id="saudacao" className="saudacao">Olá Pedro!</h1>
        <ul className="notificacoes">
          <Notificacao Icone={BellRing} texto="Você possui um armário reservado com entrega para hoje..." />
          <Notificacao Icone={Mail} texto="Você possui uma pendência no financeiro..." />
          <Notificacao
            Icone={PlaneTakeoff}
            texto="Novos editais de intercâmbio abertos. Veja prazos..."
            aoClicar={() => ir('editais')}
          />
          {lembretes.map((mensagem) => (
            <Notificacao key={mensagem} Icone={AlarmClock} texto={mensagem} destaque aoClicar={() => ir('favoritos')} />
          ))}
        </ul>
      </section>

      <Carrossel />
    </>
  );
}
