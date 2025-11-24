/**
 * Componente Header
 * Muestra el logo, título y contador del carrito
 */
function Header({ cartCount }) {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo y Título */}
        <div>
          <h1 className="text-4xl font-bold">♪ Music Store</h1>
          <p className="text-purple-100 text-sm">AWS + FastAPI Demo</p>
        </div>

        {/* Contador del Carrito */}
        <div className="text-right">
          <div className="text-sm text-purple-100">Carrito</div>
          <div className="text-3xl font-bold">🛒 {cartCount}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;