import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Subimos dos niveles desde src/config para llegar a la raíz
const rootDir = path.resolve(__dirname, '..', '..');

const environment = process.env.NODE_ENV || 'development';

dotenv.config({ path: path.resolve(rootDir, `.env.${environment}`) });

export const config = {
    env: environment,
    port: process.env.PORT || 3000,
    paths: {
        root: rootDir,
        src: path.join(rootDir, 'src'),
        dataPath: path.join(rootDir, 'src', 'data')
    }
};

export default config;