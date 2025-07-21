import { useEffect, useState } from "react";
import { getPedido, getItensPedido, getCliente, getProduto } from "../services/api";

function DetalhePedido({ pedidoId }) {
  const [pedido, setPedido] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDetalhes();
  }, [pedidoId]);

  async function carregarDetalhes() {
    setCarregando(true);
    
    const dadosPedido = await getPedido(pedidoId);
    const dadosCliente = await getCliente(dadosPedido.cliente);
    const itensPedido = await getItensPedido(pedidoId);
    
    const itensCompletos = [];
    let totalPedido = 0;
    
    for (let i = 0; i < itensPedido.length; i++) {
      const item = itensPedido[i];
      const produto = await getProduto(item.produto);
      const totalItem = produto.valor * item.quantidade;
      totalPedido = totalPedido + totalItem;
      
      itensCompletos.push({
        codigo: item.produto,
        nome: produto.nome,
        valor: produto.valor,
        quantidade: item.quantidade,
        total: totalItem
      });
    }
    
    setPedido({ ...dadosPedido, total: totalPedido });
    setCliente(dadosCliente);
    setItens(itensCompletos);
    setCarregando(false);
  }

  if (carregando) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div>
      <h2>Pedido #{pedidoId}</h2>
      
      <div className="cliente-info">
        <p><strong>Nome:</strong> {cliente.nome}</p>
        <p><strong>CPF:</strong> {cliente.cpf}</p>
        <p><strong>Email:</strong> {cliente.email}</p>
        <p><strong>Data:</strong> {pedido.data}</p>
      </div>

      <h3>Itens</h3>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Produto</th>
            <th>Valor</th>
            <th>Qtd</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item, index) => (
            <tr key={index}>
              <td>{item.codigo}</td>
              <td>{item.nome}</td>
              <td className="valor-monetario">R$ {item.valor.toFixed(2)}</td>
              <td>{item.quantidade}</td>
              <td className="valor-monetario">R$ {item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-pedido">
        <h4>Total: R$ {pedido.total.toFixed(2)}</h4>
      </div>
    </div>
  );
}

export default DetalhePedido;