const BASE_URL = "https://api.artic.edu/api/v1";

export function searchArtists(query) {
  return fetch(
    `${BASE_URL}/artworks/search?q=${encodeURIComponent(
      query
    )}&limit=10&fields=id,title,artist_id,artist_title`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch artists");
    }
    return res.json();
  });
}

export function getArtworksByArtistName(artistName) {
  return fetch(
    `${BASE_URL}/artworks/search?query[match][artist_title]=${encodeURIComponent(
      artistName
    )}&limit=6&fields=id,title,image_id,artist_title`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch artworks");
    }
    return res.json();
  });
}
