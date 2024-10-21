'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const Test = dynamic(() => import('./Test'), { ssr: false });
const FileInput = () => {
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      // 设置文件名
      setFileName(file.name);

      // 设置文件路径 (仅显示路径，不上传文件)
      const fileUrl = URL.createObjectURL(file);
      setFilePath(fileUrl);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="application/pdf" />
      
      {fileName && <p>File Name: {fileName}</p>}
      {filePath && (
        <div>
          <p>File Path: {filePath}</p>
          {/* 如果想要显示 PDF 文件，这里可以使用 <iframe> 或其他 PDF 渲染工具 */}
          <Test text={filePath}></Test>
        </div>
      )}
    </div>
  );
};

export default FileInput;
