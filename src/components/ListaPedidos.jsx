import { useEffect, useState } from "react";
import { getPedidos, getCliente, getItensPedido, getProduto } from "../services/api";

function ListaPedidos({ onSelecionar }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function carregarPedidos() {
    const lista = await getPedidos();
    const pedidosCompletos = [];

    for (let i = 0; i < lista.length; i++) {
      const pedido = lista[i];
      const cliente = await getCliente(pedido.cliente);
      const itens = await getItensPedido(pedido.id);
      
      let total = 0;
      for (let j = 0; j < itens.length; j++) {
        const produto = await getProduto(itens[j].produto);
        total = total + (produto.valor * itens[j].quantidade);
      }
      
      pedidosCompletos.push({
        id: pedido.id,
        cliente: pedido.cliente,
        data: pedido.data,
        clienteNome: cliente.nome,
        valor_total: total
      });
    }
    
    setPedidos(pedidosCompletos);
  }

  function clicarPedido(pedidoId) {
    onSelecionar(pedidoId);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Pedido</th>
          <th>Cliente</th>
          <th>Data</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((pedido) => (
          <tr key={pedido.id} onClick={() => clicarPedido(pedido.id)}>
            <td>#{pedido.id}</td>
            <td>{pedido.clienteNome}</td>
            <td>{pedido.data}</td>
            <td className="valor-monetario">R$ {pedido.valor_total.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaPedidos;