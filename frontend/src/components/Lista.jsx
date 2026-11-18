function Lista({ series }) {
  return (
    <div>
      {series.length === 0 && <p className="vazio">Nenhum item encontrado</p>}

      <ul>
        {series.map((serie) => (
          <li key={serie.id}>
            {serie.titulo} - {serie.plataforma} - {serie.ano} - Avaliação: {serie.avaliacao}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lista;
