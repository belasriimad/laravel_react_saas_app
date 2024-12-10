import React from 'react'
import { useSelector } from 'react-redux'

export default function Word() {
    const { wordDetails } = useSelector(state => state.word)
    const synth = window.speechSynthesis

    return (
        <div className="my-3">
            <div className="d-flex justify-content-start align-items-center">
                {
                    wordDetails && <span className="volume__icon" 
                            onClick={() => synth.speak(new SpeechSynthesisUtterance(wordDetails?.name)) }
                        >
                        <i className="bi bi-volume-up-fill h2"></i>
                    </span>
                }
                <h5 className="fw-bold ms-2">
                    { wordDetails?.name }
                </h5>
            </div>
            <div className="d-flex flex-column justify-content-start">
                {
                    wordDetails?.definitions.map(definition => (
                        <div key={definition.id}>
                            <span className="fw-bold">
                                { definition.part_of_speech }
                            </span>
                            <p className="d-flex flex-column">
                                <span className="text-danger">
                                    { definition.meaning }
                                </span>
                                <span>
                                    { definition.example_sentence }
                                </span>
                            </p>
                        </div>
                    ))
                }
                {
                    wordDetails?.synonyms.map(synonym => (
                        <div className="d-flex flex-wrap justify-content-start"
                            key={synonym.id}>
                            {
                                synonym.similars.split(',').map((similar, index) => (
                                    <span className="badge bg-secondary ms-1"
                                        key={index}>
                                        { similar }
                                    </span>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
