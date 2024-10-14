import React, { useContext } from 'react';
import '../assets/style/searchbar.scss';
import DataContext from '../context/DataContext';

const Searchbar = () => {
  const{ categories, dispatch} = useContext(DataContext);
  return (
    <div className="searchbar-container">
      <div className="categories">
        <ul className="categories-list">
          <li onClick={() => dispatch({type:"initialCategory", payload: "All Musics"})}>All Musics</li>
          {
            categories.map(category => 
              <li onClick={(e) => dispatch({type:"categorySelect", payload:e.target.innerText})} key={category.id}>{category.categoryName}</li>
            )
          }
        </ul>
      </div>
      <div className="search-box">
        <input onChange={e=>dispatch({type:"search", payload: e.target.value})} type="text" placeholder="Find musics..." />
        <button type="submit">Search</button>
      </div>
    </div>
  );
};

export default Searchbar;
