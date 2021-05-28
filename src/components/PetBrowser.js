import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  genCard(){
    return this.props.pets.map((pet, idx) => {
      return <Pet key={idx} {...pet} onAdoptPet={this.props.onAdoptPet}/>
    })
  }
  render() {
    return <div className="ui cards">{this.genCard()}</div>
  }
}

export default PetBrowser
