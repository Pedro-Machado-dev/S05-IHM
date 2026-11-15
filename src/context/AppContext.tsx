import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode,
} from 'react';
import { achar, FAVORITOS_INICIAIS } from '../data/editais';
import { ir } from '../lib/rotas';
import { gravarStorage, lerStorage, removerStorage, useLocalStorage } from '../lib/storage';
import { TEMAS } from '../lib/temas';
import type { Consulta, Favorito, Lembrete, NomeTema, Sessao } from '../types';

type AcaoToast = { rotulo: string; aoAcionar: () => void };
type ToastData = { id: number; mensagem: string; acao?: AcaoToast };
type OpcoesLogin = { lembrarMatricula: boolean; manterConectado: boolean };

type Contexto = {
  tema: NomeTema;
  setTema: (tema: NomeTema) => void;

  sessao: Sessao | null;
  matriculaLembrada: string;
  entrar: (matricula: string, opcoes: OpcoesLogin) => void;
  sair: () => void;

  favoritos: Favorito[];
  ehFavorito: (id: number) => boolean;
  salvarFavorito: (id: number) => void;
  removerFavorito: (id: number) => void;
  definirLembrete: (id: number, mudancas: Partial<Lembrete>) => void;

  consulta: Consulta;
  setConsulta: (parcial: Partial<Consulta>) => void;

  toast: ToastData | null;
  mostrarToast: (mensagem: string, acao?: AcaoToast) => void;
  fecharToast: () => void;
};

const AppContext = createContext<Contexto | null>(null);

export function useApp(): Contexto {
  const contexto = useContext(AppContext);
  if (!contexto) throw new Error('useApp precisa ser usado dentro de <AppProvider>');
  return contexto;
}

const CONSULTA_INICIAL: Consulta = {
  busca: '',
  filtros: { pais: '', idioma: '', duracao: 'qualquer' },
  ordem: 'prazo',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [temaSalvo, setTema] = useLocalStorage<NomeTema>('inatel_tema', 'inatel');
  const tema: NomeTema = temaSalvo in TEMAS ? temaSalvo : 'inatel';

  const [bruto, setBruto] = useLocalStorage<Favorito[]>('inatel_favoritos', FAVORITOS_INICIAIS);
  const favoritos = useMemo(
    () => (Array.isArray(bruto) ? bruto : []).filter((f) => achar(f.id) && f.lembrete),
    [bruto]
  );

  const [sessao, setSessao] = useState<Sessao | null>(
    () => lerStorage<Sessao | null>('inatel_sessao', null) ?? lerStorage<Sessao | null>('inatel_sessao', null, 'sessao')
  );
  const [matriculaLembrada] = useState(() => lerStorage<string>('inatel_matricula', ''));

  const [consulta, setConsultaEstado] = useState<Consulta>(CONSULTA_INICIAL);
  const setConsulta = useCallback(
    (parcial: Partial<Consulta>) => setConsultaEstado((atual) => ({ ...atual, ...parcial })),
    []
  );

  /* ---------- Tema ---------- */
  useEffect(() => {
    const variaveis = TEMAS[tema];
    for (const [nome, valor] of Object.entries(variaveis)) {
      document.documentElement.style.setProperty(nome, valor);
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', variaveis['--cor-click']);
  }, [tema]);

  /* ---------- Avisos rápidos (toast) ---------- */
  const [toast, setToast] = useState<ToastData | null>(null);
  const temporizador = useRef(0);

  const fecharToast = useCallback(() => {
    window.clearTimeout(temporizador.current);
    setToast(null);
  }, []);

  const mostrarToast = useCallback((mensagem: string, acao?: AcaoToast) => {
    window.clearTimeout(temporizador.current);
    setToast({ id: Date.now(), mensagem, acao });
    temporizador.current = window.setTimeout(() => setToast(null), acao ? 6000 : 3500);
  }, []);

  /* ---------- Favoritos e lembretes ---------- */
  const ehFavorito = useCallback((id: number) => favoritos.some((f) => f.id === id), [favoritos]);

  const salvarFavorito = useCallback(
    (id: number) => {
      setBruto((lista) =>
        lista.some((f) => f.id === id) ? lista : [...lista, { id, lembrete: { ativo: false, diasAntes: 7 } }]
      );
      mostrarToast('Edital salvo nos favoritos', { rotulo: 'Ver favoritos', aoAcionar: () => ir('favoritos') });
    },
    [mostrarToast, setBruto]
  );

  const removerFavorito = useCallback(
    (id: number) => {
      const indice = favoritos.findIndex((f) => f.id === id);
      if (indice < 0) return;
      const removido = favoritos[indice];
      setBruto((lista) => lista.filter((f) => f.id !== id));
      mostrarToast(`${achar(id)?.titulo ?? 'Edital'} removido dos favoritos`, {
        rotulo: 'Desfazer',
        aoAcionar: () =>
          setBruto((lista) =>
            lista.some((f) => f.id === id) ? lista : [...lista.slice(0, indice), removido, ...lista.slice(indice)]
          ),
      });
    },
    [favoritos, mostrarToast, setBruto]
  );

  const definirLembrete = useCallback(
    (id: number, mudancas: Partial<Lembrete>) => {
      setBruto((lista) =>
        lista.map((f) => (f.id === id ? { ...f, lembrete: { ...f.lembrete, ...mudancas } } : f))
      );
    },
    [setBruto]
  );

  /* ---------- Login ---------- */
  // A senha nunca é guardada. Só a matrícula (se a pessoa pedir) e um marcador de sessão.
  const entrar = useCallback((matricula: string, { lembrarMatricula, manterConectado }: OpcoesLogin) => {
    const nova: Sessao = { matricula };
    if (lembrarMatricula) gravarStorage('inatel_matricula', matricula);
    else removerStorage('inatel_matricula');

    if (manterConectado) {
      gravarStorage('inatel_sessao', nova);
      removerStorage('inatel_sessao', 'sessao');
    } else {
      gravarStorage('inatel_sessao', nova, 'sessao');
      removerStorage('inatel_sessao');
    }
    setSessao(nova);
  }, []);

  const sair = useCallback(() => {
    removerStorage('inatel_sessao');
    removerStorage('inatel_sessao', 'sessao');
    setSessao(null);
    ir('inicio', true);
  }, []);

  const valor: Contexto = {
    tema, setTema,
    sessao, matriculaLembrada, entrar, sair,
    favoritos, ehFavorito, salvarFavorito, removerFavorito, definirLembrete,
    consulta, setConsulta,
    toast, mostrarToast, fecharToast,
  };

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}
