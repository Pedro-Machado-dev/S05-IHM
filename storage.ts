import { useEffect, useState } from 'react';

type Tipo = 'local' | 'sessao';

const area = (tipo: Tipo) => (tipo === 'local' ? window.localStorage : window.sessionStorage);

export function lerStorage<T>(chave: string, padrao: T, tipo: Tipo = 'local'): T {
  try {
    const valor = area(tipo).getItem(chave);
    return valor === null ? padrao : (JSON.parse(valor) as T);
  } catch {
    return padrao;
  }
}

export function gravarStorage(chave: string, valor: unknown, tipo: Tipo = 'local') {
  try {
    area(tipo).setItem(chave, JSON.stringify(valor));
  } catch {
    // sem armazenamento disponível: o app continua funcionando só durante a sessão
  }
}

export function removerStorage(chave: string, tipo: Tipo = 'local') {
  try {
    area(tipo).removeItem(chave);
  } catch {
    // ignora
  }
}

export function useLocalStorage<T>(chave: string, inicial: T) {
  const [valor, setValor] = useState<T>(() => lerStorage(chave, inicial));
  useEffect(() => {
    gravarStorage(chave, valor);
  }, [chave, valor]);
  return [valor, setValor] as const;
}
