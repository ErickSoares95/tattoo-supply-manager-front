import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../api/users';
import { extractErrorMessage } from '../../api/client';
import { Navbar } from '../../components/Navbar';
import type { UpdateUserRequest } from '../../types';

export default function AdminUserFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<UpdateUserRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getUserById(Number(id))
      .then((user) =>
        setForm({
          username: user.username,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          cpf: user.cpf,
          imageUrl: user.imageUrl,
          userType: user.userType,
          userStatus: user.userStatus,
        }),
      )
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange<K extends keyof UpdateUserRequest>(field: K) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => (prev ? { ...prev, [field]: event.target.value } : prev));
    };
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!id || !form) return;

    setError(null);
    setSaving(true);
    try {
      await updateUser(Number(id), form);
      navigate('/admin/users');
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-lg px-4 py-8">
        <h1 className="text-2xl font-semibold text-zinc-100">Editar usuário</h1>

        {loading && <p className="mt-4 text-zinc-400">Carregando usuário...</p>}

        {!loading && form && (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm text-zinc-300">
              Usuário
              <input
                required
                value={form.username}
                onChange={handleChange('username')}
                className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-300">
              Nome completo
              <input
                required
                value={form.fullName}
                onChange={handleChange('fullName')}
                className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-300">
              Telefone
              <input
                value={form.phoneNumber ?? ''}
                onChange={handleChange('phoneNumber')}
                className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-300">
              Papel
              <select
                value={form.userType}
                onChange={handleChange('userType')}
                className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
              >
                <option value="CLIENT">CLIENT</option>
                <option value="ATTENDANT">ATTENDANT</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-300">
              Status
              <select
                value={form.userStatus}
                onChange={handleChange('userStatus')}
                className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="BLOCKED">BLOCKED</option>
              </select>
            </label>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="mt-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-60"
            >
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
