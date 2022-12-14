import { API_URL } from "../../app/constants";
import { IQuote } from "./types";

export const getQuote: (personagem?: string) => Promise<IQuote> = async (
  personagem
) => {
  if (personagem && parseInt(personagem)) {
    throw new Error("O nome deve ser um texto");
  }

  const url = personagem ? `${API_URL}?character=${personagem}` : API_URL;
  const resposta = await fetch(url);
  const [data] = await resposta.json();

  const dataNormalizada = {
    quote: data.quote,
    personagem: data.character,
    image: data.image,
    direcaoPersonagem: data.characterDirection,
  };

  return dataNormalizada;
};
