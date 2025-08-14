let cart = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;
    cart.push(id);
    return res.status(200).json({ message: "Producto agregado", cart });
  }

  if (req.method === "GET") {
    return res.status(200).json(cart);
  }

  res.status(405).json({ message: "Método no permitido" });
}