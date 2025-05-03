import { Router } from 'express';
import grupoController from '../controllers/grupoController.ts';
import path from 'path';
import multer from 'multer';
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });
router.post('/grupo',upload.single('avatar'), grupoController.createGrupo);
router.get('/grupo/:id', grupoController.getGrupo);
router.put('/grupo/:id', grupoController.updateGrupo);
router.delete('/grupo/:id', grupoController.deleteGrupo);
router.get('/grupo/info/:id',grupoController.getGrupoInfo)

export default router;