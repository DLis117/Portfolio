import { useState,useEffect,useRef } from 'react';
import style from '/src/ApiDataGallery/ApiDataGallery.module.css'
function GallerySlider(props)
{
    let [limit,setLimit]=useState(props.limit);
    let [url,setUrl] = useState(`${props.url}&limit=${props.limit}`); //url to fetch from
    let [loading,setLoading] = useState(false); //if data is being loaded (i think it has to trigger rerender) thats why useState
    let [galleryPhotos,setGalleryPhotos]=useState([])
    let [slideVal,setSlideVal]=useState(0);
    let photoWidth=30;//30vw
    let howManyToLoad=5;

    
    async function fetchData()
    {
        try
        {            
            setLoading(true); //indicate that you are loading the data
            let response = await fetch(url)
            if(response.ok)
            {
                return response
            }
            else 
            {
                throw new Error('data load failed');
            }
        }
        catch (e)
        {
            throw e;
        }
    }
    async function loadData()
    {
        try
        {
            const loadedResponse = await fetchData();
            let array = await loadedResponse.json();
            setGalleryPhotos(array.map((x,y)=>({src:x.download_url,activated:y===((slideVal/photoWidth)*-1)})))
            setLoading(false); //indicate that you have finished loading the data
            
        }
        catch(e)
        {
            console.log(e);
        }
    }

    useEffect(()=>{
        loadData(); //to do next: only load data if response changed
    },[url])


    //to make a slider I've created a container for photos, I aligned photos horizontally next to each other
    //then resized each photo to fit the frame 
    //and now to slide I will change the value of translateX() property in photosContainer div
    
    function loadMore()
    {
        let newLimit=limit+howManyToLoad;
        setLimit(newLimit)
        let newUrl=`${props.url}&limit=${newLimit}`
        setUrl(newUrl)
        
        // loadData(); theres no need for it anymore since url change will trgger a rerender bc of useEffect
    }
    function handleLeft()
    {
        if(slideVal<0)
        {
            setSlideVal(s=>s+photoWidth);
            setGalleryPhotos(g=>g.map((x,y)=>({...x,activated:y===((slideVal+photoWidth)/photoWidth*-1)})))
        } 
    }
    function handleRight()
    {
        if(slideVal<=(galleryPhotos.length-1)*(photoWidth*-1))
        {
            loadMore();
        }
        else if(slideVal>(galleryPhotos.length-1)*(photoWidth*-1))
        {
            setSlideVal(s=>s-photoWidth);
            setGalleryPhotos(g=>g.map((x,y)=>({...x,activated:y===((slideVal-photoWidth)/photoWidth*-1)})))
        } 
    }
    function handleDotClick(y)
    {
        setSlideVal(y*photoWidth*-1);
        setGalleryPhotos(g=>g.map((x,z)=>({...x,activated:y===z})))
    }
    
    let gallery = <><div className={style.dotsContainer}>{galleryPhotos.map((x,y)=><div key={y} className={x.activated===true?style.whiteDot:style.grayDot} onClick={()=>handleDotClick(y)}/>)}</div>
                
                <h1 className={style.left} onClick={handleLeft}>{'◀'}</h1>
                <h1 className={style.right} onClick={handleRight}>{'▶'}</h1>

                <div className={style.photoContainer} style={{transform: `translateX(${slideVal}vw)`}}>
                    {galleryPhotos.map((x,y)=><img key={y} className={style.photo} src={`${x.src}`} alt={`${x.src}`}/>)}
                </div>
                </>

    let loadingInfo = <h1>loading ...</h1>
    return(<>
            <div className={style.frame}>
                {loading===true?loadingInfo:gallery}
            </div>
          </>)
}
export default GallerySlider;