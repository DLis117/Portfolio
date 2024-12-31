import AccordionComponent from './AccordionComponent/AccordionComponent'
import StarRating from './StarRating/StarRating'
import AdvancedStarRating from './AdvancedStarRating/AdvancedStarRating'
import GallerySlider from './GallerySlider/GallerySlider'
// import LoadingScreen from './loadingScreen/LoadingScreen'
import ApiDataGallery from './ApiDataGallery/ApiDataGallery'
let info = [
            {info: 'Mercury is the planet nearest to the Sun',
             additionalInfo: "and the smallest planet in our solar system",
             additionalInfoActivated: false},

            {info: 'Venus is the second planet from the Sun',
            additionalInfo: "and the sixth largest planet",
            additionalInfoActivated: false},

            {info: 'Earth – our home planet – is the third planet from the Sun',
            additionalInfo: "and the fifth largest planet",
            additionalInfoActivated: false,}
    ]

let urlForGallery=`https://picsum.photos/v2/list?page=${1}&limit=${10}`;

function App() {
  return(
          <>
          <AccordionComponent info={info}/>
          <AccordionComponent/>
          <StarRating/>
          <AdvancedStarRating/>
          <GallerySlider/>
          {/* <LoadingScreen/> */}
          <ApiDataGallery url={urlForGallery}/>
          </>
        )
}

export default App
