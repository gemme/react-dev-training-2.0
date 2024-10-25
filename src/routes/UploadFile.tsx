import React, { useState } from 'react';

export const UploadFile = () => {

    return (
        <>
            UploadFile
            <form action="http://localhost:3000/api/fileupload" method="post" encType="multipart/form-data">
                <input type="file" name="file" />
                <input type="submit" value="Upload file" />
            </form>

            <div>Version 2</div>
            <input type="file" name="file" onChange={(e) => {
                console.log('upload file');
            }} />
        </>
    );
}