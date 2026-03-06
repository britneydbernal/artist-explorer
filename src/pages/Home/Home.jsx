import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home({ onSearch }) {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!query.trim()) return;

    setIsLoading(true);
    setError("");
    setArtists([]);
    setHasSearched(true);

    onSearch(query)
      .then((data) => {
        const results = data.data || [];

        const uniqueArtists = Array.from(
          new Map(
            results
              .filter((item) => item.artist_id && item.artist_title)
              .map((item) => [item.artist_id, item]),
          ).values(),
        );

        const normalizedQuery = query.trim().toLowerCase();

        const filteredArtists = uniqueArtists.filter((artist) =>
          artist.artist_title.toLowerCase().includes(normalizedQuery),
        );

        setArtists(filteredArtists);
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <section className="home">
      <h2 className="home__title">Find an artist</h2>

      <form className="home__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="home__input"
          placeholder="Search artist name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button className="home__button" type="submit">
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="home__error">{error}</p>}

      <ul className="home__results">
        {hasSearched && !isLoading && artists.length === 0 && query && (
          <li className="home__empty">No artists found for "{query}".</li>
        )}

        {artists.map((artist) => (
          <li key={artist.artist_id} className="home__result">
            <Link
              to={`/artist/${encodeURIComponent(artist.artist_title)}`}
              state={{ artistName: artist.artist_title }}
              className="home__link"
            >
              {artist.artist_title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Home;
