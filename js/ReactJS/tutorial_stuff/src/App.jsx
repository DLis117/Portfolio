import AccordionComponent from './AccordionComponent/AccordionComponent'
import StarRating from './StarRating/StarRating'
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

function App() {
  return(
          <><AccordionComponent info={info}/>
          <AccordionComponent/>
          <StarRating/>
          </>
        )
}

export default App
