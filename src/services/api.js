const API_URL = "https://sistemalift1.com.br/lift_ps/api";

async function getPedidos() {
  const response = await fetch(API_URL + "/Pedidos");
  const data = await response.json();
  return data;
}

async function getPedido(id) {
  const response = await fetch(API_URL + "/Pedidos/" + id);
  const data = await response.json();
  return data;
}

async function getItensPedido(pedidoId) {
  const response = await fetch(API_URL + "/ItensPedido/" + pedidoId);
  const data = await response.json();
  return data;
}

async function getCliente(id) {
  const response = await fetch(API_URL + "/Clientes/" + id);
  const data = await response.json();
  return data;
}

async function getProduto(id) {
  const response = await fetch(API_URL + "/Produtos/" + id);
  const data = await response.json();
  return data;
}

export { getPedidos, getPedido, getItensPedido, getCliente, getProduto };