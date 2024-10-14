import React, { useContext } from 'react';
import '../assets/style/addMusicForm.scss';
import DataContext from '../context/DataContext';

const AddMusicForm = () => {
  const {
    handleSubmit,
    selectedMusic,
    musicName,
    musicType,
    musicSinger,
    musicPhoto,
    musicUrl,
    musicLyrics,
    setMusicName,
    setMusicType,
    setMusicSinger,
    setMusicPhoto, 
    setMusicUrl,
    setLyrics,
    categories
  } = useContext(DataContext);
  

  return (
    <form onSubmit={handleSubmit} className="addMusic">
      <h2>{selectedMusic ? "Edit Music" : "Add Music"}</h2>
      <input
        value={musicSinger}
        onChange={(e) => setMusicSinger(e.target.value)}
        type="text"
        placeholder="Enter Singer/s"
      />
      <input
        value={musicName}
        onChange={(e) => setMusicName(e.target.value)}
        type="text"
        placeholder="Enter Music Name"
      />
      <input
        value={musicUrl}
        onChange={(e) => setMusicUrl(e.target.value)}
        type="url"
        placeholder="Enter Music Link"
      />
      <input
        value={musicPhoto}
        onChange={(e) => setMusicPhoto(e.target.value)}
        type="url"
        placeholder="Enter Music Photo"
      />
      <select
        value={musicType}
        onChange={(e) => setMusicType(e.target.value)}
      >
        <option>Select Music Type</option>
        {categories.map((category) => (
          <option key={category.id} value={category.categoryName}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <textarea
        value={musicLyrics}
        onChange={(e) => setLyrics(e.target.value)}
        placeholder="Enter Lyrics"
        rows="5"
      />
      <input
        type="submit"
        value={selectedMusic ? "Edit Music" : "Add Music"}
      />
    </form>
  );
};

export default AddMusicForm;
