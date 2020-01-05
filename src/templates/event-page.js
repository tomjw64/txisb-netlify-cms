import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const EventPageTemplate = ({ title, eventHosts, content, contentComponent }) => {
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
              <h2>
                Hosts of TXISB
              </h2>
              <table>
                <th>
                  <td>Event Year</td>
                  <td>Host School</td>
                </th>
                {eventHosts.forEach((year, host) => {
                  return <tr><td>{year}</td><td>{host}</td></tr>
                })}
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
  eventHosts: PropTypes.array,
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
      }
    }
  }
`
