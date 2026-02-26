/**
 * Steam API Proxy — Cloudflare Worker
 *
 * Setup:
 *  1. Create a new Worker in the Cloudflare dashboard (workers.cloudflare.com)
 *  2. Paste this entire file into the Worker editor
 *  3. Go to Settings → Variables → add a Secret named STEAM_API_KEY with your Steam API key
 *  4. Deploy, then copy the Worker URL (e.g. https://steam-proxy.YOUR_NAME.workers.dev)
 *  5. Paste that URL into gaming.astro where it says WORKER_URL
 *
 * Endpoints:
 *  GET /?type=status  → current in-game status
 *  GET /?type=recent  → games played in the last 2 weeks
 */

const STEAM_ID = '76561198025429665';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const type = new URL(request.url).searchParams.get('type');

    try {
      if (type === 'status') {
        const res = await fetch(
          `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_API_KEY}&steamids=${STEAM_ID}`
        );
        const data = await res.json();
        const player = data.response.players[0];

        return Response.json(
          {
            inGame: !!player.gameid,
            gameName: player.gameextrainfo || null,
            gameId: player.gameid || null,
          },
          { headers: corsHeaders }
        );
      }

      if (type === 'recent') {
        const res = await fetch(
          `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${STEAM_ID}&count=6`
        );
        const data = await res.json();
        const games = (data.response.games || []).map((g) => ({
          name: g.name,
          appid: g.appid,
          playtime2weeks: g.playtime_2weeks,
          img: `https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
        }));

        return Response.json({ games }, { headers: corsHeaders });
      }

      return Response.json({ error: 'Invalid type' }, { status: 400, headers: corsHeaders });
    } catch {
      return Response.json({ error: 'Steam API error' }, { status: 500, headers: corsHeaders });
    }
  },
};
