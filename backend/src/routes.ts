import { Request, Response, Router } from "express";
// Criando objeto do router para poder registrar rotas
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default router;
