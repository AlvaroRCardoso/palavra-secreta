import style from "./styles.module.css";

const FimJogo = ({ reiniciar, pontos }) => {
  return (
    <div>
      <h1>Fim de Jogo!</h1>
      <h2>
        A sua pontuação foi: <span className={style.score}>{pontos}</span>
      </h2>
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
};

export default FimJogo;
