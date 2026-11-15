import { CalendarDays, ChevronLeft, ChevronRight, MapPin, Pause, Play, PlaneTakeoff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { EVENTOS } from '../data/avisos';
import { ir } from '../lib/rotas';

const INTERVALO = 6000;
const TOTAL = EVENTOS.length + 1; // 1º slide = atalho de Intercâmbio
// Coloque a foto em public/img/intercambio.jpg. Se não existir, aparece o fundo azul.
const FOTO_INTERCAMBIO = `${import.meta.env.BASE_URL}img/intercambio.jpg`;

export function Carrossel() {
  const [indice, setIndice] = useState(0);
  const [pausaUsuario, setPausaUsuario] = useState(false);
  const [pausaTemporaria, setPausaTemporaria] = useState(false);
  const [fotoFalhou, setFotoFalhou] = useState(false);
  const inicioX = useRef<number | null>(null);

  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rodando = !pausaUsuario && !pausaTemporaria && !reduzMovimento;

  // Troca sozinho. Reinicia a contagem quando a pessoa muda de slide manualmente.
  useEffect(() => {
    if (!rodando) return;
    const timer = window.setInterval(() => setIndice((i) => (i + 1) % TOTAL), INTERVALO);
    return () => window.clearInterval(timer);
  }, [rodando, indice]);

  const proximo = () => setIndice((i) => (i + 1) % TOTAL);
  const anterior = () => setIndice((i) => (i - 1 + TOTAL) % TOTAL);

  return (
    <section
      className="carrossel"
      aria-roledescription="carrossel"
      aria-label="Avisos"
      onMouseEnter={() => setPausaTemporaria(true)}
      onMouseLeave={() => setPausaTemporaria(false)}
      onFocus={() => setPausaTemporaria(true)}
      onBlur={() => setPausaTemporaria(false)}
    >
      <div
        className="carrossel-janela"
        onTouchStart={(e) => {
          inicioX.current = e.touches[0].clientX;
          setPausaTemporaria(true);
        }}
        onTouchEnd={(e) => {
          setPausaTemporaria(false);
          if (inicioX.current === null) return;
          const diferenca = inicioX.current - e.changedTouches[0].clientX;
          if (diferenca > 50) proximo();
          if (diferenca < -50) anterior();
          inicioX.current = null;
        }}
      >
        <div className="carrossel-trilho" style={{ transform: `translateX(-${indice * 100}%)` }}>
          <article className="aviso" inert={indice !== 0} aria-label={`1 de ${TOTAL}`}>
            <div className="aviso-foto">
              {!fotoFalhou && <img src={FOTO_INTERCAMBIO} alt="" onError={() => setFotoFalhou(true)} />}
              <div className="aviso-sombra" />
              <div className="aviso-texto aviso-texto--linha">
                <div>
                  <h3><PlaneTakeoff size={18} aria-hidden="true" /> Intercâmbio</h3>
                  <p>Editais, prazos e requisitos</p>
                </div>
                <button type="button" className="btn btn--claro btn--pequeno" onClick={() => ir('editais')}>
                  Ver editais
                </button>
              </div>
            </div>
          </article>

          {EVENTOS.map((evento, i) => (
            <article key={evento.id} className="aviso" inert={indice !== i + 1} aria-label={`${i + 2} de ${TOTAL}`}>
              <div className="aviso-foto">
                <img src={evento.image} alt="" loading="lazy" />
                <div className="aviso-sombra" />
                <div className="aviso-texto">
                  <h3>{evento.title}</h3>
                </div>
              </div>
              <div className="aviso-corpo">
                <p>{evento.description}</p>
                <p className="aviso-meta">
                  <span><CalendarDays size={14} aria-hidden="true" /> {evento.date} às {evento.time}</span>
                  <span><MapPin size={14} aria-hidden="true" /> {evento.location}</span>
                </p>
              </div>
            </article>
          ))}
        </div>

        <button type="button" className="car-seta car-seta--esq" aria-label="Aviso anterior" onClick={anterior}>
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button type="button" className="car-seta car-seta--dir" aria-label="Próximo aviso" onClick={proximo}>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="car-controles">
        {Array.from({ length: TOTAL }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`dot${i === indice ? ' dot--ativo' : ''}`}
            aria-label={`Ir para o aviso ${i + 1}`}
            aria-current={i === indice}
            onClick={() => setIndice(i)}
          />
        ))}
        <button
          type="button"
          className="car-pausa"
          aria-label={pausaUsuario ? 'Retomar troca automática' : 'Pausar troca automática'}
          onClick={() => setPausaUsuario((p) => !p)}
        >
          {pausaUsuario ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
      </div>
    </section>
  );
}
