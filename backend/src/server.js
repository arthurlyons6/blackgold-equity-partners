import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import contactRouter from './contact.js';
import healthRouter from './health.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '16kb' }));
app.use('/api/contact', contactRouter);
app.use('/health', healthRouter);

const STATIC_DIR = path.join(__dirname, '..', '..');

app.use(express.static(STATIC_DIR));
app.get('/', (_req, res) => res.sendFile(path.join(STATIC_DIR, 'index.html')));
app.get('/:page', (req, res, next) => {
  const allowed = new Set([
    'about.html',
    'team.html',
    'portfolio.html',
    'process.html',
    'insights.html',
    'contact.html',
    'privacy.html',
    'terms.html',
  ]);
  const name = req.params.page;
  if (!allowed.has(name)) return next();
  res.sendFile(path.join(STATIC_DIR, name));
});

app.use((req, res) => res.status(404).json({ ok: false, message: 'Not found.' }));

const port = Number(process.env.PORT ?? 5173);
app.listen(port, () => console.log(`listening: http://localhost:${port} + /health`));