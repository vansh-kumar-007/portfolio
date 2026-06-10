import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
    cache: "no-store",
  });
  return response.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    // Try to get currently playing
    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });

    if (nowPlayingRes.status === 200) {
      const track = await nowPlayingRes.json();
      if (track.item) {
        return NextResponse.json({
          isPlaying: track.is_playing,
          title: track.item.name,
          artist: track.item.artists.map((_artist: any) => _artist.name).join(", "),
          album: track.item.album.name,
          albumImageUrl: track.item.album.images[0]?.url,
          songUrl: track.item.external_urls.spotify,
        });
      }
    }

    // Fallback to recently played if not currently playing
    const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });

    if (recentlyPlayedRes.status === 200) {
      const data = await recentlyPlayedRes.json();
      if (data.items && data.items.length > 0) {
        const track = data.items[0].track;
        return NextResponse.json({
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((_artist: any) => _artist.name).join(", "),
          album: track.album.name,
          albumImageUrl: track.album.images[0]?.url,
          songUrl: track.external_urls.spotify,
        });
      }
    }

    return NextResponse.json({ isPlaying: false });
  } catch (err) {
    console.error("Spotify error:", err);
    return NextResponse.json({ isPlaying: false });
  }
}
