import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataType, setDataType] = useState("products");

  async function loadProducts() {
    setDataType("products");
    setLoading(true);
    setError("");
    setItems([]);

    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Erro ao buscar produtos");
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadUsers() {
    setDataType("users");
    setLoading(true);
    setError("");
    setItems([]);

    try {
      const response = await fetch("https://fakestoreapi.com/users");
      if (!response.ok) throw new Error("Erro ao buscar usuários");
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>FakeStore</h1>

      <div className="buttons">
        <button
          className={dataType === "products" ? "active" : ""}
          onClick={loadProducts}
        >
          Produtos
        </button>
        <button
          className={dataType === "users" ? "active" : ""}
          onClick={loadUsers}
        >
          Usuários
        </button>
      </div>

      {loading && <p className="loading">Carregando...</p>}
      {error && <div className="error">❌ {error}</div>}

      <div className="items">
        {items.map((item) => (
          <div className="item" key={item.id}>
            {dataType === "products" ? (
              <>
                <div className="image-box">
                  <img src={item.image} alt={item.title} />
                </div>

                <h3 className="title">{item.title}</h3>

                <span className="category">{item.category}</span>

                <p className="description">
                  {item.description.substring(0, 90)}...
                </p>

                <div className="price-box">
                  ${item.price.toFixed(2)}
                </div>
              </>
            ) : (
              <>
                <div className="user-avatar">
                  {item.name.firstname[0]}
                  {item.name.lastname[0]}
                </div>

                <h3 className="user-name">
                  {item.name.firstname} {item.name.lastname}
                </h3>

                <span className="user-username">@{item.username}</span>

                <div className="user-info">
                  <p>📧 {item.email}</p>
                  <p>📱 {item.phone}</p>
                  <p>📍 {item.address.city}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
