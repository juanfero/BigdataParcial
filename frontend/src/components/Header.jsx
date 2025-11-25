/**
 * Componente Header
 * Muestra el logo, título y contador del carrito
 */
function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo y Título */}
        <div className="header-left">
          <h1>♪ Music Store</h1>
          <p>AWS + FastAPI Demo</p>
        </div>

        {/* Contador del Carrito */}
        <div className="header-right">
          <div className="header-right-label">Carrito</div>
          <div className="header-right-count">🛒 {cartCount}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;