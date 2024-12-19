import style from '/src/GallerySlider/GallerySlider.module.css'
function GallerySlider(props)
{
    let galleryPhotos=[{src: '/autumn.png',activated: true},{src: '/field.png', activated: false},{src: '/mountain.png', activated: false},{src: '/sunset.png', activated: false}]
    let howManyPhotos = 4;
    return(<>
            <div className={style.frame}>
            <div className={style.dotsContainer}>
                    {galleryPhotos.map((x,y)=><div key={y} className={x.activated===true?style.filledDot:style.emptyDot}/>)}
                </div>
                <h1 className={style.left}>{'<-'}</h1>
                <h1 className={style.right}>{'->'}</h1>
                    {galleryPhotos.map((x,y)=><img key={y} className={style.photo} src={`${x.src}`} alt={`${x.src}`}/>)}
                
            </div>
          </>)
}
export default GallerySlider;