import { useState } from 'react';
import { reprocessNotifications } from '../../api/notifications';
import { extractErrorMessage } from '../../api/client';
import { Navbar } from '../../components/Navbar';

export default function AdminNotificationsPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleReprocess() {
    setStatus('loading');
    setError(null);
    try {
      await reprocessNotifications();
      setStatus('success');
    } catch (err) {
      setError(extractErrorMessage(err));
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-lg px-4 py-8">
        <h1 className="text-2xl font-semibold text-zinc-100">Notificações</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Notificações de pedido que falharam em todas as tentativas automáticas ficam
          pendentes de reprocessamento. Não há uma lista disponível — o botão abaixo
          dispara uma nova tentativa pra todas elas de uma vez.
        </p>

        <button
          onClick={handleReprocess}
          disabled={status === 'loading'}
          className="mt-6 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-60"
        >
          {status === 'loading' ? 'Reprocessando...' : 'Reprocessar notificações falhadas'}
        </button>

        {status === 'success' && (
          <p className="mt-4 rounded-md border border-emerald-800 bg-emerald-950/50 px-3 py-2 text-sm text-emerald-300">
            Reprocessamento disparado com sucesso.
          </p>
        )}
        {status === 'error' && error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      </main>
    </div>
  );
}
