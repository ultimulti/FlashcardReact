import { getDocument } from "pdfjs-dist/build/pdf";

import {GlobalWorkerOptions} from "pdfjs-dist/build/pdf";
const pdfWorker = require("pdfjs-dist/build/pdf.worker");
GlobalWorkerOptions.workerSrc = pdfWorker;

const pdfToText = async (src) => {
  const doc = await getDocument(src).promise;
  const numPages = doc.numPages;
  let text = '';
  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(' ');
  }
  return text;
};

export default pdfToText;