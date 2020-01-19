import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const EventPageTemplate = ({ title, eventHosts, locationAddressLines, gMapsLocationEmbedLink, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
            <div className="section">
              <h2 className="is-size-4 has-text-weight-bold is-bold-light">
                Location
              </h2>
              <div className="address">
                {locationAddressLines.map((line, i) => {
                  return <span className="address-line" key={i}>{line}</span>
                })}
              </div>
              <div className="mapouter">
                <div className="gmap_canvas">
                  <iframe title="location-map" width="100%" height="500" id="gmap_canvas" src={gMapsLocationEmbedLink} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                  <a href="https://www.embedgooglemap.org">embedgooglemap.org</a>
                </div>
                <style>{'.mapouter{position:relative;text-align:right;height:500px;width:100%;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:100%;}'}</style>
              </div>
            </div>
            <div className="section">
              <h2 className="is-size-4 has-text-weight-bold is-bold-light">
                Hosts of TXISB
              </h2>
              <table className="event-hosts-table">
                <thead>
                  <tr>
                    <th>Event Year</th>
                    <th>Host School</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(eventHosts)}
                  {eventHosts.sort((a, b) => a.year - b.year).map((event, i) => {
                    return <tr key={i}><td>{event.year}</td><td>{event.host}</td></tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

EventPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  eventHosts: PropTypes.arrayOf(
    PropTypes.shape({
      host: PropTypes.string,
      year: PropTypes.number
    })
  ),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const EventPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <EventPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        eventHosts={post.frontmatter.eventHosts}
        locationAddressLines={post.frontmatter.locationAddressLines}
        gMapsLocationEmbedLink={post.frontmatter.gMapsLocationEmbedLink}
        content={post.html}
      />
    </Layout>
  )
}

EventPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default EventPage

export const EventPageQuery = graphql`
  query EventPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        eventHosts {
          year
          host
        }
        locationAddressLines
        gMapsLocationEmbedLink
      }
    }
  }
`
