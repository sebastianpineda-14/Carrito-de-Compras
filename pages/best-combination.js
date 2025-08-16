import { useState } from "react";
import Link from "next/link";

// Función para encontrar la mejor combinación de productos
function findBestCombination(products, budget) {
  let best = [];
  let bestTotal = 0;

  // Usamos un enfoque simple probando todas las combinaciones
  const totalComb = 1 << products.length; // 2^n combinaciones
  for (let mask = 0; mask < totalComb; mask++) {
    let current = [];
    let sum = 0;

    for (let i = 0; i < products.length; i++) {
      if (mask & (1 << i)) {
        sum += products[i].price;
        current.push(products[i]);
      }
    }

    if (sum <= budget && sum > bestTotal) {
      best = current;
      bestTotal = sum;
    }
  }

  return best;
}

export default function BestCombinationPage() {
  const [budget, setBudget] = useState(150);
  const products = [
    { id: 1, name: "Producto 1", price: 60 },
    { id: 2, name: "Producto 2", price: 100 },
    { id: 3, name: "Producto 3", price: 120 },
    { id: 4, name: "Producto 4", price: 70 }
  ];

  const result = findBestCombination(products, budget);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Mejor combinación de productos</h1>
      <p>
        Presupuesto actual: <strong>${budget}</strong>
      </p>

      <ul>
        {result.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>

      <p>
        Total: $
        {result.reduce((acc, p) => acc + p.price, 0)}
      </p>

      <Link href="/">
        <button style={{ marginTop: "20px" }}>Volver a productos</button>
      </Link>
    </div>
  );
}
