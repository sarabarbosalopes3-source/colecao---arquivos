function Resumo({ resumo }) {
  return (
    <div className="resumo">
      <div className="resumo-item">
        <span className="resumo-valor">{resumo.total}</span>
        <span className="resumo-rotulo">Total</span>
      </div>
      <div className="resumo-item">
        <span className="resumo-valor">{resumo.media_avaliacao}</span>
        <span className="resumo-rotulo">Média</span>
      </div>
      <div className="resumo-item">
        <span className="resumo-valor">{resumo.melhor}</span>
        <span className="resumo-rotulo">Melhor série</span>
      </div>
    </div>
  );
}

export default Resumo;
