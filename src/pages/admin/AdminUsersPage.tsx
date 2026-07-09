import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, listUsers } from '../../api/users';
import { extractErrorMessage } from '../../api/client';
import { Navbar } from '../../components/Navbar';
import type { UserResponse } from '../../types';

function StatusBadge({ status }: { status: UserResponse['userStatus'] }) {
  const isActive = status === 'ACTIVE';
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        isActive
          ? 'bg-emerald-950 text-emerald-300'
          : 'bg-zinc-800 text-zinc-400'
      }`}
    >
      {isActive ? 'Ativo' : 'Bloqueado'}
    </span>
  );
}

function TypeBadge({ type }: { type: UserResponse['userType'] }) {
  return (
    <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs font-medium text-zinc-300">
      {type}
    </span>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function loadUsers() {
    setLoading(true);
    listUsers(0, 100)
      .then((page) => setUsers(page.content))
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleDelete(user: UserResponse) {
    if (!window.confirm(`Excluir a conta de "${user.fullName}"? Essa ação não pode ser desfeita.`)) {
      return;
    }

    setError(null);
    try {
      await deleteUser(user.id);
      setUsers((prev) => prev.filter((item) => item.id !== user.id));
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-zinc-100">Usuários</h1>

        {loading && <p className="mt-4 text-zinc-400">Carregando usuários...</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}

        <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Papel</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-zinc-800">
                  <td className="px-4 py-3 text-zinc-100">{user.fullName}</td>
                  <td className="px-4 py-3 text-zinc-300">{user.email}</td>
                  <td className="px-4 py-3">
                    <TypeBadge type={user.userType} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={user.userStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/users/${user.id}/edit`}
                        className="text-red-400 hover:text-red-300"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(user)}
                        className="text-zinc-400 hover:text-red-400"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
