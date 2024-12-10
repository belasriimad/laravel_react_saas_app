import React, { useState } from "react"
import Word from "../words/Word"
import { alphabetsList } from "../../helpers/alphabetsList"
import { axiosRequest } from "../../helpers/config"
import SearchResults from "./SearchResults"
import { useDispatch, useSelector } from "react-redux"
import MenuItems from "../layouts/MenuItems"
import { setMessage } from "../../redux/slices/wordDetailsSlice"
import CardWrapper from '../layouts/elements/cards/CardWrapper'
import CardBody from '../layouts/elements/cards/CardBody'
import CardFooter from '../layouts/elements/cards/CardFooter'
import ActionButton from "../layouts/elements/buttons/ActionButton"
import RightMenu from '../layouts/RightMenu'

export default function BrowseWords() {
  const [words, setWords] = useState([])
  const { message } = useSelector(state => state.word)
  const { user, isLoggedIn } = useSelector(state => state.user)
  const dispatch = useDispatch()

  //define the word by character function
  const findWordByCharacter = async (character) => {
    clearState()
    try {
      const response = await axiosRequest.get(`words/${character}/starts`)
      if(response.data.data.length > 0) {
        setWords(response.data.data)
      }else {
        dispatch(setMessage('No results found !'))
      }
    } catch (error) {
      console.log(error)
    }
  }

  //clear state variables function
  const clearState = () => {
    setWords([])
    dispatch(setMessage(''))
  }

  return (
    <CardWrapper 
      cardClass="card main__card border border-dark border-3 bg-white my-5 rounded-0 shadow">
      <CardBody 
        cardBodyClass="card-body">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex flex-column justify-content-start">
                <div className="mb-3">
                    {
                        alphabetsList.map((alphabet, index) => (
                          <ActionButton
                            buttonType="button"
                            buttonClass="btn bt-sm btn-dark rounded-0 me-1 mb-1" key={index}
                            buttonDisabled={!isLoggedIn || isLoggedIn && user?.number_of_hearts === 0}
                            buttonAction={() => findWordByCharacter(alphabet)}
                          >
                            {alphabet}
                          </ActionButton>
                        ))
                    }
                </div>
                <RightMenu />
            </div>
            {
              message ? (
                <div className="mt-2 text-center">
                  <span className="fw-bold">{message}</span>
                </div>
              ) : (
                <SearchResults 
                  words={words} 
                  clearState={clearState} 
                  setSearchTerm={null}
                />
              )
            }
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
