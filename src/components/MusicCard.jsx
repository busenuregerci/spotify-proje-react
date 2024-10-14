import React, { useContext } from 'react';
import '../assets/style/musicCard.scss';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import DefaultPhoto from '../assets/img/TUNE IN.png';
import DataContext from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';

const MusicCard = ({ music }) => {
  const { swallDelete, search, setSelectedMusic } = useContext(DataContext);

  const musicNameMatches = music.musicName?.toLowerCase().includes(search.toLowerCase());
  const musicSingerMatches = music.musicSinger?.toLowerCase().includes(search.toLowerCase());

  return (
    (musicNameMatches || musicSingerMatches) && (
      <div className='card'>
        <button className='delete' onClick={() => swallDelete(music.id)}>
          <VscTrash size={30} />
        </button>
        <button className='edit' onClick={() => setSelectedMusic(music)}>
          <VscEdit size={30} />
        </button>
        <img src={music.musicPhoto ? music.musicPhoto : DefaultPhoto} alt="music" />
        <div className="text">
          <Link className='music-title' to={music.id}>{music.musicSinger} - {music.musicName}</Link>
          <p><b>Type:</b> {music.musicType}</p>
          <a href={music.musicUrl} target="_blank" rel="noopener noreferrer">
            <b>Go to Music!</b>
          </a>
        </div>
      </div>
    )
  );
};

export default MusicCard;