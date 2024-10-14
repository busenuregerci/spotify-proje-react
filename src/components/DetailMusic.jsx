import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataContext from '../context/DataContext';
import '../assets/style/detailMusic.scss';

const DetailMusic = () => {
  const { getMusicDetail, musicDetail } = useContext(DataContext); 
  const { musicId } = useParams();

  useEffect(() => {
    if (musicId) {
      getMusicDetail(musicId); 
    }
  }, []); 

  // const getYouTubeVideoId = (url) => {
  //   const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  //   const match = url.match(regExp);
  //   return match ? match[1] : null;
  // };

  const formatLyrics = (lyrics) => {
    return lyrics ? lyrics.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    )) : null;
  };

  return (
    <div className="detail-music-container">
      {musicDetail && (
        <>
          <img src={musicDetail.musicPhoto} className="album-art" alt="Album Art" />
          <h1 className="music-title">{musicDetail.musicName}</h1>
          <h2 className="music-artist">{musicDetail.musicSinger}</h2>
          <h3 className="music-type">{musicDetail.musicType}</h3>
          <p className="music-lyrics">
            {(musicDetail.musicLyrics)}
          </p>
{/* 
          {musicDetail.musicUrl && (
            <div className="youtube-video-container">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(musicDetail.musicUrl)}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div> */}
        

          <Link className="back-button" to="/home">
            <button className="button-64" role="button">
              <span className="text-back">𝄞⨾𓍢ִ໋ Back to music list 𝄞⨾𓍢ִ໋</span>
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default DetailMusic;
