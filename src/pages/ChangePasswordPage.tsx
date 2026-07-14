import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import * as usersApi from '../api/users';
import { extractErrorMessage } from '../api/client';

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('A confirmação não bate com a nova senha.');
      return;
    }

    setLoading(true);
    try {
      await usersApi.changePassword({ currentPassword, newPassword });
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <h1 className="text-xl font-semibold text-zinc-100">Alterar senha</h1>
        <p className="mt-1 text-sm text-zinc-400">Informe a senha atual e a nova senha.</p>

        {success && (
          <p className="mt-4 rounded-md border border-emerald-800 bg-emerald-950/50 px-3 py-2 text-sm text-emerald-300">
            Senha alterada com sucesso.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm text-zinc-300">
            Senha atual
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-zinc-300">
            Nova senha
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-zinc-300">
            Confirmar nova senha
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-60"
          >
            {loading ? 'Salvando...' : 'Salvar nova senha'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-400">
          <Link to="/products" className="text-red-400 hover:text-red-300">
            Voltar ao catálogo
          </Link>
        </p>
      </div>
    </div>
  );
}
