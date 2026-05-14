"use client"
import React from 'react'
import { useMapRotationCurrent } from '../../hooks/useMapRotation'

const RotationPage = () => {

  const { currentData, currentError, isCurrentLoading } = useMapRotationCurrent()

  if (isCurrentLoading) {
    return <div>Loading current map rotation...</div>
  }

  if (currentError) {
    return <div>Error loading current map rotation.</div>
  }

  return (
    <div>
      <h1>Current Map Rotation</h1>
      {currentData?.maps?.length ? (
        <ul>
          {currentData.maps.map((map) => (
            <li key={map}>
              <a href={`/tools/rotation/map?mapName=${map}`}>{map}</a></li>
          ))}
        </ul>
      ) : (
        <div>No current maps available.</div>
      )}
    </div>
  )
}

export default RotationPage
