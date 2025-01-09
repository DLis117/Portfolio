import AccordionComponent from './AccordionComponent/AccordionComponent'
import StarRating from './StarRating/StarRating'
import AdvancedStarRating from './AdvancedStarRating/AdvancedStarRating'
import GallerySlider from './GallerySlider/GallerySlider'
// import LoadingScreen from './loadingScreen/LoadingScreen'
import ApiDataGallery from './ApiDataGallery/ApiDataGallery'
import Test from './Test/Test'
import LoadMoreData from './LoadMoreData/LoadMoreData'
import RecursiveNavBar from '/src/RecursiveNavBar/RecursiveNavBar'
import ThemedComponent from './LightDarkModeTheme/ThemedComponent'
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

let urlForGallery=`https://picsum.photos/v2/list?page=${1}`;

export let navBarData = [
        {
          id: 1,
          label: "Home",
          url: "/home",
          children: []
        },
        {
          id: 2,
          label: "About Us",
          url: "/about",
          children: [
            {
              id: 3,
              label: "Our Team",
              url: "/about/team",
              children: [
                {
                  id: 4,
                  label: "Leadership",
                  url: "/about/team/leadership",
                  children: []
                },
                {
                  id: 5,
                  label: "Staff",
                  url: "/about/team/staff",
                  children: []
                },
              ]
            },
            {
              id: 6,
              label: "Our History",
              url: "/about/history",
              children: []
            },
          ]
        },
        {
          id: 7,
          label: "Services",
          url: "/services",
          children: [
            {
              id: 8,
              label: "Consulting",
              url: "/services/consulting",
              children: []
            },
            {
              id: 9,
              label: "Implementation",
              url: "/services/implementation",
              children: [
                {
                  id: 10,
                  label: "Software Development",
                  url: "/services/implementation/software-development",
                  children: []
                },
                {
                  id: 11,
                  label: "System Integration",
                  url: "/services/implementation/system-integration",
                  children: []
                },
              ]
            },
          ]
        },
        {
          id: 12,
          label: "Contact",
          url: "/contact",
          children: [
            {
              id: 13,
              label: "Support",
              url: "/contact/support",
              children: []
            },
            {
              id: 14,
              label: "Sales",
              url: "/contact/sales",
              children: []
            },
          ]
        },
      ];

function App() {
  return(
          <>
          {/* <AccordionComponent info={info}/> */}
          {/* <AccordionComponent/> */}
          {/* <StarRating/> */}
          {/* <AdvancedStarRating/> */}
          {/* <GallerySlider/> */}
          {/* <LoadingScreen/> */}
          {/* <ApiDataGallery url={urlForGallery} limit={10}/> */}
          {/* <Test/> */}
          {/* <LoadMoreData url={urlForGallery} limit={10}/> */}
          {/* <RecursiveNavBar data={navBarData}/> */}
          <ThemedComponent/>
          </>
        )
}

export default App
