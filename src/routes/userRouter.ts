import UserController from '../controllers/usuarioController.ts';
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import express from 'express';

const router = Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // ex: .jpg
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Rotas
router.post('/user', upload.single('foto_perfil'), 
  UserController.createUser
);

router.get('/user/:id', UserController.getuser);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);
router.post('/login', UserController.Login);
router.get('/user-name', UserController.searchUsers);

export default router;
