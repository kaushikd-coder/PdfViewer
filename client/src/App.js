import { useEffect, useState } from "react";
import { Document, PDFViewer, Page } from '@react-pdf/renderer';
import axios from 'axios'
import PdfViewer from "./components/Pdfviewer";



function App() {
    return(
      <>
        <PdfViewer />
      </>
    )
}

export default App;
