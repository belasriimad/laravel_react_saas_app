import React, { useEffect, useState } from 'react'
import SearchResults from './SearchResults'
import { useDebounce } from 'use-debounce'
import { axiosRequest } from '../../helpers/config'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../../redux/slices/wordDetailsSlice'
import Input from '../layouts/elements/Input'
import RightMenu from '../layouts/RightMenu'

export default function SearchBox() {
  //define the state variables
  const [words, setWords] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const { message } = useSelector(state => state.word)
  const { user, isLoggedIn } = useSelector(state => state.user)
  const dispatch = useDispatch()

  //find words by search term
  useEffect(() => {
    //define the function
    const findWordsByTerm = async () => {
      clearState()
      try {
        const response = await axiosRequest.get(`words/${debouncedSearchTerm[0]}/find`)
        if(response.data.data.length > 0) {
          setWords(response.data.data)
        }else {
          dispatch(setMessage('No results found !'))
        }
      } catch (error) {
        console.log(error)
      }
    }
    if(debouncedSearchTerm[0]) {
      findWordsByTerm()
    }else {
      clearState()
    }
  },[debouncedSearchTerm[0]])

  //clear state variables function
  const clearState = () => {
    setWords([])
    dispatch(setMessage(''))
  }

  return (
    <div className="row my-4">
      <div className="col-md-12">
        <div className="d-flex justify-content-between">
          <div className="mb-3 w-50">
            <Input
              fieldType="text"
              fieldClass="form-control p-2 border border-dark border-3 rounded-0"
              fieldName="searchTerm"
              fieldId="searchTerm"
              fieldPlaceholder="Let's find your word"
              filedValue={searchTerm}
              fieldAction={(e) => setSearchTerm(e.target.value)}
              fieldDisabled={!isLoggedIn || isLoggedIn && user?.number_of_hearts === 0}
            />
            {
              message ?  
                <div className="mt-2 text-center">
                  <span className="fw-bold">
                    { message }
                  </span>
                </div>
              :
              <SearchResults 
                words={words}
                clearState={clearState}
                setSearchTerm={setSearchTerm}
              />
            }
          </div>
          <RightMenu />
        </div>
      </div>
    </div>
  )
}
