import ListofElements from "./List/List"

let l=['apple','banana','orange'];
let l2=['tomato','potato','carrot','lettuce'];

let lCategory='fruits';
let l2Category='vegetables';

function App() 
{
  return (<>
            <ListofElements list={l} category={lCategory}/>
            <ListofElements list={l2} category={l2Category}/>
            <ListofElements/>
          </>
  );
}

export default App
