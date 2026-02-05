import React, { useState } from 'react'
import profile from './assets/profile.jpg'

const QrCode = () => {
  const [img,setImg]=useState("");
  const [loading,setLoading]=useState(false);
  const [qrData,setQrData]=useState("");
  const [qrSize,setQrSize]=useState("200");
  async function generateQR(){
    setLoading(true);
    try{
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    }
    catch(error){
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  }

  function downloadQR(){
    fetch(img)
      .then((response)=>response.blob())
      .then((blob)=>{
        const link=document.createElement("a")
        link.href=URL.createObjectURL(blob);
        link.download="qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }
  return (
    <div className="app-container">
      <h1>QR Code Generator</h1>
      {loading && <p>Please wait...</p>}
      
      {img && <img src={img} className="qr-code-image" />}
      <div>
        <label htmlFor="data" className='input-label'>Data for QR code

        </label>
        <input type="text" value={qrData} id="dataInput" placeholder='Enter data' onChange={(e)=>setQrData(e.target.value)}></input>
        <label htmlFor="size" className='input-label'>Size 

        </label>
        <input type="text" value={qrSize} id="sizeInput" placeholder='Enter Size'onChange={(e)=>setQrSize(e.target.value)}></input>
        <button className='generate' disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className='download' onClick={downloadQR}>Download QR Code</button>
      </div>
    </div>
  )
}

export default QrCode
