export interface Env {
  NEWS_KV: KVNamespace;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === '/api/news' && request.method === 'GET') {
      const raw = await env.NEWS_KV.get('news:list', 'text');
      const list = raw ? JSON.parse(raw) : [];
      return new Response(JSON.stringify(list), { headers: corsHeaders });
    }

    const match = url.pathname.match(/^\/api\/news\/([a-z0-9-]+)$/);
    if (match && request.method === 'GET') {
      const slug = match[1];
      const raw = await env.NEWS_KV.get(`news:article:${slug}`, 'text');
      if (!raw) {
        return new Response('Not found', { status: 404, headers: corsHeaders });
      }
      
      const article = JSON.parse(raw);
      if (!article.date) {
        article.date = new Date().toISOString().split('T')[0];
      }
      
      return new Response(JSON.stringify(article), { headers: corsHeaders });
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  },
};