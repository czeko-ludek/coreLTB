/**
 * Cloudflare Pages Function — /api/notes
 *
 * Simple note/feedback system for platform presentation.
 * Client views presentation, clicks "+" on any section,
 * writes feedback. Both sides see the same notes.
 *
 * Storage: Cloudflare KV (NOTES_KV binding)
 * Key: "presentation-notes" → JSON object
 *
 * Endpoints:
 *   GET  /api/notes              → returns all notes
 *   POST /api/notes              → adds a note to a section
 *   DELETE /api/notes?section=X&id=Y → removes a specific note
 */

interface Env {
  NOTES_KV: KVNamespace;
}

interface CFContext {
  request: Request;
  env: Env;
}

type CFHandler = (context: CFContext) => Promise<Response>;

const KV_KEY = 'presentation-notes';
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

interface Note {
  id: string;
  text: string;
  author: string;
  date: string;
  resolved?: boolean;
}

interface NotesData {
  [section: string]: Note[];
}

async function getNotes(env: Env): Promise<NotesData> {
  try {
    const raw = await env.NOTES_KV.get(KV_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveNotes(env: Env, notes: NotesData): Promise<void> {
  await env.NOTES_KV.put(KV_KEY, JSON.stringify(notes));
}

// ─── GET: Return all notes ──────────────────────────────────
async function handleGet(env: Env): Promise<Response> {
  const notes = await getNotes(env);
  return new Response(JSON.stringify(notes), {
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

// ─── POST: Add a note ───────────────────────────────────────
async function handlePost(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json() as {
      section: string;
      text: string;
      author?: string;
    };

    if (!body.section || !body.text?.trim()) {
      return new Response(JSON.stringify({ error: 'section and text required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    const notes = await getNotes(env);
    if (!notes[body.section]) {
      notes[body.section] = [];
    }

    const note: Note = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text: body.text.trim(),
      author: body.author?.trim() || 'Klient',
      date: new Date().toISOString(),
    };

    notes[body.section].push(note);
    await saveNotes(env, notes);

    return new Response(JSON.stringify({ ok: true, note }), {
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }
}

// ─── DELETE: Remove a note ──────────────────────────────────
async function handleDelete(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const section = url.searchParams.get('section');
  const noteId = url.searchParams.get('id');

  if (!section || !noteId) {
    return new Response(JSON.stringify({ error: 'section and id required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }

  const notes = await getNotes(env);
  if (notes[section]) {
    notes[section] = notes[section].filter((n) => n.id !== noteId);
    if (notes[section].length === 0) delete notes[section];
    await saveNotes(env, notes);
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

// ─── PATCH: Toggle resolved status ─────────────────────────
async function handlePatch(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json() as { section: string; id: string };

    if (!body.section || !body.id) {
      return new Response(JSON.stringify({ error: 'section and id required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    const notes = await getNotes(env);
    if (notes[body.section]) {
      const note = notes[body.section].find((n) => n.id === body.id);
      if (note) {
        note.resolved = !note.resolved;
        await saveNotes(env, notes);
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }
}

// ─── Main handler ───────────────────────────────────────────
export const onRequest: CFHandler = async (context) => {
  const { request, env } = context;

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  // Check KV binding exists
  if (!env.NOTES_KV) {
    return new Response(
      JSON.stringify({ error: 'NOTES_KV binding not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }

  switch (request.method) {
    case 'GET':
      return handleGet(env);
    case 'POST':
      return handlePost(request, env);
    case 'DELETE':
      return handleDelete(request, env);
    case 'PATCH':
      return handlePatch(request, env);
    default:
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
  }
};
