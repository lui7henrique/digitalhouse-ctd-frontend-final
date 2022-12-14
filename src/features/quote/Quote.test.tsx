import Quote from "./Quote";
import { render } from "../../test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

describe("Quote Component", () => {
  describe("when renders the default state", () => {
    it("shows the 'Nenhuma citação encontrada' text", async () => {
      render(<Quote />);

      expect(
        screen.getByText("Nenhuma citação encontrada")
      ).toBeInTheDocument();
    });
  });

  describe("when the 'Apagar' button is clicked", () => {
    it("renders the default state", async () => {
      render(<Quote />);
      const deleteButton = screen.getByText("Apagar");
      await userEvent.click(deleteButton);

      expect(
        screen.getByText("Nenhuma citação encontrada")
      ).toBeInTheDocument();
    });
  });

  describe("when the 'Obter citação aleatória' button is clicked", () => {
    const server = setupServer(
      rest.get(
        "https://thesimpsonsquoteapi.glitch.me/quotes",
        (_, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                character: "Chief Wiggum",
                characterDirection: "Left",
                image:
                  "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FChiefWiggum.png?1497567511716",
                quote: "Hey, I'm the chief here. Bake him away, toys.",
              },
            ])
          );
        }
      )
    );

    beforeEach(() => {
      server.listen();
    });

    afterEach(() => {
      server.close();
      server.resetHandlers();
    });

    it("renders a random quote from a random character", async () => {
      render(<Quote />);
      const getRandomQuoteButton = screen.getByText("Obter citação aleatória");
      await userEvent.click(getRandomQuoteButton);

      expect(await screen.findByText("Chief Wiggum")).toBeInTheDocument();
    });
  });

  describe("when a string is typed on the input", () => {
    it("the 'Obter citação' button is rendered", async () => {
      render(<Quote />);
      const nameInput = screen.getByPlaceholderText("Digite o nome do autor");
      await userEvent.type(nameInput, "homer");

      const getQuoteButton = await screen.findByText("Obter citação");

      expect(getQuoteButton).toBeInTheDocument();
    });

    describe("and the 'Obter citação' button is clicked", () => {
      const server = setupServer(
        rest.get(
          "https://thesimpsonsquoteapi.glitch.me/quotes",
          (_, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json([
                {
                  character: "Homer Simpson",
                  characterDirection: "Right",
                  image:
                    "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
                  quote: "I hope I didn't brain my damage.",
                },
              ])
            );
          }
        )
      );

      beforeEach(() => {
        server.listen();
      });

      afterEach(() => {
        server.close();
        server.resetHandlers();
      });

      it("renders a quote from a random character that contains the typed string in its name", async () => {
        render(<Quote />);
        const nameInput = screen.getByPlaceholderText("Digite o nome do autor");
        await userEvent.type(nameInput, "homer");

        const getQuoteButton = await screen.findByText("Obter citação");
        await userEvent.click(getQuoteButton);

        const quoteAuthorName = await screen.findByText("Homer Simpson");
        expect(quoteAuthorName).toHaveStyle("min-height: 3rem");
      });
    });

    describe("if the string is a number", () => {
      describe("and the 'Obter citação' button is clicked", () => {
        it("renders the 'Por favor, indique um nome válido' warning message", async () => {
          render(<Quote />);

          const nameInput = screen.getByPlaceholderText(
            "Digite o nome do autor"
          );

          await userEvent.type(nameInput, "1");

          const getQuoteButton = await screen.findByText("Obter citação");
          await userEvent.click(getQuoteButton);

          const warningMessage = await screen.findByText(
            "Por favor, indique um nome válido"
          );

          expect(warningMessage).toBeInTheDocument();
        });
      });
    });
  });
});
