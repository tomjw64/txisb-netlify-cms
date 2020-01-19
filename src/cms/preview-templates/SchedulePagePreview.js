import React from 'react'
import PropTypes from 'prop-types'
import { SchedulePageTemplate } from '../../templates/schedule-page'

const SchedulePagePreview = ({ entry, widgetFor }) => {
  const entryScheduleData = entry.getIn(['data', 'scheduleData'])
  const scheduleData = entryScheduleData ? entryScheduleData.toJS() : []

  const entryScheduleTheme = entry.getIn(['data', 'scheduleTheme'])
  const scheduleTheme = entryScheduleTheme ? entryScheduleTheme.toJS() : []

  return (
  <SchedulePageTemplate
    title={entry.getIn(['data', 'title'])}
    day={entry.getIn(['data', 'day'])}
    calendarHeight={entry.getIn(['data', 'calendarHeight'])}
    description={entry.getIn(['data', 'description'])}
    scheduleData={scheduleData}
    scheduleTheme={scheduleTheme}
  />
)}

SchedulePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default SchedulePagePreview
