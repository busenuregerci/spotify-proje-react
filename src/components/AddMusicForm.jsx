import React, { useContext } from 'react';
import '../assets/style/addMusicForm.scss';
import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
const AddMusicForm = () => {
  const {
    handleSubmit,
    selectedMusic,
    musicName,
    musicType,
    musicSinger,
    musicPhoto,
    musicUrl,
    lyrics,
    categories
  } = useContext(DataContext);
  const navigate = useNavigate(); 
  
  const handleFormSubmit = (e) => {
    handleSubmit(e);
    navigate("/home");
    }
  return (
    <form onSubmit={handleFormSubmit} className="addMusic">
      <h2>{selectedMusic ? "Edit Music" : "Add Music"}</h2>
      <input
        value={musicSinger}
        // case-7
        onChange={(e) => dispatch({type:"musicSinger", payload:e.target.value})}
        type="text"
        placeholder="Enter Singer/s"
      />
      <input
        value={musicName}
        // case-8
        onChange={(e) => dispatch({type:"musicName", payload: e.target.value})}
        type="text"
        placeholder="Enter Music Name"
      />
      <input
        value={musicUrl}
        // case-9
        onChange={(e) => dispatch({type:"musicUrl", payload: e.target.value})}
        type="url"
        placeholder="Enter Music Link"
      />
      <input
        value={musicPhoto}
        // case 10
        onChange={(e) => dispatch({type: "musicPhoto", payload: e.target.value})}
        type="url"
        placeholder="Enter Music Photo"
      />
      <select
        value={musicType}
        // case-11
        onChange={(e) => dispatch({type: "musicType", payload: e.target.value})}
      >
        <option>Select Music Type</option>
        {categories.map((category) => (
          <option key={category.id} value={category.categoryName}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <textarea
        value={lyrics}  
        // case-12
        onChange={(e) =>dispatch({type:"lyrics", payload: e.target.value})}
        placeholder="Enter Lyrics"
        rows="10" cols="50"
      />
      <input
        type="submit"
        value={selectedMusic ? "Edit Music" : "Add Music"}
      />
    </form>
  );
};

export default AddMusicForm;
