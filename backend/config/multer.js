
import multer from 'multer'

export const upload = multer({ dest: 'uploads/', storage: multer.diskStorage({}) })