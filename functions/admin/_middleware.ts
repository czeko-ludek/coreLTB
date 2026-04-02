/**
 * Admin middleware — protects all /admin/* routes with password auth.
 * Password set via ADMIN_PASSWORD env var in Cloudflare Dashboard.
 * Cookie-based session (7 days), HMAC-signed with password as secret.
 */

interface Env {
  ADMIN_PASSWORD: string;
}

const COOKIE_NAME = 'coreltb_admin';
const SESSION_DAYS = 7;
const LOGIN_PATH = '/admin/login';

// Simple HMAC-like signing using Web Crypto
async function sign(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return [...new Uint8Array(signature)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verify(token: string, secret: string): Promise<boolean> {
  try {
    const [timestampStr, sig] = token.split('.');
    if (!timestampStr || !sig) return false;

    const timestamp = parseInt(timestampStr, 10);
    const now = Date.now();
    const maxAge = SESSION_DAYS * 24 * 60 * 60 * 1000;

    if (isNaN(timestamp) || now - timestamp > maxAge) return false;

    const expected = await sign(timestampStr, secret);
    return sig === expected;
  } catch {
    return false;
  }
}

function getCookie(request: Request, name: string): string | null {
  const cookies = request.headers.get('Cookie') || '';
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}

function loginHTML(error?: string): string {
  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Admin — CoreLTB</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Manrope', sans-serif;
    background: #1a1a1a;
    color: #fff;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-card {
    background: #232323;
    border: 1px solid #333;
    border-radius: 16px;
    padding: 48px 40px;
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  .login-card img { height: 40px; margin-bottom: 24px; }
  .login-card h1 { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
  .login-card p { font-size: 13px; color: #888; margin-bottom: 24px; }
  .input-wrap {
    position: relative;
    margin-bottom: 16px;
  }
  .input-wrap input {
    width: 100%;
    padding: 14px 16px;
    background: #1a1a1a;
    border: 1px solid #444;
    border-radius: 10px;
    color: #fff;
    font-family: 'Manrope', sans-serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;
  }
  .input-wrap input:focus { border-color: #dfbb68; }
  button {
    width: 100%;
    padding: 14px;
    background: #dfbb68;
    color: #1a1a1a;
    border: none;
    border-radius: 10px;
    font-family: 'Manrope', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }
  button:hover { background: #d4a847; }
  .error {
    background: rgba(239,68,68,0.15);
    border: 1px solid rgba(239,68,68,0.3);
    color: #ef4444;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 13px;
    margin-bottom: 16px;
  }
</style>
</head>
<body>
<div class="login-card">
  <img src="data:image/webp;base64,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" alt="CoreLTB">
  <h1>Panel administracyjny</h1>
  <p>Wprowadz haslo, aby uzyskac dostep do raportow</p>
  ${error ? `<div class="error">${error}</div>` : ''}
  <form method="POST" action="/admin/login">
    <div class="input-wrap">
      <input type="password" name="password" placeholder="Haslo" autofocus required>
    </div>
    <button type="submit">Zaloguj sie</button>
  </form>
</div>
</body>
</html>`;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  const password = env.ADMIN_PASSWORD;
  if (!password) {
    return new Response('ADMIN_PASSWORD not configured', { status: 500 });
  }

  // Handle login POST
  if (path === '/admin/login' && request.method === 'POST') {
    const formData = await request.formData();
    const submitted = formData.get('password') as string;

    if (submitted === password) {
      const timestamp = Date.now().toString();
      const sig = await sign(timestamp, password);
      const token = `${timestamp}.${sig}`;

      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/admin/',
          'Set-Cookie': `${COOKIE_NAME}=${token}; Path=/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_DAYS * 86400}`,
        },
      });
    }

    return new Response(loginHTML('Nieprawidlowe haslo'), {
      status: 401,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // Handle logout
  if (path === '/admin/logout') {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/admin/login',
        'Set-Cookie': `${COOKIE_NAME}=; Path=/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
      },
    });
  }

  // Show login page (GET)
  if (path === '/admin/login') {
    return new Response(loginHTML(), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // Verify auth cookie for all other /admin/* routes
  const token = getCookie(request, COOKIE_NAME);
  if (!token || !(await verify(token, password))) {
    return new Response(null, {
      status: 302,
      headers: { 'Location': '/admin/login' },
    });
  }

  // Authenticated — add noindex header and pass through
  const response = await next();
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return newResponse;
};
