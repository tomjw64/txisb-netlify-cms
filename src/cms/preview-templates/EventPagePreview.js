import React from 'react'
import PropTypes from 'prop-types'
import { EventPageTemplate } from '../../templates/event-page'

const EventPagePreview = ({ entry, widgetFor }) => (
  <EventPageTemplate
    title={entry.getIn(['data', 'title'])}
    eventHosts={entry.getIn(['data', 'eventHosts'])}
    locationAddressLines={entry.getIn(['data', 'locationAddressLines'])}
    gMapsLocationEmbedLink={entry.getIn(['data', 'gMapsLocationEmbedLink'])}
    content={widgetFor('body')}
  />
)

EventPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default EventPagePreview
