import React, {useState, useEffect, useRef} from 'react'

export default function Flashcard({ flashcard }) {
    const [flip, setFlip] = useState(false);

    const [height, setHeight] = useState('initial');

    const frontEl = useRef();
    const backEl = useRef();

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        const maxHeight = Math.max(frontHeight, backHeight);
        setHeight(maxHeight);
    }

    useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight);
        return () => window.removeEventListener('resize', setMaxHeight);
    }, [])
    
  return (
    <div className={`card ${flip ? 'flip' : ''}`}
    style = {{height: height}}
        onClick = {() => setFlip(!flip)}
    >
        <div className="front" ref={frontEl}>
            {flashcard.question}
        </div>
        <div className="back" ref={backEl}>
            {flashcard.answer}
        </div>
    </div>
  )
}
