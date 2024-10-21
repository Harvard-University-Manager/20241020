"use client";
import React, { useState, useEffect } from "react";
import Todo from "./components/todo";
import dynamic from "next/dynamic";
import { jsPDF } from "jspdf"; // 导入 jsPDF

// 动态导入 PdfSp，确保其在客户端渲染
const PdfSp = dynamic(() => import("./components/PdfSp"), { ssr: false });

// 动态导入 react-pdf 和 pdfjs 并确保在客户端加载
const DocumentComponent = dynamic(
  () =>
    import("react-pdf").then((mod) => {
      const { pdfjs } = mod;
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"; // 确保客户端加载后设置 workerSrc
      return mod.Document;
    }),
  { ssr: false }
);

class Items {
  id: number;
  pageNumber: number;
  constructor(value: number, value2: number) {
    this.id = value;
    this.pageNumber = value2;
  }
}

const Home = () => {
  const [list, setList] = useState<Items[]>([]);
  const [numPages, setNumPages] = useState<number>();
  const [filePath, setFilePath] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [rotations, setRotations] = useState<number[]>([]);
  const [scale, setScale] = useState<number>(1); // 用于记录缩放比例

  const handleImageClick = (index: number) => {
    const newRotations = [...rotations];
    newRotations[index] = (newRotations[index] || 0) + 90; // 每次点击增加 90 度
    setRotations(newRotations); // 更新状态
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    const imgPromises = [];
    for (let i = 1; i <= numPages; i++) {
      imgPromises.push(getPageImage(i));
    }
    Promise.all(imgPromises).then((imgSrcs) => {
      setImages(imgSrcs);
      setRotations(new Array(imgSrcs.length).fill(0)); // 初始化旋转角度为 0
      const itemList = imgSrcs.map((_, index) => new Items(index, index));
      setList(itemList);
    });
  }

  const getPageImage = async (pageNumber: number) => {
    const pdf = await import("react-pdf").then((mod) => mod.pdfjs.getDocument(filePath).promise);
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Failed to get canvas context");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;
    return canvas.toDataURL();
  };

  const rotateAllImages = () => {
    setRotations(rotations.map(rotation => (rotation || 0) + 90)); // 所有图片统一增加 90 度
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const fileUrl = URL.createObjectURL(file);
      setFilePath(fileUrl);
    }
  };

  // 下载旋转后的 PDF
  const downloadPDF = () => {
    const pdf = new jsPDF();
    images.forEach((imgSrc, index) => {
      const rotation = rotations[index] || 0;
      pdf.addImage(imgSrc, 'JPEG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, undefined, 'FAST');
      if (index < images.length - 1) {
        pdf.addPage(); // 添加新页面
      }
    });
    pdf.save("rotated.pdf"); // 下载 PDF 文件
  };

  // 放大和缩小
  const zoomIn = () => setScale(scale * 1.2); // 放大
  const zoomOut = () => setScale(scale / 1.2); // 缩小

  return (
    <div>
      <div className="dctest">
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf"
        />
        {filePath && (
          <DocumentComponent file={filePath} onLoadSuccess={onDocumentLoadSuccess}>
            <div>
              {images.length > 0 && images.map((imgSrc, index) => (
                <img className="imgs"
                  key={index}
                  src={imgSrc} 
                  alt={`Page ${index + 1}`} 
                  style={{ 
                    transform: `rotate(${rotations[index] || 0}deg)`, 
                    transition: 'transform 0.5s', 
                    width: `${scale * 100}%` // 根据缩放比例设置宽度
                  }}
                  onClick={() => handleImageClick(index)} 
                />
              ))}
            </div>
          </DocumentComponent>
        )}
      </div>
      <button onClick={rotateAllImages} className="buttons">旋转所有图片</button>
      <button onClick={downloadPDF} className="buttons">下载旋转后的 PDF</button>
      <button onClick={zoomIn} className="buttons">放大</button>
      <button onClick={zoomOut} className="buttons">缩小</button>

      <h1>PDF to Image Example</h1>
      <div>
        <h1>上方上传 PDF 文件</h1>
      </div>
      <Todo text="HeadL1"></Todo>
      <hr />
      <div>
        {list.length > 0 ? (
          list.map((item) => (
            <div key={item.id}>
              里面有值：{item.pageNumber + 1}
              <PdfSp givedata={item.pageNumber + 1} text={filePath}></PdfSp>
            </div>
          ))
        ) : (
          <p>没有数据</p>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Home;
