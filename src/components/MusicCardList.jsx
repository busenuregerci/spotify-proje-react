import React, { useContext } from 'react'
import MusicCard from './MusicCard'
import '../assets/style/musicCardList.scss'
import DataContext from '../context/DataContext'
import { PiMusicNotesPlus } from "react-icons/pi";
import { Link } from 'react-router-dom';

const MusicCardList = () => {
  const {musicList,selectedCategory} = useContext(DataContext);
  // console.log("Music List:", musicList); 

  return ( 
    <div className="card-list-container">
      <Link to="/add-music" className='add-new-btn'> 
      <PiMusicNotesPlus /> 
  </Link>
    <div className='card-list'>
      
      {
        musicList.map(music =>
          !music.isDeleted &&
        (selectedCategory === "All Musics" || music.musicType === selectedCategory) &&
          <MusicCard key={music.id} music={music}/>
        )
      }
    </div>
    </div>
  
  )
}

export default MusicCardList