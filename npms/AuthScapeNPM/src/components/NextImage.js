import React, { useState, useRef, useEffect } from "react";
import Image from 'next/image';

export const NextImage = ({ src, alt, width = 200, height = 200, objectFit = "contain", enableAuth = false}) => {

    const [imageError, setImageError] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {

        if (enableAuth)
        {
            const fetchData = async () => {
                
                await apiService().DownloadFile(src, "", (data) => {
                    setImageSrc(data);
                }, true);

            };
            fetchData();
        }

    }, [enableAuth]);
    
    return (
        <>
        {(enableAuth && imageSrc != null) &&
            <>
                <Image
                    src={imageError ? process.env.fallbackImageSrc : imageSrc }
                    alt={alt}
                    width={width}
                    height={height}
                    style={{objectFit: objectFit}}
                    onError={() => setImageError(true)}
                />
            </>
        }

        {!enableAuth &&
            <>
                <Image
                    src={imageError ? process.env.fallbackImageSrc : src }
                    alt={alt}
                    width={width}
                    height={height}
                    style={{objectFit: objectFit}}
                    onError={() => setImageError(true)}
                />
            </>
        }
        </>
    );
}