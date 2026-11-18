function Formulario({
  titulo, setTitulo,
  plataforma, setPlataforma,
  ano, setAno,
  avaliacao, setAvaliacao,
  cadastrar,
}) {
  return (
    <form onSubmit={cadastrar}>
      <input
        placeholder="Título da série"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <input
        placeholder="Plataforma"
        value={plataforma}
        onChange={(e) => setPlataforma(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Ano de lançamento"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Avaliação (0 a 10)"
        step="0.1"
        value={avaliacao}
        onChange={(e) => setAvaliacao(e.target.value)}
        required
      />

      <button type="submit">Cadastrar série</button>
    </form>
  );
}

export default Formulario;
