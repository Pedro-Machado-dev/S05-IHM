import { Eye, EyeOff } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Logo } from '../components/Logo';
import { useApp } from '../context/AppContext';

type Erros = { matricula?: string; senha?: string };

export function Login() {
  const { entrar, matriculaLembrada, mostrarToast } = useApp();
  const [matricula, setMatricula] = useState(matriculaLembrada);
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrarMatricula, setLembrarMatricula] = useState(matriculaLembrada !== '');
  const [manterConectado, setManterConectado] = useState(false);
  const [erros, setErros] = useState<Erros>({});

  function enviar(evento: FormEvent) {
    evento.preventDefault();
    const m = matricula.trim();
    const novos: Erros = {};
    if (m.length < 3) novos.matricula = 'A matrícula deve ter de 3 a 6 caracteres.';
    if (senha.length !== 6) novos.senha = 'A senha deve ter exatamente 6 caracteres.';
    setErros(novos);
    if (Object.keys(novos).length > 0) return;
    entrar(m, { lembrarMatricula, manterConectado });
  }

  return (
    <div className="login">
      <Logo className="login-logo" />

      <form className="card" onSubmit={enviar} noValidate>
        <h1 className="login-titulo">Entrar</h1>

        <label htmlFor="matricula">Matrícula</label>
        <input
          id="matricula"
          type="text"
          maxLength={6}
          placeholder="Ex.: 805"
          autoComplete="username"
          value={matricula}
          aria-invalid={Boolean(erros.matricula)}
          aria-describedby="matricula-info"
          onChange={(e) => setMatricula(e.target.value)}
        />
        <p id="matricula-info" className={erros.matricula ? 'campo-info campo-info--erro' : 'campo-info'}>
          {erros.matricula ?? 'De 3 a 6 caracteres.'}
        </p>

        <label htmlFor="senha">Senha</label>
        <div className="campo-senha">
          <input
            id="senha"
            type={mostrarSenha ? 'text' : 'password'}
            maxLength={6}
            placeholder="••••••"
            autoComplete="current-password"
            value={senha}
            aria-invalid={Boolean(erros.senha)}
            aria-describedby="senha-info"
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            type="button"
            className="btn-icone campo-olho"
            aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            onClick={() => setMostrarSenha((v) => !v)}
          >
            {mostrarSenha ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
          </button>
        </div>
        <p id="senha-info" className={erros.senha ? 'campo-info campo-info--erro' : 'campo-info'}>
          {erros.senha ?? `Exatamente 6 caracteres (${senha.length}/6).`}
        </p>

        <label className="opcao">
          <input type="checkbox" checked={lembrarMatricula} onChange={(e) => setLembrarMatricula(e.target.checked)} />
          Lembrar minha matrícula
        </label>
        <label className="opcao">
          <input type="checkbox" checked={manterConectado} onChange={(e) => setManterConectado(e.target.checked)} />
          Manter conectado neste aparelho
        </label>

        <button type="submit" className="btn btn--primario btn--total">Entrar</button>
        <button
          type="button"
          className="link"
          onClick={() => mostrarToast('A recuperação de senha não faz parte deste protótipo.')}
        >
          Esqueci minha senha
        </button>
      </form>

      <p className="login-aviso">Protótipo: não digite sua senha real do Inatel.</p>
    </div>
  );
}
