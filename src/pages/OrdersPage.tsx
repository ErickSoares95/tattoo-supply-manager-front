import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listOrders } from '../api/orders';
import { extractErrorMessage } from '../api/client';
import { Navbar } from '../components/Navbar';
import type { OrderResponse } from '../types';

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listOrders()
      .then((page) => setOrders(page.content))
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-zinc-100">Meus pedidos</h1>

        {loading && <p className="mt-4 text-zinc-400">Carregando pedidos...</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p className="mt-4 text-zinc-400">Você ainda não fez nenhum pedido.</p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 hover:border-red-500/60"
            >
              <div>
                <p className="text-zinc-100">Pedido #{order.id}</p>
                <p className="text-sm text-zinc-500">
                  {new Date(order.creationDate).toLocaleString('pt-BR')} · {order.items.length} item(ns)
                </p>
              </div>
              <p className="font-semibold text-zinc-100">
                {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
