// REACT
import { useCallback, useState, useEffect } from "react";

// CSS
import "./App.css";

// COMPONENTS
import Inicio from "./components/Inicio";
import Jogo from "./components/Jogo";
import FimJogo from "./components/FimJogo";

// DATA
import { ListaPalavras } from "./data/palavras";

const estagio = [
  { id: 1, name: "inicio" },
  { id: 2, name: "jogo" },
  { id: 3, name: "fim" },
];

const quantTentativas = 3;

var palavra;
var palavrasRepetidas = [];

function App() {
  const [estagioJogo, setEstagioJogo] = useState(estagio[0].name);
  const [palavras] = useState(ListaPalavras);

  const [palavraEscolhida, setPalavraEscolhida] = useState("");
  const [categoriaEscolhida, setCategoriaEscolhida] = useState("");
  const [letras, setLetras] = useState([]);

  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([1]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(quantTentativas);
  const [pontos, setPontos] = useState(0);

  const pegarPalavraCategoria = useCallback(() => {
    //pega a categoria
    const categorias = Object.keys(palavras);
    const categoria =
      categorias[Math.floor(Math.random() * Object.keys(categorias).length)];

    //pega a palavra sem pegar palavra repetida
    do {
      palavra =
        palavras[categoria][
          Math.floor(Math.random() * palavras[categoria].length)
        ];
      palavra = palavra.toLowerCase();
    } while (palavrasRepetidas.includes(palavra));

    palavrasRepetidas.push(palavra);

    return { palavra, categoria };
  }, [palavras]);

  const iniciar = useCallback(() => {
    limpar();

    const { palavra, categoria } = pegarPalavraCategoria();

    const letras = palavra.split("");

    console.log(palavra, categoria, letras);

    setCategoriaEscolhida(categoria);
    setPalavraEscolhida(palavra);
    setLetras(letras);
    setEstagioJogo(estagio[1].name);
  }, [pegarPalavraCategoria]);

  const verificarPalavra = (letra) => {
    const letraNormalizada = letra.toLowerCase();

    if (
      letrasAdivinhadas.includes(letraNormalizada) ||
      letrasErradas.includes(letraNormalizada)
    ) {
      return;
    }

    // SE FIZER DESSA FORMA O REACT N VAI DETECTAR MODIFICAÇAO
    // if (letras.includes(letraNormalizada)) {
    //   letrasAdivinhadas.push(letraNormalizada);
    // } else {
    //   letrasErradas.push(letraNormalizada);
    //   setTentativas(tentativas - 1);
    // }

    if (letras.includes(letraNormalizada)) {
      setLetrasAdivinhadas((atualLetrasAdivinhadas) => [
        ...atualLetrasAdivinhadas,
        letraNormalizada,
      ]);
    } else {
      setLetrasErradas((atualLetrasErradas) => [
        ...atualLetrasErradas,
        letraNormalizada,
      ]);
      setTentativas((atualTentativas) => atualTentativas - 1);
    }
  };

  const limpar = () => {
    setLetrasAdivinhadas([]);
    setLetrasErradas([]);
  };

  useEffect(() => {
    if (tentativas <= 0) {
      limpar();

      setEstagioJogo(estagio[2].name);
    }
  }, [tentativas]);

  // CONDIÇÃO DE VITORIA
  useEffect(() => {
    const letrasUnicas = [...new Set(letras)];

    if (letrasAdivinhadas.length === letrasUnicas.length) {
      setPontos((pontosAtuais) => (pontosAtuais += 100));

      iniciar();
    }
  }, [letrasAdivinhadas, letras, iniciar]);

  const reiniciar = () => {
    setPontos(0);
    setTentativas(quantTentativas);

    setEstagioJogo(estagio[0].name);
  };

  return (
    <div>
      {estagioJogo === "inicio" && <Inicio iniciar={iniciar} />}
      {estagioJogo === "jogo" && (
        <Jogo
          verificarPalavra={verificarPalavra}
          palavraEscolhida={palavraEscolhida}
          categoriaEscolhida={categoriaEscolhida}
          letras={letras}
          letrasAdivinhadas={letrasAdivinhadas}
          letrasErradas={letrasErradas}
          tentativas={tentativas}
          pontos={pontos}
        />
      )}
      {estagioJogo === "fim" && (
        <FimJogo reiniciar={reiniciar} pontos={pontos} />
      )}
    </div>
  );
}

export default App;
