import style from "./styles.module.css";

const Inicio = ({ iniciar }) => {
  return (
    <div className={style.start}>
      <h1>Palavra Secreta</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={iniciar}>Começar o jogo</button>
    </div>
  );
};

export default Inicio;
