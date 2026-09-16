import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadPlugin = () => {
  return {
    name: 'video-upload-plugin',
    configureServer(server: any) {
      const uploadDir = path.resolve(__dirname, 'public/videos');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const storage = multer.diskStorage({
        destination: uploadDir,
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        }
      });
      const upload = multer({ storage });

      // Vite middleware runs Express-like middleware
      server.middlewares.use('/api/overlay', (req: any, res: any, next: any) => {
        if (req.method !== 'POST') return next();
        
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const opacity = parseFloat(data.opacity);
            
            if (isNaN(opacity) || opacity < 0 || opacity > 1) {
              res.statusCode = 400;
              return res.end('Invalid opacity value');
            }

            const puzzlePathsFile = path.resolve(__dirname, 'src/components/PuzzlePaths.ts');
            let content = fs.readFileSync(puzzlePathsFile, 'utf-8');

            const regex = /export const OVERLAY_OPACITY = [\d.]+;/;
            content = content.replace(regex, `export const OVERLAY_OPACITY = ${opacity};`);

            fs.writeFileSync(puzzlePathsFile, content, 'utf-8');

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, opacity }));
          } catch (err: any) {
            console.error(err);
            res.statusCode = 500;
            res.end(err.message);
          }
        });
      });

      server.middlewares.use('/api/upload', (req: any, res: any, next: any) => {
        if (req.method !== 'POST') return next();
        
        upload.single('video')(req, res, (err: any) => {
          if (err) {
            res.statusCode = 500;
            return res.end(err.message);
          }
          
          try {
            const pieceId = req.body.pieceId;
            const file = req.file;

            if (!pieceId || !file) {
              res.statusCode = 400;
              return res.end('Missing pieceId or video file');
            }

            const publicVideoUrl = `/videos/${file.filename}`;

            const puzzlePathsFile = path.resolve(__dirname, 'src/components/PuzzlePaths.ts');
            let content = fs.readFileSync(puzzlePathsFile, 'utf-8');

            const regex = new RegExp(`(id:\\s*['"]${pieceId}['"][\\s\\S]*?(?:videoUrl|imageUrl):\\s*['"])(.*?)(['"])`, 'g');
            content = content.replace(regex, `$1${publicVideoUrl}$3`);

            fs.writeFileSync(puzzlePathsFile, content, 'utf-8');

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, url: publicVideoUrl }));
          } catch (error: any) {
            console.error(error);
            res.statusCode = 500;
            res.end(error.message);
          }
        });
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    uploadPlugin()
  ],
})
