import html2canvas from "html2canvas"
import jsPDF from "jsPDF"

export const downloadResume = async () =>{

  const element = document.getElementById("resume-preview");

  if(!element) return;
  

   const canvas = await html2canvas(element,{
        scale:2,
        useCORS:true,
        
    });

    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p","mm","a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = canvas.height * pdfWidth / canvas.width;

    pdf.addImage(
        img,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
    );

    pdf.save("Resume.pdf");
}
