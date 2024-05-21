import React, { useEffect } from 'react';

export default function OAuth() {
    const handleGoogleClick = async () => {
        try {
            window.location.href = 'http://localhost:8080/auth/google';
            console.log("call done")
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const successParam = urlParams.get('success');
        console.log('Success param:', successParam); // Log the value of successParam
        if (successParam === 'true') {

            window.location.href = '/';
        }
    }, []);

    return (
        <button onClick={handleGoogleClick} type='button'>Continue With Google</button>
    );
}
