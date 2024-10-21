'use client';
import { useState } from 'react';
import {Document,Page,pdfjs} from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
interface PDFViewerProps {
  sendDataToParent: (data: number) => void;  // 父组件传递的回调函数，用于接收子组件的数据
  parentData: number;  // 父组件传递的数据
}

function  PDFViewer({ sendDataToParent, parentData }: PDFViewerProps){
  const sendData = (n:number) => {
    // 调用父组件的回调函数，传递数据
    sendDataToParent(n);
  };
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    sendData(numPages);
    console.log("一共有"+numPages+"页");
  }
  /**
   * 向最外部div布置旋转事件
   */
  return(
    <div>
      <Document
        file="/std.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>接收到了{parentData}</div>
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
export default PDFViewer;
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