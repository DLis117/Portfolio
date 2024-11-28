import CardComponent from "./Card/Card.jsx"
let mountainpic='/mountain.png';
let fieldpic='/field.png';
let autumnpic='/autumn.png';
let sunsetpic='/sunset.png';
function App() {
  return (<>
            <CardComponent pic={mountainpic} desc='this card shows mountains' name='mountain card' key={0}/>
            <CardComponent pic={fieldpic} desc='this card shows fields' name='fields card' key={1}/>
            <CardComponent pic={autumnpic} desc='this card shows autumn' name='autumn card' key={2}/>
            <CardComponent pic={sunsetpic} desc='this card shows sunset' name='sunset card' key={3}/>
            <CardComponent/>
         </>
  );
}

export default App
