import { useState, useRef } from "react";
import style from "./styles.module.css";

const Jogo = ({
  verificarPalavra,
  palavraEscolhida,
  categoriaEscolhida,
  letras,
  letrasAdivinhadas,
  letrasErradas,
  tentativas,
  pontos,
}) => {
  const [letra, setLetra] = useState("");
  const letraInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verificarPalavra(letra);

    setLetra("");
    letraInputRef.current.focus();
  };

  return (
    <div className={style.game}>
      <p className={style.points}>
        <span>Pontuação: {pontos}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className={style.tip}>
        Dica sobre a palavra: <span>{categoriaEscolhida}</span>
      </h3>
      <p>Você ainda tem {tentativas} tentativa(s).</p>
      <div className={style.wordContainer}>
        {letras.map((letra, i) =>
          letrasAdivinhadas.includes(letra) ? (
            <span key={i} className={style.letter}>
              {letra}
            </span>
          ) : (
            <span key={i} className={style.blankSquare}></span>
          )
        )}
      </div>
      <div className={style.letterContainer}>
        <p>
          Tente adivinhar uma letra da palavra, usando <span>acentos</span> se
          necessário:
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            value={letra}
            maxLength="1"
            required
            ref={letraInputRef}
            onChange={(e) => setLetra(e.target.value)}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className={style.wrongLettersContainer}>
        <p>Letras já utilizadas:</p>
        {letrasErradas.map((letra, i) => (
          <span key={i}>{letra}, </span>
        ))}
      </div>
    </div>
  );
};

export default Jogo;
