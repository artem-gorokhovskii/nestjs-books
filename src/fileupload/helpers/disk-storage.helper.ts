import { diskStorage as diskStorageMulter } from "multer";
import { resolve } from "path";
import { v4 } from 'uuid';
import { extension } from "mime";

export const diskStorage = diskStorageMulter({
    destination: (req, file, cb) => cb(null, resolve(process.env.STATIC_PATH_FOR_FILES, req.query.category as string)),
    filename: (req, file, cb) => cb(null, `${v4().replace(/-/g, '')}.${extension(file.mimetype)}`)
})