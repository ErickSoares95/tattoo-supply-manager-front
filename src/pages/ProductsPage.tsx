import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listProducts } from '../api/products';
import { createOrder } from '../api/orders';
import { extractErrorMessage } from '../api/client';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';
import type { ProductResponse } from '../types';

interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export default function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    listProducts()
      .then((page) => setProducts(page.content))
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  function handleAdd(productId: number, quantity: number) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...prev, { productId, productName: product.name, price: product.price, quantity }];
    });
  }

  function handleRemove(productId: number) {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handlePlaceOrder() {
    setError(null);
    setSubmitting(true);
    try {
      const order = await createOrder({
        items: cart.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      });
      navigate(`/orders/${order.id}`);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 pb-28">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-zinc-100">Catálogo</h1>

        {loading && <p className="mt-4 text-zinc-400">Carregando produtos...</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="mt-4 text-zinc-400">Nenhum produto disponível no momento.</p>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={handleAdd} />
          ))}
        </div>
      </main>

      {cart.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 border-t border-zinc-800 bg-zinc-900/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4">
            <div className="flex flex-wrap gap-2">
              {cart.map((item) => (
                <span
                  key={item.productId}
                  className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-sm text-zinc-200"
                >
                  {item.quantity}x {item.productName}
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="text-zinc-500 hover:text-red-400"
                    aria-label={`Remover ${item.productName}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-zinc-100">
                Total:{' '}
                <span className="font-semibold">
                  {cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </p>
              <button
                onClick={handlePlaceOrder}
                disabled={submitting}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-60"
              >
                {submitting ? 'Enviando...' : 'Fazer pedido'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
