let cart = [];

const products = [
  { id: 1, name: "Producto 1", price: 100 },
  { id: 2, name: "Producto 2", price: 200 },
  { id: 3, name: "Producto 3", price: 60 },
  { id: 4, name: "Producto 4", price: 70 }
];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { id, action } = req.body;

    // Si se envía acción "reset", vacía el carrito
    if (action === "reset") {
      cart = [];
      return res.status(200).json({ message: "Carrito reiniciado", cart });
    }

    // Si se envía un ID, intenta agregar el producto
    const product = products.find(p => p.id === id);
    if (product) {
      cart.push(product);
      return res.status(200).json({ message: "Producto agregado", cart });
    } else {
      return res.status(400).json({ message: "Producto no encontrado" });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json(cart);
  }

  res.status(405).json({ message: "Método no permitido" });
}
