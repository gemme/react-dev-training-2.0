interface UploadFile {
  body: FormData;
  method?: "POST";
  url?: string;
  handleProgress: (e: any) => void;
  signal: AbortSignal;
}

export const uploadFile = ({
  body,
  method = "POST",
  url = "http://localhost:3000/api/fileupload",
  handleProgress,
  signal,
}: UploadFile) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.upload.onloadstart = () => {};

    xhr.upload.onprogress = (e) => {
      console.log("progress", e); // e.loaded, e.total
      console.log("progress.loaded", e.loaded); // e.loaded, e.total
      console.log("progress.total", e.total); // e.loaded, e.total
      //setProgress(e.loaded * 100 / e.total);
      handleProgress(e);
    };

    xhr.onload = () => {
      console.log("file uploaded");
      resolve(body);
    };
    xhr.onerror = () => {
      reject(new Error("Failed uploading the file"));
    };

    /*
    ()=>{
      xhr.abort()
    }
    */
    signal.addEventListener("abort", () => {
      xhr.abort();
      reject(new Error("Uploading file aborted"));
    });
    xhr.onloadend = () => {
      //setLoading(false);
    };
    xhr.send(body);
  });
};
