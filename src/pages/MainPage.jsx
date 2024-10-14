import React from 'react'
import PageIntro from '../components/PageIntro'
import Searchbar from '../components/Searchbar'
import MusicCardList from '../components/MusicCardList'

const MainPage = () => {
  return (
    <>
      <PageIntro/>
      <Searchbar/>
      <MusicCardList/>
    </>
  )
}

export default MainPage