import React, { useState, useRef, useCallback, useMemo } from 'react';
import { uploadFile } from '../utils/uploadFile';



export const UploadFile = () => {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    //const controllerRef = useRef(new AbortController());
    // useCallback no funciona tal vez por la implementacion
    /* const controllerFn = useCallback(() => {
        console.log('controllerFn::useCallback');
        const controller = new AbortController()
        return controller;
    }, []); */
    const constrollerMemo = useMemo(() => {
        return new AbortController()
    }, []);
    //const controller = new AbortController();
    // controller.signal
    // cancelar la promise
    // controller.signal.abort()
    // cancelar la peticion
    // xhr.abort()
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
                        },
                        //signal: controllerRef.current.signal
                        //signal: controllerFn().signal
                        signal: constrollerMemo.signal
                    })
                    console.log('file uploaded', data);
                } catch (error: any) {
                    console.log(error.message);
                    setError(error.message);
                } finally {
                    setLoading(false);

                }

            }} />
            <>{loading
                ?
                <>
                    <progress value={progress} max='100' />{progress.toFixed(0) + '%'}
                    <button onClick={() => {
                        console.log('abort action');
                        //controllerRef.current.abort();
                        //controllerFn().abort();
                        constrollerMemo.abort();
                    }}>Cancel</button>
                </>
                : !loading && !error && <span>File Upload succesfully</span>
            }

            </>
        </>
    );
}