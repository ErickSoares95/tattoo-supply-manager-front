import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';

const sections = [
  {
    to: '/admin/products',
    title: 'Produtos',
    description: 'Criar, editar e remover produtos do catálogo.',
  },
  {
    to: '/admin/users',
    title: 'Usuários',
    description: 'Gerenciar contas, promover ou bloquear usuários.',
  },
  {
    to: '/admin/notifications',
    title: 'Notificações',
    description: 'Reprocessar notificações de pedido que falharam.',
  },
];

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-zinc-100">Painel administrativo</h1>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.to}
              to={section.to}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 hover:border-red-500/60"
            >
              <h2 className="text-lg font-medium text-zinc-100">{section.title}</h2>
              <p className="mt-1 text-sm text-zinc-400">{section.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
