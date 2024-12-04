import Form from "./Form"
function App() 
{
  let uraniumStyle={backgroundImage: 'url("/uranium.png")'}
  let plutoniumStyle={backgroundImage: 'url("/plutonium.png")'}
  let radiumStyle={backgroundImage: 'url("/radium.png")'}

  return(<>
          <Form element="uranium" styles={uraniumStyle}/>
          <Form element="plutonium" styles={plutoniumStyle}/>
          <Form element="radium" styles={radiumStyle}/>
        </>)
}

export default App
