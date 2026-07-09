import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOrderById } from '../api/orders';
import { extractErrorMessage } from '../api/client';
import { Navbar } from '../components/Navbar';
import type { OrderResponse } from '../types';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getOrderById(Number(id))
      .then(setOrder)
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link to="/orders" className="text-sm text-zinc-400 hover:text-zinc-200">
          ← Meus pedidos
        </Link>

        {loading && <p className="mt-4 text-zinc-400">Carregando pedido...</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}

        {order && (
          <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-zinc-100">Pedido #{order.id}</h1>
              <span className="text-sm text-zinc-500">
                {new Date(order.creationDate).toLocaleString('pt-BR')}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between border-b border-zinc-800 py-2 text-sm"
                >
                  <span className="text-zinc-300">
                    {item.quantity}x {item.productName}
                  </span>
                  <span className="text-zinc-100">
                    {item.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-zinc-300">Total</span>
              <span className="text-lg font-semibold text-zinc-100">
                {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
