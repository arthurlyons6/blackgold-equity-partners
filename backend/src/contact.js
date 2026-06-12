import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '../../data/inquiries.json');

function timestamp() {
  return new Date().toISOString();
}

router.post('/', async (req, res) => {
  try {
    const { name, email, type, company, message } = req.body ?? {};
    const record = {
      id: crypto.randomUUID(),
      createdAt: timestamp(),
      name,
      email,
      type,
      company,
      message,
    };
    let existing = [];
    try {
      const raw = await fs.readFile(DATA_PATH, 'utf8');
      existing = JSON.parse(raw);
    } catch {
      existing = [];
    }
    existing.unshift(record);
    await fs.writeFile(DATA_PATH, JSON.stringify(existing, null, 2), 'utf8');
    res.status(202).json({
      ok: true,
      id: record.id,
      createdAt: record.createdAt,
      message: 'Inquiry received. We respond within one business day.',
    });
  } catch (err) {
    console.error('contact-store-error', err);
    res.status(500).json({ ok: false, message: 'Unexpected server error.' });
  }
});

export default router;