import React from 'react'
import crypto from 'crypto'

const hash = crypto.createHash('sha256')
const memo = {}
const hashColor = input => {
  if (!memo[input]) {
    hash.update(input)
    memo[input] = '#' + hash.digest('hex').substring(0, 6)
  }
  return memo[input]
}

const themeColor = (theme, type) => {
  for (const entry of theme) {
    if (entry.type === type) {
      return entry.color
    }
  }
  return null
}

const timeHuman = time => {
  const hour = Math.floor(time / 60)
  const half = hour >= 12 ? 'pm' : 'am'
  const minutes = time % 60
  return `${hour % 12 !== 0 ? hour % 12 : 12}:${`00${minutes}`.substr(-2)}${half}`
}

const Schedule = ({scheduleTheme, scheduleData, height, unit}) => {
  const uniqueLocations = scheduleData
    .map(event => event.location)
    .reduce((acc, location) => {
      if (!acc.includes(location)) {
        acc.push(location)
      }
      return acc
    }, [])
  const eventsByLocation = scheduleData
    .reduce((acc, event) => {
      acc[event.location].push(event)
      return acc
    }, uniqueLocations
      .reduce((acc, location) => {
        acc[location] = []
        return acc
      }, {})
    )
  const startTime = scheduleData
    .reduce((acc, event) => {
      return Math.min(acc, event.startTime)
    }, 1440)
  const endTime = scheduleData
    .reduce((acc, event) => {
      return Math.max(acc, event.startTime + event.duration)
    }, 0)
  const totalTime = endTime - startTime
  const scale = height / totalTime
  return (
    <div className="schedule columns" style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: 'rgb(255,250,240)'
    }}>
      {uniqueLocations.map((location, i) => {
        return <LocationSchedule
                  key={i}
                  scheduleTheme={scheduleTheme}
                  startTime={startTime}
                  height={height}
                  scale={scale}
                  unit={unit}
                  events={eventsByLocation[location]} />
      })}
    </div>
  )
}

const LocationSchedule = ({scheduleTheme, events, scale, startTime, unit, height}) => {
  return (
    <div className="schedule-location column" style={{
      padding: '0',
      minWidth: '8rem',
      marginBottom: '1rem'
    }}>
      <span className="location-name is-size-5 has-text-weight-bold" style={{
        width: '100%',
        display: 'block',
        textAlign: 'center',
        borderBottom: '2px solid black',
        borderTop: '2px solid black',
        padding: '1rem',
      }}>{events[0].location}</span>
      <div className="schedule-space" style={{
        height: `${height}${unit}`,
        position: 'relative'
      }}>
        {events.map((event, i) => <Event
          key={i}
          scheduleTheme={scheduleTheme}
          unit={unit}
          startTime={startTime}
          scale={scale}
          event={event}/>)}
      </div>
    </div>
  )
}

const Event = ({scheduleTheme, event, scale, startTime, unit}) => {
  return (
    <div className="event" style={{
      position: 'absolute',
      backgroundColor: themeColor(scheduleTheme, event.type) || hashColor(event.type),
      top: `${(event.startTime - startTime) * scale}${unit}`,
      height: `${event.duration * scale}${unit}`,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid rgb(255,250,240)',
      textAlign: 'center'
    }}>
      <span>{event.title}</span>
      <span>{event.description}</span>
      <span>{`${timeHuman(event.startTime)} - ${timeHuman(event.startTime + event.duration)}`}</span>
    </div>
  )
}

export default Schedule
