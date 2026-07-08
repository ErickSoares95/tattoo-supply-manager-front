import { useState } from 'react';
import type { ProductResponse } from '../types';

interface ProductCardProps {
  product: ProductResponse;
  onAdd: (productId: number, quantity: number) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const outOfStock = product.stock <= 0;

  return (
    <div className="flex flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div>
        <h3 className="text-base font-medium text-zinc-100">{product.name}</h3>
        <p className="mt-1 text-sm text-zinc-400">{product.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-zinc-100">
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p className="text-xs text-zinc-500">
            {outOfStock ? 'Sem estoque' : `${product.stock} em estoque`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={product.stock}
            value={quantity}
            disabled={outOfStock}
            onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
            className="w-14 rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-center text-zinc-100 disabled:opacity-50"
          />
          <button
            onClick={() => onAdd(product.id, quantity)}
            disabled={outOfStock}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-700"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
