import { useState } from "react";

const PdfViewer = () => {
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleLoadClick = async () => {
        try {

            const response = await fetch('http://localhost:3001/pdf/pdfViewer', { method: 'GET' });

            const data = await response.json();
            // console.log(data)
            const decodedData = atob(data.fileData); //? Decode the base64 string
            // console.log(decodedData)
            const uint8Array = new Uint8Array(decodedData.length);
            for (let i = 0; i < decodedData.length; i++) {
                uint8Array[i] = decodedData.charCodeAt(i);
            }
            const pdfBlob = new Blob([uint8Array], { type: 'application/pdf' });
            // console.log(pdfBlob)
            const PdfUrl = URL.createObjectURL(pdfBlob);

            setPdfUrl(PdfUrl);
            // console.log('Received updated data from server:', PdfUrl);
        } catch (error) {
            console.error(error);
        }

    }

    const handleSaveClick = async () => {
        try {
            // Fetch the Blob object
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            // console.log(blob);

            // Convert the Blob object to a base64 string
            const reader = new FileReader();

            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                const base64data = reader.result;
                // console.log(base64data)
                if (base64data) {
                    // Remove the data URL prefix (data:application/pdf;base64,) from the base64 string
                    const base64string = base64data.split(',')[1];
                    // console.log('Sending updated data to server:', base64string);

                    // Send the base64 string to the backend
                    const saveResponse = await fetch('http://localhost:3001/pdf/savePdf', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            data: base64string
                        })
                    });

                    if (saveResponse.ok) {
                        const data = await saveResponse.json();
                        // console.log(JSON.stringify({ data: base64string }));
                        // handleLoadClick(); // refresh the PDF viewer
                        console.log(data)
                        alert("Saved Successfully")
                    } else {
                        throw new Error("Error saving Pdf");
                    }
                } else {
                    console.error('Error converting blob to base64');
                }
            };
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className="App">
            <h1>Pdf-Viewer</h1>
            <button className="btn" onClick={handleLoadClick}>Load PDF</button>
            <button className="btn" onClick={handleSaveClick}>Save PDF</button>
            {/* {pdfUrl && (
        <PDFViewer width="100%" height="800px">
          <Document file={pdfUrl}>
            <Page pageNumber={1} width={window.innerWidth} />
          </Document>
        </PDFViewer>
      )} */}
            {pdfUrl && <iframe src={pdfUrl} title="PDF Viewer" width="100%" height="500px" />}



        </div>
    );
}

export default PdfViewer;