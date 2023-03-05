import * as dotenv from "dotenv"; dotenv.config();
import * as express from "express";

import { bodyparser, cors, logger, verify } from "./middlewares";
import { login, cards } from "./routes";

// criamos um router para todos os endpoints /cards
const cardsRouter = express.Router();
cardsRouter.use(verify);
cardsRouter.post("/", cards.post.expressCallback);
cardsRouter.get("/:idOuLista?", cards.get.expressCallback);
cardsRouter.put("/:id", logger, cards.put.expressCallback);
cardsRouter.delete("/:id", logger, cards.delete.expressCallback);

const app = express();
app.use(cors, bodyparser);
app.use("/cards", cardsRouter);
app.post("/login", login.post.expressCallback);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Servidor iniciado na porta ${port}`);
});
