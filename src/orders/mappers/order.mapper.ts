export function mapPedido(payload: any) {
  return {
    orderId: payload.numeroPedido,
    value: payload.valorTotal,
    creationDate: new Date(payload.dataCriacao).toISOString(),
    items: payload.items.map(item => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  };
}
