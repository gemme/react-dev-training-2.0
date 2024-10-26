import React, { useState } from 'react';
import { uploadFile } from '../utils/uploadFile';

export const UploadFile = () => {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    return (
        <>
            UploadFile
            <form action="http://localhost:3000/api/fileupload" method="post" encType="multipart/form-data">
                <input type="file" name="file" />
                <input type="submit" value="Upload file" />
            </form>

            <div>Version 2</div>
            <input disabled={loading} type="file" name="file" onChange={async (e) => {
                console.log('upload file');
                const file = e.target.files?.[0];
                if (!file) {
                    return
                }

                const formData = new FormData();
                formData.append('file', file);
                formData.append('name', 'Ernesto');
                setLoading(true);
                try {
                    const data = await uploadFile({
                        body: formData,
                        handleProgress: (e) => {
                            setProgress(e.loaded * 100 / e.total);
                        }
                    })
                    console.log('file uploaded', data);
                } catch (error: any) {
                    console.log(error.message);
                } finally {
                    setLoading(false);

                }

            }} />
            <>{loading && progress < 100
                ?
                <>
                    <progress value={progress} max='100' />{progress.toFixed(0) + '%'}
                </>
                : progress === 100 && <span>File Upload succesfully</span>
            }

            </>
        </>
    );
}