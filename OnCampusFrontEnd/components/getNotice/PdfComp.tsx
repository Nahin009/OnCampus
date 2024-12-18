import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { Button } from "@material-tailwind/react";
function PdfComp({ pdfFile }: { pdfFile: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  return (
    <div className="flex items-center justify-center mt-4 space-x-4">
      <div className="flex items-center justify-center mt-4 space-x-4">
        <div className="flex flex-col">
          <Button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>
            Previous
          </Button>
        </div>
        <div className="flex flex-col">
          <span>
            Page {pageNumber} of {numPages}
          </span>
        </div>
        <div className="flex flex-col">
          <Button
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages || !numPages}
          >
            Next
          </Button>
        </div>
      </div>

      <Document
        file={pdfFile} // Use the pdfFile prop to dynamically load PDFs
        onLoadSuccess={onDocumentLoadSuccess}
        className="pdf-document"
      >
        <div key={`page_${pageNumber}`} className="pdf-page">
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </div>
      </Document>
    </div>
  );
}

export default PdfComp;
