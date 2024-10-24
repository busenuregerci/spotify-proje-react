import React, { useContext } from 'react';
import '../assets/style/musicCard.scss';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import DefaultPhoto from '../assets/img/TUNE IN.png';
import DataContext from '../context/DataContext';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MusicCard = ({ music }) => {
  const { swallDelete, search, dispatch } = useContext(DataContext);

  const musicNameMatches = music.musicName?.toLowerCase().includes(search.toLowerCase());
  const musicSingerMatches = music.musicSinger?.toLowerCase().includes(search.toLowerCase());
  const {user} = useSelector(state => state.auth)

  return (
    (musicNameMatches || musicSingerMatches) && (
      <div className='card'>
        {user && <>
          <button className='delete' onClick={() => swallDelete(music.id)}>
          <VscTrash size={30} />
        </button>
        <Link to="/add-music">
        <button className='edit' onClick={() => dispatch({type:"selectMusic", music})}>
          <VscEdit size={30} />
        </button>
        </Link>
        </>}
        
        
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