import { Router } from "express";
import { getJoyas,getJoyassByFilters }  from "../src/controller/joyasController.js"

const router = Router();

router.get("/joyas", getJoyas);
router.get("/joyas/filtros",getJoyassByFilters)

export default router;
