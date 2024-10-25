import React, { useEffect, useState } from 'react'
import { LoadScript, GoogleMap, OverlayView, OverlayViewF, HeatmapLayerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 38,
  lng: -98
};

export const GoogleMaps = ({apiKey, hasLoaded, children}) => {
  
  return (
      <LoadScript googleMapsApiKey={apiKey} libraries={['visualization']}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}>
            {hasLoaded &&
              <>
                {children}
              </>
            }
        </GoogleMap>
      </LoadScript>
    )
}


export const GoogleMapsHeatmap = ({apiKey, data = [], gradient = null, radius = 50, opacity = 0.6, overlay}) => {
  const [heatmapData, setHeatmapData] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {

      let mappingData = [];
      data.forEach(element => {
        mappingData.push({ location: new google.maps.LatLng(element.lat, element.lng), weight: element.weight, data: element });
      });
      setHeatmapData(mappingData);

    }
  }, []);

  useEffect(() => {
    
    if (heatmapData != null)
    {
      setHasLoaded(true);
    }

  }, [heatmapData]);

  return (
    
    <GoogleMaps apiKey={apiKey} hasLoaded={hasLoaded}>
      
      <HeatmapLayerF
        data={heatmapData}
        options={{
          radius: radius, 
          opacity: opacity,
          gradient: gradient != null ? gradient : [ 
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
          ]
        }}
      /> 

      {heatmapData != null && heatmapData.map(point => {
        return (
          <OverlayViewF
            position={{lat: point.location.lat(), lng: point.location.lng()}}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              {overlay(point)}
          </OverlayViewF>
        )
      })}
    </GoogleMaps>
  )
}

// components
export const Overview = ({lat, lng, children}) => {

  return (
    <OverlayViewF
      position={{lat: lat, lng: lng}}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
        {children}
    </OverlayViewF>
  )
}

