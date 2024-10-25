import React, { useState } from 'react';

export const UploadFile = () => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [progress, setProgress] = useState<number>(0);

    console.log(file);

    return (
        <>
            UploadFile
            <form action="http://localhost:3000/api/fileupload" method="post" encType="multipart/form-data">
                <input type="file" name="file" />
                <input type="submit" value="Upload file" />
            </form>

            <div>Version 2</div>
            <input type="file" name="file" onChange={(e) => {
                const file = e.target.files?.[0];
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('file', file as Blob);
                xhr.open('POST', 'http://localhost:3000/api/fileupload');
                xhr.upload.onprogress = (e) => {
                    console.log('progress', e); // e.loaded, e.total
                    console.log('progress.loaded', e.loaded); // e.loaded, e.total
                    console.log('progress.total', e.total); // e.loaded, e.total
                    //setProgress((e.loaded / e.total) * 100);
                    setProgress((e.loaded * 100) / e.total);
                };
                xhr.onload = () => {
                    console.log('file uploaded');
                }
                xhr.send(formData);
                //setFile(file);
            }} />
            <progress value={progress} max="100" />{'%' + progress.toFixed(0)}
        </>
    );
}