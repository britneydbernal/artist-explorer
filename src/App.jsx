import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ArtistDetails from "./pages/ArtistDetails/ArtistDetails";

import { searchArtists, getArtworksByArtistName } from "./utils/api";

function App() {
  const handleSearchArtists = (query) => {
    return searchArtists(query);
  };

  const handleGetArtworksByArtist = (artistName) => {
    return getArtworksByArtistName(artistName);
  };

  return (
    <div className="page">
      <Header />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home onSearch={handleSearchArtists} />} />
          <Route
            path="/artist/:artistId"
            element={
              <ArtistDetails onLoadArtworks={handleGetArtworksByArtist} />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
