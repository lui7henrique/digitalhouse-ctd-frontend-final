import { useState } from "react";
import { NomesSimpsons, INFO_SIMPSONS } from "./constants";
import styles from "./styles.module.css";

const Bio = () => {
  const [bioActive, setBioActive] = useState(INFO_SIMPSONS[NomesSimpsons.BART]);

  const onClick: (nome: NomesSimpsons) => void = (nome) =>
    setBioActive(INFO_SIMPSONS[nome]);

  const criarBotoes = () => {
    return Object.keys(INFO_SIMPSONS).map((nome: string) => (
      <button
        key={nome as string}
        onClick={() => onClick(nome as NomesSimpsons)}
        className={
          bioActive.id === nome
            ? styles.botaoBioActive
            : styles.botaoBioInactive
        }
      >
        {nome}
      </button>
    ));
  };

  return (
    <div className={styles.bioContainer}>
      <div className={styles.containerBotoes}>{criarBotoes()}</div>
      <div>
        <div>
          <img
            src={bioActive.image}
            alt={bioActive.nome}
            className={styles.bioImage}
          />
        </div>
        <div>
          <h3 className={styles.bioNome}>{bioActive.nome}</h3>
          <p className={styles.bioDescription}>{bioActive.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
