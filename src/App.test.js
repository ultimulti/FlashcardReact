import React from 'react';
import FlashcardViewer from './components/FlashcardViewer';

function App() {
  return (
    <div className="App">
      <FlashcardViewer pdfUrl="path_to_your_pdf.pdf" />
    </div>
  );
}

export default App;