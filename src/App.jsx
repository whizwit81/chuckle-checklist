import "./App.css"
import { useEffect, useState } from "react"
import { deleteJoke, editJoke, getAllJokes, newJokeAdded } from "./jokeService"
import stevePic from "./assets/steve.png"

export const App = () => {
    const [newUserInput, setNewUserInput] = useState("")
    const [allJokes, setAllJokes] = useState([])
    const [toldJokes, setToldJokes] = useState([])
    const [untoldJokes, setUntoldJokes] = useState([])
    const [count, setCount] = useState(0)
    
  
    

    useEffect(() => {
      forceRefresh()
    },[])
   
    const forceRefresh = () => {
      getAllJokes().then((jokesArray) => {
        setAllJokes(jokesArray)
    })}


    useEffect(() => {

      const allJokesTold = allJokes.filter(joke => joke.told === true)
      setToldJokes(allJokesTold)

      const allUntoldJokes = allJokes.filter(joke => joke.told === false)
      setUntoldJokes(allUntoldJokes)
  
    }, [allJokes])
    
  

  return (

    <div className="app-container"> 

      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>

          <div className="app-heading-text">
            <h1>Chuckles Checklist</h1>
          </div>

  <div className="">       
      <div>
          <h2 className="joke-label">Add Joke</h2>

          <div className="joke-add-form">
            
          <input className="joke-input" value={newUserInput} type="text" id="users-input" placeholder="New One Liner" onChange={(event) => {
          // What's the value of event?
          setNewUserInput(event.target.value)}}/>

          <button className="joke-input-submit"onClick={() => {
            if(newUserInput !== "" ) {
           setCount(count + 1)
            newJokeAdded(newUserInput)
            setNewUserInput("")
            forceRefresh()}
            else{window.alert("Must have text")}
            }} >Add</button>
        </div>
        
        </div>         
          <div className="joke-lists-container">
            <div className="joke-list-container-heading">

              <div className="joke-list-container">
                <h2 className="joke-label">😏Untold<span className="untold-count">{count}</span></h2>

                  {untoldJokes.map(joke => {
                  return <li className="joke-list-item">
                    <p className="joke-list-item-text">{joke.text}</p>
                    <div className="joke-btns">
                    <button onClick={async() => { 
                      editJoke(joke)
                      await forceRefresh()    
                    }} >😏</button>
                    <button onClick={() => { 
                      deleteJoke(joke)
                     forceRefresh()    
                    }} >🗑️</button>
                    </div>
                          </li>
                      })}
            </div>
          </div>
        
          <div className="joke-list-container">
            <div className="joke-list-container-heading">
              <h2 className="joke-label">😑Told<span className="told-count">{count}</span></h2>
        
                {toldJokes.map(joke => {
                return <li className="joke-list-item">
                  <p className="joke-list-item-text">{joke.text}</p>
                  <div className="joke-btns">
                    <button className=""
                      onClick={async() => { 
                      editJoke(joke)
                      await forceRefresh()    
                    }} >😑</button>
                    <button onClick={() => { 
                      deleteJoke(joke)
                      forceRefresh()    
                    }} >🗑️</button>
                  </div>
                      </li>
                      })}
              </div>
            </div>
          </div>
        </div>
                        
      </div>
    </div> 
    )
}

