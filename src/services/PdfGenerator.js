import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { jsPDF } from 'jspdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = //cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js 
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js';
const PdfGenerator = () => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState('');

  const generateAndShowPdf = () => {
    const doc = new jsPDF();

    // Add content to PDF
    doc.text('Hello, world!', 10, 10);

    // Convert PDF to Blob
    const pdfBlobUri = doc.output('bloburi');
    setPdfBlobUrl(pdfBlobUri);
  };
  return (
    <div>
      <button onClick={generateAndShowPdf}>Generate and Display PDF</button>
      {pdfBlobUrl && (
        <div>
          {/* Display the generated PDF */}
          <Document file={pdfBlobUrl}>
            <Page pageNumber={1} />
          </Document>
        </div>
      )}
    </div>
  );
};

export default PdfGenerator;
