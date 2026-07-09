import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/products" className="text-lg font-semibold tracking-tight text-zinc-100">
          Tattoo<span className="text-red-500">Supply</span>
        </Link>
        {isAuthenticated && (
          <div className="flex items-center gap-4 text-sm">
            <Link to="/products" className="text-zinc-300 hover:text-zinc-100">
              Catálogo
            </Link>
            <Link to="/orders" className="text-zinc-300 hover:text-zinc-100">
              Meus pedidos
            </Link>
            {user?.userType === 'ADMIN' && (
              <Link to="/admin" className="text-red-400 hover:text-red-300">
                Admin
              </Link>
            )}
            <span className="hidden text-zinc-500 sm:inline">{user?.fullName}</span>
            <button
              onClick={handleLogout}
              className="rounded-md border border-zinc-700 px-3 py-1.5 text-zinc-300 hover:border-red-500 hover:text-red-400"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
