import React, { useState } from 'react';

const PdfUpload = () => {
  const [message, setMessage] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const formData = new FormData();
      formData.append('file', fileList[0]); // 添加文件到 FormData

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        setMessage(result.message); // 显示成功消息
      } catch (error) {
        setMessage('File upload failed');
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="application/pdf" />
      {message && <p>{message}</p>} {/* 显示上传结果 */}
    </div>
  );
};

export default PdfUpload;
