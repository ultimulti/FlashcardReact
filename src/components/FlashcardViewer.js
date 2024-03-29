import React, { useState } from 'react';
import pdfToText from '../utils/pdfToText';
import generateFlashcards from '../services/generateFlashcards';

const FlashcardViewer = ({ pdfUrl }) => {
  const [flashcards, setFlashcards] = useState([]);

  const handleGenerateFlashcards = async () => {
    const text = await pdfToText(pdfUrl);
    const flashcards = await generateFlashcards(text);
    setFlashcards(flashcards);
  };

  return (
    <div>
      <button onClick={handleGenerateFlashcards}>Generate Flashcards</button>
      {flashcards.map((card, index) => (
        <div key={index}>
          <h3>Flashcard {index + 1}</h3>
          <p>{card}</p>
        </div>
      ))}
    </div>
  );
};

export default FlashcardViewer;