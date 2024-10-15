export const initialState = {
    musicList:[],
    categories:[],
    selectedCategory:"All Musics",
    search:"",
    selectedMusic:"",
    musicName:"",
    musicSinger:"",
    musicUrl:"",
    musicPhoto:"",
    musicType:"Select Music Type",
    musicLyrics:"",
    musicDetail:""

}

export const reducer = (state,action) => {
    switch(action.type){
        // case-1
        case "getMusics" : return{
            ...state,
            musicList:action.payload
        }
        // case-2
        case "getCategories" : return{
            ...state,
            categories:action.payload
        }
        // case-3
        case "addMusic" : 
        const updateMusicList = [...state.musicList, action.newMusic]
        return{
            ...state,
            musicList:updateMusicList
        }
        // case-4
        case "updateMusic" :
        const editedMusicList = state.musicList.map(music =>{
            if(music.id === state.selectedMusic.id){
                return{...action.newMusic}
            }else{
                return{...music}
            }
            })
            return{
                ...state,
                musicList:editedMusicList,
                selectedMusic:""
        }
        // case-5
        case "deleteMusic":
        const newMusicList= state.musicList.filter(music=>music.id !== action.id)
            return{
                ...state,
                musicList: newMusicList
        }
        // case-6
        case "resetForm": return{
            ...state,
            musicName:"",
            musicSinger:"",
            musicUrl:"",
            musicPhoto:"",
            musicType:"Select Music Type",
            musicLyrics:""
        }
        // case-7
        case "musicSinger" : return{
            ...state,
            musicSinger: action.payload
        }
        // case-8
        case "musicName": return{
            ...state,
            musicName: action.payload
        }
        // case-9
        case "musicUrl": return{
            ...state,
            musicUrl: action.payload
        }
        // case-10
        case "musicPhoto": return {
            ...state,
            musicPhoto: action.payload
        }
        // case-11
        case "musicType": return{
            ...state,
            musicType: action.payload
        }
        // case-12
        case "lyrics" : return{
            ...state,
            musicLyrics: action.payload
        }
        // case-13 searchbar'da kontrol et !!!!
        case "initialCategory": return{
            ...state,
            selectedCategory: "All Musics"
        }
        // case-14
        case "categorySelect" : return{
            ...state,
            selectedCategory: action.payload
        }
        // case-15
        case "search" : return{
            ...state,
            search: action.payload
        }
        // case-16 musiccard
        case "selectMusic" : 
        const selection = action.music
        return{
            ...state,
            selectedMusic: selection,
            musicName:selection.musicName,
            musicSinger:selection.musicSinger,
            musicUrl:selection.musicUrl,
            musicPhoto:selection.musicPhoto,
            musicType:selection.musicType,
            musicLyrics:selection.musicLyrics

        }
        case "musicDetail" : return{
            ...state,
            musicDetail: action.payload
        }
        case "clearSelectMusic" : return{
            ...state,
            selectedMusic: "",
            musicName:"",
            musicSinger:"",
            musicUrl:"",
            musicPhoto:"",
            musicType:"",
            musicLyrics:""
        }
    }
}