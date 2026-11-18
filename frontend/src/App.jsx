import { useEffect, useState } from "react";
import "./App.css";
import Formulario from "./components/Formulario";
import Lista from "./components/Lista";
import Resumo from "./components/Resumo";

const API = "http://127.0.0.1:8000/api/series/";
const API_RESUMO = "http://127.0.0.1:8000/api/series/resumo/";

function App() {
  const [series, setSeries] = useState([]);
  const [resumo, setResumo] = useState({ total: 0, media_avaliacao: 0, melhor: null });
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [ano, setAno] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");

  function carregarSeries() {
    fetch(API)
      .then((res) => res.json())
      .then((dados) => setSeries(dados));
  }

  function carregarResumo() {
    fetch(API_RESUMO)
      .then((res) => res.json())
      .then((dados) => setResumo(dados));
  }

  useEffect(() => {
    carregarSeries();
    carregarResumo();
  }, []);

  function cadastrar(evento) {
    evento.preventDefault();

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        plataforma,
        ano: Number(ano),
        avaliacao: Number(avaliacao),
      }),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((dados) => setErro(dados.erro));
      }
      setErro("");
      setTitulo("");
      setPlataforma("");
      setAno("");
      setAvaliacao("");
      carregarSeries();
      carregarResumo();
    });
  }

  const seriesFiltradas = series.filter((serie) =>
    serie.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="pagina">
      <h1>Catálogo de Séries</h1>

      <Resumo resumo={resumo} />

      <Formulario
        titulo={titulo} setTitulo={setTitulo}
        plataforma={plataforma} setPlataforma={setPlataforma}
        ano={ano} setAno={setAno}
        avaliacao={avaliacao} setAvaliacao={setAvaliacao}
        cadastrar={cadastrar}
      />

      {erro && <p className="erro">{erro}</p>}

      <h2>Séries cadastradas</h2>

      <input
        className="busca"
        placeholder="Buscar pelo título..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <Lista series={seriesFiltradas} />
    </div>
  );
}

export default App;
