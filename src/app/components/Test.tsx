'use client';
import { useState } from 'react';
import {Document,Page,pdfjs} from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface TestProps {
  text: string; // PDF 文件的路径
}
function  Test(props:TestProps){

  const getsrc:string=props.text;
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    console.log("一共有"+numPages+"页");
  }
  /**
   * 向最外部div布置旋转事件
   */
  return(
    <div>
      <Document
        file={getsrc}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p >
      <button onClick={() => setPageNumber(pageNumber - 1)}>
        pre page
      </button>
      <button onClick={() => setPageNumber(pageNumber + 1)}>
        Next page
      </button>
    </div>
  );
}
export default Test;
/*'use client';
import { Document } from "react-pdf";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PDFViewer(){
    return(
      <div>
        <Document file="std.pdf"></Document>
      </div>
    )
} 
export default PDFViewer;*/