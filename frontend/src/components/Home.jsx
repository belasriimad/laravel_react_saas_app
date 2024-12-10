import React from 'react'
import SearchBox from './words/SearchBox'
import Word from './words/Word'
import MenuItems from './layouts/MenuItems'
import CardWrapper from './layouts/elements/cards/CardWrapper'
import CardBody from './layouts/elements/cards/CardBody'
import CardFooter from './layouts/elements/cards/CardFooter'

export default function Home() {
  return (
    <CardWrapper             
      cardClass="card main__card border border-dark border-3 bg-white my-5 rounded-0 shadow">
      <CardBody 
        cardBodyClass="card-body">
        <div className="row">
          <div className="col-md-12">
            <SearchBox />
            <Word />
          </div>
        </div>
      </CardBody>
      <CardFooter 
        cardFooterClass="card-footer bg-white">
        <MenuItems />
      </CardFooter>
    </CardWrapper>
  )
}
