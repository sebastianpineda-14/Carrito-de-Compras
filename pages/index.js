import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Cargar productos al inicio
  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error al cargar productos", err));
  }, []);

  // Función para agregar producto al carrito
  const addToCart = (id) => {
    fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Producto agregado:", data);
        setCart(data.cart);
      })
      .catch(err => console.error("Error al agregar al carrito", err));
  };

  // Función para ver carrito
  const viewCart = () => {
    fetch("/api/cart")
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.error("Error al cargar carrito", err));
  };

  // ✅ Función para reiniciar carrito
  const resetCart = () => {
    fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ action: "reset" }) // <-- indicamos acción "reset"
    })
      .then(res => res.json())
      .then(() => {
        setCart([]);
        console.log("Carrito reiniciado");
      })
      .catch(err => console.error("Error al reiniciar el carrito", err));
  };

  return (
    <div className="container">
      <div style={{ marginBottom: "20px" }}>
        <Link href="/cart">
          <button>Ir al carrito</button>
        </Link>
        <Link href="/best-combination">
          <button>Ir a mejor combinación</button>
        </Link>
      </div>

      <h1>Lista de Productos</h1>
      {products.map((p) => (
        <div key={p.id} className="product">
          <span>{p.name} - ${p.price}</span>
          <button onClick={() => addToCart(p.id)}>
            Agregar al carrito
          </button>
        </div>
      ))}

      <h2>Carrito</h2>
      <button onClick={viewCart}>Ver carrito</button>
      {/* ✅ Botón nuevo para reiniciar */}
      <button onClick={resetCart}>Reiniciar carrito</button>
      
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
}
