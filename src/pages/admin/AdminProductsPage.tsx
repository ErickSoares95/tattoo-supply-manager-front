import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct, listProducts } from '../../api/products';
import { extractErrorMessage } from '../../api/client';
import { Navbar } from '../../components/Navbar';
import type { ProductResponse } from '../../types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function loadProducts() {
    setLoading(true);
    listProducts(0, 100)
      .then((page) => setProducts(page.content))
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(product: ProductResponse) {
    if (!window.confirm(`Excluir "${product.name}"? Essa ação não pode ser desfeita.`)) {
      return;
    }

    setError(null);
    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((item) => item.id !== product.id));
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-100">Produtos</h1>
          <Link
            to="/admin/products/new"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Novo produto
          </Link>
        </div>

        {loading && <p className="mt-4 text-zinc-400">Carregando produtos...</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}

        <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Preço</th>
                <th className="px-4 py-3 font-medium">Estoque</th>
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-zinc-800">
                  <td className="px-4 py-3 text-zinc-100">{product.name}</td>
                  <td className="px-4 py-3 text-zinc-300">
                    {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{product.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="text-red-400 hover:text-red-300"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(product)}
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
