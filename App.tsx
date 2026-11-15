import { useEffect, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { MenuLateral } from './components/MenuLateral';
import { Toast } from './components/Toast';
import { useApp } from './context/AppContext';
import { lerRota, useHash } from './lib/rotas';
import { Aulas } from './screens/Aulas';
import { Editais } from './screens/Editais';
import { EmBreve } from './screens/EmBreve';
import { Favoritos } from './screens/Favoritos';
import { Inicio } from './screens/Inicio';
import { Login } from './screens/Login';
import { Resumo } from './screens/Resumo';

export default function App() {
  const hash = useHash();
  const { sessao, sair } = useApp();
  const [menuAberto, setMenuAberto] = useState(false);

  // Volta ao topo a cada troca de tela
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);

  if (!sessao) {
    return (
      <div className="app">
        <Login />
        <Toast />
      </div>
    );
  }

  const rota = lerRota(hash);

  return (
    <div className="app">
      <Header
        alta={rota.nome === 'inicio'}
        onMenu={() => setMenuAberto(true)}
        onPerfil={() => {
          if (window.confirm('Deseja sair do App Inatel?')) sair();
        }}
      />

      <main className="conteudo">
        {rota.nome === 'inicio' && <Inicio />}
        {rota.nome === 'editais' && <Editais />}
        {rota.nome === 'resumo' && <Resumo id={rota.id} />}
        {rota.nome === 'favoritos' && <Favoritos />}
        {rota.nome === 'aulas' && <Aulas />}
        {rota.nome === 'breve' && <EmBreve titulo={rota.titulo} />}
      </main>

      <BottomNav rota={rota} />
      <MenuLateral aberto={menuAberto} onFechar={() => setMenuAberto(false)} />
      <Toast />
    </div>
  );
}
