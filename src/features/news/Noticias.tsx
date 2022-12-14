import { useEffect, useState } from "react";
import { AssinarImage, CloseButton as Close } from "../../assets";
import { obterNoticias } from "./fakeRest";

import * as S from "./styled";

import { SanitizedNew } from "./types";

const News = () => {
  const [news, setNews] = useState<SanitizedNew[]>([]);
  const [modal, setModal] = useState<SanitizedNew | null>(null);

  useEffect(() => {
    const getInfos = async () => {
      const response = await obterNoticias();

      const data = response.map((n) => {
        const titulo = n.titulo
          .split(" ")
          .map((str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
          })
          .join(" ");

        const hour = new Date();
        const minutes = Math.floor((hour.getTime() - n.date.getTime()) / 60000);

        const obj: SanitizedNew = {
          id: n.id,
          titulo,
          description: n.description,
          date: `Faz ${minutes} minutos`,
          premium: n.premium,
          image: n.image,
          descriptionCurto: n.description.substring(0, 100),
        };

        return obj;
      });

      setNews(data);
    };

    getInfos();
  }, []);

  return (
    <S.ContainerNoticias>
      <S.TituloNoticias>Noticias dos Simpsons</S.TituloNoticias>

      <S.ListaNoticias>
        {news.map((n) => (
          <S.CardNoticia>
            <S.ImageCardNoticia src={n.image} />
            <S.TituloCardNoticia>{n.titulo}</S.TituloCardNoticia>
            <S.DateCardNoticia>{n.date}</S.DateCardNoticia>
            <S.DescriptionCardNoticia>
              {n.descriptionCurto}
            </S.DescriptionCardNoticia>
            <S.BotaoLeitura onClick={() => setModal(n)}>Ver más</S.BotaoLeitura>
          </S.CardNoticia>
        ))}

        {modal ? (
          modal.premium ? (
            <S.ContainerModal>
              <S.CardModal>
                <S.CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </S.CloseButton>

                <S.ImageModal src={AssinarImage} alt="mr-burns-excelent" />
                <S.ContainerTexto>
                  <S.TituloModal>Assine a nossa newsletter</S.TituloModal>
                  <S.DescriptionModal>
                    Assine nossa newsletter e receba novidades de nossos
                    personagens favoritos
                  </S.DescriptionModal>

                  <S.BotaoAssinar
                    onClick={() =>
                      setTimeout(() => {
                        alert("Suscripto!");
                        setModal(null);
                      }, 1000)
                    }
                  >
                    Assinar
                  </S.BotaoAssinar>
                </S.ContainerTexto>
              </S.CardModal>
            </S.ContainerModal>
          ) : (
            <S.ContainerModal>
              <S.CardModal>
                <S.CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </S.CloseButton>

                <S.ImageModal src={modal.image} alt="news-image" />
                <S.ContainerTexto>
                  <S.TituloModal>{modal.titulo}</S.TituloModal>
                  <S.DescriptionModal>{modal.description}</S.DescriptionModal>
                </S.ContainerTexto>
              </S.CardModal>
            </S.ContainerModal>
          )
        ) : null}
      </S.ListaNoticias>
    </S.ContainerNoticias>
  );
};

export default News;
