import { useState } from "react";
import ListaPedidos from "./components/ListaPedidos";
import DetalhePedido from "./components/DetalhePedido";
import "./App.css";

function App() {
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  function selecionarPedido(pedidoId) {
    setPedidoSelecionado(pedidoId);
  }

  return (
    <div className="container">
      <h1>Pedidos LIFT</h1>
      
      <div className="pedidos-card">
        <h2>Lista de Pedidos</h2>
        <ListaPedidos onSelecionar={selecionarPedido} />
      </div>
      
      {pedidoSelecionado !== null && (
        <div className="detalhe-card">
          <DetalhePedido pedidoId={pedidoSelecionado} />
        </div>
      )}
    </div>
  );
}

export default App;