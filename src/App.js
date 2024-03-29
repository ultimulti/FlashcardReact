import React, { useState } from 'react';
import FlashcardList from './FlashcardList';
import './App.css';
import axios from "axios";
import pdfToText from './utils/pdfToText';
import generateFlashcards from './services/generateFlashcards';

function App() {
  const [file, setFile] = useState(null);
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  const [progress, setProgress] = useState({started: false, pc: 0});
  const [msg, setMsg] = useState(null);

  
  function handleUpload() {
    if (!file) {
      setMsg("No file selected");
      return;
    } 

    const fd = new FormData();
    fd.append('file', file);

    setMsg("Uploading file...");
    setProgress(prevState => {
      return {...prevState, started: true}
    });
    axios.post('http://httpbin.org/post', fd, {
      onUploadProgress: (progressEvent) => { 
        setProgress(prevState => {
          return {...prevState, pc: Math.round(progressEvent.progress * 100)}
        });
      },
      headers: {
        'Custom-Header': 'value',
      }
    })
    .then((res) => {
      setMsg("Upload successful"); 
      console.log(res.data);
      pdfToText(res.data.files.file).then((temp) => {
        generateFlashcards(temp).then((temp2) => {
          setFlashcards(temp2);
        });
      });

    })
    .catch((err) => {
      setMsg("Upload failed"); 
      console.log(err);
    });
  }

  return (
    <div className="App">
      <div className="header">
        <input onChange = { (e) => {setFile(e.target.files[0])}} type = "file"/>
        <button onClick = { handleUpload }>Upload PDF</button>
        {progress.started && <progress max = "100" value = {progress.pc}></progress>}
        {msg && <span>{msg}</span>}
      </div>

      <div className="container">
      <FlashcardList flashcards={flashcards} />
      </div>

    </div>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is the capital of France?',
    answer: 'Paris',
  },
  {
    id: 2,
    question: 'What is the capital of Spain?',
    answer: 'Madrid',
  },
  {
    id: 3,
    question: 'What is the capital of Germany?',
    answer: 'Berlin',
  },
  {
    id: 4,
    question: 'What is the capital of Italy?',
    answer: 'Rome',
  },
  {
    id: 5,
    question: 'What is the capital of the United Kingdom?',
    answer: 'London',
  }, 
  {
    id: 6,
    question: 'What is the capital of the United States?',
    answer: 'Washington, D.C.',
  },
  {
    id: 7,
    question: 'What is the capital of China?',
    answer: 'Beijing',
  },
  {
    id: 8,
    question: 'What is the capital of Japan?',
    answer: 'Tokyo',
  },
  {
    id: 9,
    question: 'What is the capital of South Korea?',
    answer: 'Seoul',
  },
  {
    id: 10,
    question: 'What is the capital of India?',
    answer: 'New Delhi',
  },
  {
    id: 11,
    question: 'What is the capital of Australia?',
    answer: 'Canberra',
  },
  {
    id: 12,
    question: 'What is the capital of Brazil?',
    answer: 'Brasília',
  }
];

export default App;