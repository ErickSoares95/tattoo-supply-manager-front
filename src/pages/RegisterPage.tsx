import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authApi from '../api/auth';
import { extractErrorMessage } from '../api/client';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(field: keyof RegisterForm) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authApi.register(form);
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <h1 className="text-xl font-semibold text-zinc-100">Criar conta</h1>
        <p className="mt-1 text-sm text-zinc-400">Toda conta nova começa como cliente.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm text-zinc-300">
            Nome completo
            <input
              required
              minLength={3}
              value={form.fullName}
              onChange={handleChange('fullName')}
              className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-zinc-300">
            Usuário
            <input
              required
              minLength={3}
              value={form.username}
              onChange={handleChange('username')}
              className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-zinc-300">
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={handleChange('email')}
              className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-zinc-300">
            Senha
            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={handleChange('password')}
              className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-60"
          >
            {loading ? 'Criando...' : 'Criar conta'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-400">
          Já tem conta?{' '}
          <Link to="/login" className="text-red-400 hover:text-red-300">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
