import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    e.persist();
    // let type = e.target.value
    this.setState(prevState => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        type: e.target.value
      }
    }))
  }

  onAdoptPet = (id) => {
    let pets = this.state.pets.map(pet => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet
    })
    this.setState({pets: pets})
  }

  onFindPetsClick = () => {
    let url = (this.state.filters.type === 'all') ? '/api/pets' : `/api/pets?type=${this.state.filters.type}`
    // let url;
    // if(this.state.filters.type === 'all'){
    //   url = '/api/pets'
    // }else{
    //   url = `/api/pets?type=${this.state.filters.type}`
    // }
    fetch(url)
    .then(res => res.json())
    .then(petsData => this.setState({pets: petsData}))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onFindPetsClick={this.onFindPetsClick}
              onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              onAdoptPet={this.onAdoptPet}
              pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
