import { useState } from "react";
import { shallowEqual } from "react-redux";
import { Botao, Input, AutorQuote, ContainerQuote, TextoQuote } from "./styled";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getQuoteFromState,
  limpar,
  getQuoteStatus,
  getQuoteFromAPI,
} from "./quoteSlice";
import { obterMensagem } from "./utils";

function Quote() {
  const [valorInput, setValorInput] = useState("");
  const { quote = "", personagem = "" } =
    useAppSelector(getQuoteFromState, shallowEqual) || {};
  const requestStatus = useAppSelector(getQuoteStatus);

  const dispatch = useAppDispatch();

  const onClickGetQuote = () => dispatch(getQuoteFromAPI(valorInput));

  const onClickApagar = () => {
    dispatch(limpar());
    setValorInput("");
  };

  return (
    <ContainerQuote>
      <TextoQuote>{obterMensagem(quote, requestStatus)}</TextoQuote>
      <AutorQuote>{personagem}</AutorQuote>
      <Input
        aria-label="Author Quote"
        value={valorInput}
        onChange={(e) => setValorInput(e.target.value)}
        placeholder="Digite o nome do autor"
      />
      <Botao
        aria-label={valorInput ? "Obter Citação" : "Obter citação aleatória"}
        onClick={onClickGetQuote}
      >
        {valorInput ? "Obter citação" : "Obter citação aleatória"}
      </Botao>
      <Botao aria-label="Apagar" onClick={onClickApagar} secondary={true}>
        Apagar
      </Botao>
    </ContainerQuote>
  );
}
export default Quote;
