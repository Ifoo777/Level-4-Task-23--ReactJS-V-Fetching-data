import React, { Component } from 'react'

export class Dictionary extends Component {

  constructor(props) {
    super(props);
    this.state = {
    error: false,
    isLoaded: false,
    items: [],
    searchWord:"example"};
    }

    // Fetch the data from the API
    search() {
      
      // If the user enters blank, then give example of the word example
      let search = this.state.searchWord;
      if(search === ""){
        search="example";
      }

      // Fetch data from API and update
      fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${search}?key=6cf322a5-12f5-4e47-805b-10bb76eeb82c`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          items: result, 
        });
        console.log(result);
      },
      (error) => {
        this.setState({
        isLoaded: true,
        error
        });
      }); 
      console.log(this.state.items); 
    }

    // Update the search word state
    updateWord(input){
      this.setState({
        searchWord:input
      }
    )}

  //Render based on results
  render() {
    const { error, isLoaded, items} = this.state;

    if (error) { return <div>Error: {error.message}</div>;
    } 
   
    else {
      return(
        <div>

          <input value={this.state.searchWord.toUpperCase()}   name="searchWord" onChange={e => {this.updateWord(e.target.value)}} />
          <button onClick={() =>{ this.setState({isLoaded: false }); this.search()}}>SEARCH</button>
        
          {items.map((element, main_index) => {
            return(
              <div key={main_index}>

                <h2><u>{element.fl}</u></h2>

                <div className="example_word">

                  <h3>
                    {element.meta.stems.map((element, index) => (
                      <span key={index} >{element}, </span>           
                    ))}
                  </h3>

                  <ul className='word_definition'>
                    {element.shortdef.map((element, index) => (
                      <li key={index}>{element}</li>           
                    ))}
                  </ul>

                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

export default Dictionary