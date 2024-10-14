import React, { createContext,useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import AddBack from '../assets/img/back.png'
import AddGif from '../assets/img/music.gif'
import axios from 'axios'
import { Bounce, toast } from "react-toastify"


// Contex yaratılır
const DataContext = createContext();

export const DataProvider = ({children}) =>{
    const[musicList,setMusicList] = useState([]);
    const[categories, setCategories] = useState([]);
    const[selectedCategory, setSelectedCategory] = useState("All Musics");
    const[search, setSearch] = useState("");
    const[selectedMusic, setSelectedMusic] = useState("")
    const [musicName, setMusicName] = useState("");
    const [musicSinger, setMusicSinger] = useState("");
    const [musicUrl, setMusicUrl] = useState("");
    const [musicPhoto, setMusicPhoto] = useState("");
    const [musicType, setMusicType] = useState("Select Music Type");
    const [lyrics, setLyrics] = useState("");
    const[musicDetail, setMusicDetail] = useState(""); 

    const getMusics = async() => {
        const url = "http://localhost:3000/musics";
        const response = await fetch(url);
        const musics = await response.json();
        setMusicList(musics)
      
    }
    const getCategories = async ()=>{
      const url ="http://localhost:3000/categories"
      const response = await axios.get(url);
      const categories = await response.data;
      setCategories(categories);
    }
    const addMusic = async (newMusic) => {
        let url = "http://localhost:3000/musics";
        
        // Eğer yeni müzik ekleniyorsa
        if (!selectedMusic) {
          newMusic.id =(Number(musicList[musicList.length-1].id)+1).toString();
          setMusicList(prev => [...prev, newMusic]); // Yeni müziği ekle
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
          const response = await axios.put(url, newMusic);
          console.log(response.data);
      
          // Frontend'de müzik listesi güncellemesi
          setMusicList(prev => prev.map(music => {
            if (music.id === selectedMusic.id) {
              return {...newMusic }; // Mevcut müziği güncelle
            } else {
              return music; // Değişmeyen müzikleri olduğu gibi bırak
            }
          }));
          setSelectedMusic("")
          toast.warn('👌 Music edited successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
        }
      };

    const deleteMusic = async (id) =>{
        setMusicList(prev => prev.filter(statedenGelen => statedenGelen.id !== id))
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
            id: (Number(musicList[musicList.length - 1].id) + 1).toString(), 
            musicName: musicName,
            musicSinger: musicSinger,
            musicPhoto: musicPhoto,
            musicType: musicType,
            musicUrl: musicUrl,
            musicLyrics: lyrics, 
        });
        setMusicName("");
        setMusicSinger("");
        setMusicPhoto("");
        setMusicType("Select Music Type");
        setMusicUrl("");
        setLyrics(""); 
    };
    const getMusicDetail = async(id) =>{
      
      const url = `http://localhost:3000/musics/${id}`  
      const response = await axios.get(url);
      setMusicDetail(response.data); // find!!
      console.log(response)
    }
    

    useEffect(() => {
      if (selectedMusic) {
        setMusicName(selectedMusic.musicName);
        setMusicSinger(selectedMusic.musicSinger);
        setMusicPhoto(selectedMusic.musicPhoto);
        setMusicType(selectedMusic.musicType);
        setMusicUrl(selectedMusic.musicUrl);
        setLyrics(selectedMusic.musicLyrics); 
        console.log('Selected Music Lyrics:', selectedMusic.musicLyrics);
      }
    }, [selectedMusic]);

      useEffect(() =>{
        getMusics();
        console.log("use effect çalıştı detay")
      },[selectedMusic])

    useEffect(() =>{
        getCategories();
        console.log("use effect çalıştı kategori")
      },[])

    return <DataContext.Provider value={{
        setSelectedCategory, 
            setSearch, 
            categories, 
            handleSubmit,
            selectedMusic,
            musicName,
            musicType,
            musicSinger,
            musicPhoto,
            musicUrl,
            lyrics, 
            setMusicName,
            setMusicType,
            setMusicSinger,
            setMusicPhoto,
            setMusicUrl,
            setLyrics, 
            musicList,  
            selectedCategory, 
            swallDelete, 
            search, 
            setSelectedMusic,
            musicDetail,
            setMusicDetail,
            getMusicDetail
    }}>
        {children}
    </DataContext.Provider>
}

export default DataContext