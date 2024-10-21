'use client';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// 定义 PdfSp 组件的 props 类型
interface PdfSpProps {
  text: string; // PDF 文件的路径
  givedata: number; // 页码
}

function PdfSp(props: PdfSpProps) {
  return (
    <div>
      <Document file={props.text}>
        <Page pageNumber={props.givedata} />
      </Document>
    </div>
  );
}

export default PdfSp;
