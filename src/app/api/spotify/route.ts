import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const API_KEY = process.env.LASTFM_API_KEY;
    const USERNAME = process.env.LASTFM_USERNAME;

    if (!API_KEY || !USERNAME) {
      return NextResponse.json({ isPlaying: false });
    }

    const LASTFM_ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

    const response = await fetch(LASTFM_ENDPOINT, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ isPlaying: false });
    }

    const data = await response.json();
    const tracks = data.recenttracks?.track;

    if (!tracks || tracks.length === 0) {
      return NextResponse.json({ isPlaying: false });
    }

    const track = tracks[0];
    const isPlaying = track["@attr"]?.nowplaying === "true";
    
    // Find the largest image available
    const imageObj = track.image.find((img: any) => img.size === "extralarge") 
                     || track.image[track.image.length - 1];
    
    const albumImageUrl = imageObj?.["#text"] || "";

    return NextResponse.json({
      isPlaying,
      title: track.name,
      artist: track.artist["#text"],
      album: track.album["#text"],
      albumImageUrl,
      songUrl: track.url,
    });
  } catch (err) {
    console.error("Last.fm error:", err);
    return NextResponse.json({ isPlaying: false });
  }
}
