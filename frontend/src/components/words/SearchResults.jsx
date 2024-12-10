import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWordDetails } from '../../redux/slices/wordDetailsSlice'
import { decrementUserHearts } from '../../redux/slices/userSlice'

export default function SearchResults({ words, clearState, setSearchTerm }) {
    const { token } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const persistWordDetails = (word) => {
        dispatch(setWordDetails(word))
        dispatch(decrementUserHearts(token))
        clearState()
        if(setSearchTerm) {
            setSearchTerm('')
        }
    }

    return (
        <ul className="list-group my-3">
            {
                words?.map(word => (
                    <li className="list-group-item border border-primary border-2 
                        rounded-0 mb-2" key={word.slug}>
                        <div className="d-flex justify-content-between"
                            onClick={() => persistWordDetails(word)}
                            style={{cursor: 'pointer'}}
                        >
                            <span className="fw-bold">
                                { word.name }
                            </span>
                            <span className="fw-bold">
                                <i className="bi bi-arrow-right"></i>
                            </span>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
