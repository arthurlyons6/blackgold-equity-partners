import express from 'express';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

router.get('/ready', (_req, res) => {
  res.json({ status: 'ready', timestamp: new Date().toISOString() });
});

export default router;