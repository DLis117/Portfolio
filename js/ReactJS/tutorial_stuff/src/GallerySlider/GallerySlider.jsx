import { useState } from 'react';
import style from '/src/GallerySlider/GallerySlider.module.css'
function GallerySlider(props)
{
    let [galleryPhotos,setGalleryPhotos]=useState([{src: '/autumn.png',activated: true},{src: '/field.png', activated: false},{src: '/mountain.png', activated: false},{src: '/sunset.png', activated: false}])
    let photoWidth=30;//30vw
    let [slideVal,setSlideVal]=useState(0);

    //to make a slider I've created a container for photos, I aligned photos horizontally next to each other
    //then resized each photo to fit the frame 
    //and now to slide I will change the value of translateX() property in photosContainer div

    function handleLeft()
    {
        if(slideVal<0)
        {
            setSlideVal(s=>s+photoWidth);
            setGalleryPhotos(g=>g.map((x,y)=>({...x,activated:y===((slideVal+photoWidth)/photoWidth*-1)?true:false})))
        } 
    }
    function handleRight()
    {
        if(slideVal>(galleryPhotos.length-1)*(photoWidth*-1))
        {
            setSlideVal(s=>s-photoWidth);
            setGalleryPhotos(g=>g.map((x,y)=>({...x,activated:y===((slideVal-photoWidth)/photoWidth*-1)?true:false})))
        } 
    }
    function handleDotClick(y)
    {
        setSlideVal(y*photoWidth*-1);
        setGalleryPhotos(g=>g.map((x,z)=>({...x,activated:y===z?true:false})))
    }
    return(<>
            <div className={style.frame}>
                <div className={style.dotsContainer}>
                    {galleryPhotos.map((x,y)=><div key={y} className={x.activated===true?style.whiteDot:style.grayDot} onClick={()=>handleDotClick(y)}/>)}
                </div>
                
                <h1 className={style.left} onClick={handleLeft}>{'◀'}</h1>
                <h1 className={style.right} onClick={handleRight}>{'▶'}</h1>

                <div className={style.photoContainer} style={{transform: `translateX(${slideVal}vw)`}}>
                    {galleryPhotos.map((x,y)=><img key={y} className={style.photo} src={`${x.src}`} alt={`${x.src}`}/>)}
                </div>
                
            </div>
          </>)
}
export default GallerySlider;