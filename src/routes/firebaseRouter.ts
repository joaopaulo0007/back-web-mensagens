import { Router } from "express";
import firebaseTokenController from "../controllers/firebaseTokenController.ts";
const router=Router()
router.post('/firebase',firebaseTokenController.createFirebaseToken)
router.get('/firebase/:id',firebaseTokenController.getFirebaseToken)
export default router