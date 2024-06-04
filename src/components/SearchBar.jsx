import React from 'react'
import {useState} from 'react'
const SearchBar = () => {

  const [searchWord,setWord]=useState('')
  const [data,setData]=useState(null)
  const handleInputChange=(event)=>{
    setWord(event.target.value);
  }


const handleSubmit=async (event)=>{
event.preventDefault();
const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`

try{
  const response=await fetch(url)
  const result=await response.json()
  setData(result)
  console.log(result);
  }

catch(error){
  console.error('Error fetching the dictionary API:', error);
}
  }

  return (
<>
    <form method="post" onSubmit={handleSubmit}>

     <div className="searchBar-container">
      
      <label htmlFor="searchBar">Search any WORD</label>
      <input className='searchBar' type="text" placeholder="WORD HUNT" id="searchBar" value={searchWord} onChange={handleInputChange}/>
      <button className='searchButton'>Search</button>
      
    </div>
    </form>

    {/*displaying result in html page*/}
    <div className="results-container">
        {/* && with data ensures that data is displayed only if present else false*/}
        {data && (
          <div className="result">
            <h3>Word: {data[0].word}</h3>
            <p>Phonetics: {data[0].phonetics.map((phonetic, index) => (
              <span key={index}>{phonetic.text} </span>
            ))}</p>
            <div>
              <h4>Meanings:</h4>
              {data[0].meanings.map((meaning, index) => (
                <div key={index}>
                  <h5>Part of Speech: {meaning.partOfSpeech}</h5>
                  <ul>
                    {meaning.definitions.map((definition, defIndex) => (
                      <li key={defIndex}>{definition.definition}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SearchBar