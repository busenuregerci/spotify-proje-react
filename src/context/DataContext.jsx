import React, { createContext,useEffect, useReducer } from 'react'
import Swal from 'sweetalert2';
import AddBack from '../assets/img/back.png'
import AddGif from '../assets/img/music.gif'
import axios from 'axios'
import { Bounce, toast } from "react-toastify"
import { initialState, reducer } from "../reducer/reducer";


// Contex yaratılır
const DataContext = createContext();

export const DataProvider = ({children}) =>{
    
  const[state,dispatch] = useReducer(reducer,initialState)
  const{musicList, selectedMusic} = state;

    const getMusics = async() => {
        const url = "http://localhost:3000/musics";
        const response = await fetch(url);
        const musics = await response.json();
        // case-1
        dispatch({type:"getMusics", payload:musics})
      
    }
    const getCategories = async ()=>{
      const url ="http://localhost:3000/categories"
      const response = await axios.get(url);
      const categories = await response.data;
      // case-2
      dispatch({type:"getCategories",payload:categories})
    }
    const addMusic = async (newMusic) => {
        let url = "http://localhost:3000/musics";
        
        // Eğer yeni müzik ekleniyorsa
        if (!selectedMusic) {
          newMusic.id =(Number(musicList[musicList.length-1].id)+1).toString();
          // case-3
          dispatch({type:"addMusic", newMusic})
          const response = await axios.post(url, newMusic);
          console.log(response.data);
          Swal.fire({
            title: "Music added successfully!",
            width: 600,
            padding: "3em",
            color: "#00ADB5",
            background: `url(${AddBack}) no-repeat center center / cover`, 
            backdrop: `
              rgba(0,0,123,0.4)
              url(${AddGif}) 
              left top
              no-repeat
            `,
            showConfirmButton: true,
            confirmButtonText: "Okay"
          });
        } 
        // Eğer müzik güncelleniyorsa
        else {
          url += `/${selectedMusic.id}`;
          newMusic.id = selectedMusic.id;
          const response = await axios.put(url, newMusic);
          console.log(response.data);
      
          // Frontend'de müzik listesi güncellemesi
          // case-4
          dispatch({type:"updateMusic", newMusic})

          toast.warn('👌 Music edited successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }
      };

    const deleteMusic = async (id) =>{
      // case-5
        dispatch({type:"deleteMusic",id})
        const url = `http://localhost:3000/musics/${id}`  
        const response = await axios.patch(url,{isDeleted:true})
        console.log(response)
      };

    const swallDelete = async (id) => { 
        const musicToDelete = musicList.find(music => music.id === id); 
    
        if (!musicToDelete) {
            Swal.fire('Error', 'Music not found', 'error');
            return;
        }
    
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${musicToDelete.musicSinger} - ${musicToDelete.musicName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });
        
        if (result.isConfirmed) {
            try {
                await deleteMusic(id);
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Music deleted successfully',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
            } catch (error) {
                Swal.fire('Error', 'There was a problem deleting the music', 'error');
            }
        }
    };
      const handleSubmit = (e) => {
        e.preventDefault();
        addMusic({
            // id: (Number(musicList[musicList.length - 1].id) + 1).toString(), 
            musicName: state.musicName,
            musicSinger: state.musicSinger,
            musicPhoto: state.musicPhoto,
            musicType: state.musicType,
            musicUrl: state.musicUrl,
            musicLyrics: state.lyrics, 
        });
        // case-6
        dispatch({type:"resetForm"})
    };
    const getMusicDetail = async(id) =>{
      const musicDetail = musicList.find(music => music.id === id); 
    
      dispatch({ type: "musicDetail", payload: musicDetail }); 
    }

   
  

      useEffect(() =>{
        getMusics();
        console.log("use effect çalıştı detay")
      },[selectedMusic])

    useEffect(() =>{
        getCategories();
        console.log("use effect çalıştı kategori")
      },[])

    return <DataContext.Provider value={{
       
            
            handleSubmit,
            swallDelete,
            ...state,
            dispatch,
            getMusicDetail
    }}>
        {children}
    </DataContext.Provider>
}

export default DataContext