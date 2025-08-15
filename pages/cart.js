import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  // Cargar carrito al entrar a la página
  useEffect(() => {
    fetch("/api/cart")
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.error("Error al cargar carrito", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
      <Link href="/">
        <button style={{ marginTop: "20px" }}>Volver a productos</button>
      </Link>
    </div>
  );
}
