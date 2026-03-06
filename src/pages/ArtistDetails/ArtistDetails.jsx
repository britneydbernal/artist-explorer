import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ArtistDetails.css";
import closeIcon from "../../images/close.png";

function ArtistDetails({ onLoadArtworks }) {
  const { artistId } = useParams();
  const artistName = decodeURIComponent(artistId);
  const navigate = useNavigate();

  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    if (!artistName) return;

    setIsLoading(true);
    setError("");

    onLoadArtworks(artistName)
      .then((data) => {
        setArtworks(data.data || []);
      })
      .catch(() => {
        setError("Unable to load artist information.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [artistName]);

  if (isLoading) {
    return <p>Loading artist...</p>;
  }

  if (error) {
    return <p className="artist__error">{error}</p>;
  }

  return (
    <section className="artist">
      <button
        className="artist__back-button"
        type="button"
        onClick={() => navigate("/")}
      >
        &larr; Back to search
      </button>

      <h2 className="artist__title">{artistName}</h2>
      <h3 className="artist__subtitle">Artworks ({artworks.length})</h3>

      {artworks.length === 0 ? (
        <p className="artist__empty">No artworks available.</p>
      ) : (
        <ul className="artist__artworks">
          {artworks.map((artwork) => (
            <li
              key={artwork.id}
              className="artist__artwork"
              onClick={() => setSelectedArtwork(artwork)}
            >
              {artwork.image_id ? (
                <img
                  src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/300,/0/default.jpg`}
                  alt={artwork.title}
                />
              ) : (
                <div className="artist__no-image">No Image</div>
              )}
              <p>{artwork.title}</p>
            </li>
          ))}
        </ul>
      )}
      {selectedArtwork && (
        <div className="modal" onClick={() => setSelectedArtwork(null)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal__close"
              onClick={() => setSelectedArtwork(null)}
            >
              <img src={closeIcon} alt="Close" className="modal__close-icon" />
            </button>

            <img
              src={`https://www.artic.edu/iiif/2/${selectedArtwork.image_id}/full/843,/0/default.jpg`}
              alt={selectedArtwork.title}
            />

            <p className="modal__title">{selectedArtwork.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ArtistDetails;
