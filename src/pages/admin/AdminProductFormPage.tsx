import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../../api/products';
import { extractErrorMessage } from '../../api/client';
import { Navbar } from '../../components/Navbar';
import type { ProductPayload } from '../../types';

const emptyForm: ProductPayload = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
};

export default function AdminProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<ProductPayload>(emptyForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getProductById(Number(id))
      .then((product) =>
        setForm({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
        }),
      )
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(field: keyof ProductPayload) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = field === 'price' || field === 'stock' ? Number(event.target.value) : event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSaving(true);
    try {
      if (isEditing) {
        await updateProduct(Number(id), form);
      } else {
        await createProduct(form);
      }
      navigate('/admin/products');
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
        <h1 className="text-2xl font-semibold text-zinc-100">
          {isEditing ? 'Editar produto' : 'Novo produto'}
        </h1>

        {loading && <p className="mt-4 text-zinc-400">Carregando produto...</p>}

        {!loading && (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm text-zinc-300">
              Nome
              <input
                required
                value={form.name}
                onChange={handleChange('name')}
                className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-300">
              Descrição
              <textarea
                required
                minLength={10}
                rows={3}
                value={form.description}
                onChange={handleChange('description')}
                className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-300">
              Preço (R$)
              <input
                type="number"
                required
                min={0.01}
                step={0.01}
                value={form.price}
                onChange={handleChange('price')}
                className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-300">
              Estoque
              <input
                type="number"
                required
                min={0}
                value={form.stock}
                onChange={handleChange('stock')}
                className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
              />
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
