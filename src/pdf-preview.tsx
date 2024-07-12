interface Props {
  pdf?: Blob | null;
}
const PdfPreview = ({ pdf }: Props) => {
  if (!pdf) return;
  // const file = window.URL.createObjectURL(pdf);
  // const iframe = document.querySelector("iframe");
  // if (iframe?.src) iframe.src = file;
  console.log(pdf);
  const url = URL.createObjectURL(pdf);
  console.log(url);

  return <div style={{ height: "750px" }}>{/* <iframe src={pdf} width={600} height={600} /> */}</div>;
};

export default PdfPreview;
