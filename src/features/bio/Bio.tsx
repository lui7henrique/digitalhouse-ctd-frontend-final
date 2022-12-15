import { useState } from "react";
import { NomesSimpsons, INFO_SIMPSONS } from "./constants";

import * as S from "./styles";

const Bio = () => {
  const [bioActive, setBioActive] = useState(INFO_SIMPSONS[NomesSimpsons.BART]);

  const onClick: (nome: NomesSimpsons) => void = (nome) =>
    setBioActive(INFO_SIMPSONS[nome]);

  const criarBotoes = () => {
    return Object.keys(INFO_SIMPSONS).map((nome: string) => (
      <S.BioButton
        key={nome as string}
        onClick={() => onClick(nome as NomesSimpsons)}
        isActive={bioActive.id === nome}
      >
        {nome}
      </S.BioButton>
    ));
  };

  return (
    <S.BioContainer>
      <S.ContainerBotoes>{criarBotoes()}</S.ContainerBotoes>

      <div>
        <div>
          <S.BioImage src={bioActive.image} alt={bioActive.nome} />
        </div>
        <div>
          <S.BioName>{bioActive.nome}</S.BioName>
          <S.BioDescription>{bioActive.description}</S.BioDescription>
        </div>
      </div>
    </S.BioContainer>
  );
};

export default Bio;
