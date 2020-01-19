import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Schedule from '../components/Schedule'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const SchedulePageTemplate = ({ title, day, calendarHeight, description, scheduleData, scheduleTheme, contentComponent }) => {
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
              <PageContent className="content" content={description} />
              <h2 className="is-size-4 has-text-weight-bold is-bold-light" style={{marginBottom: '1rem'}}>
                {day}
              </h2>
              <Schedule scheduleTheme={scheduleTheme} scheduleData={scheduleData} height={calendarHeight} unit={'px'}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

SchedulePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  day: PropTypes.string,
  calendarHeight: PropTypes.number,
  scheduleData: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.string,
      startTime: PropTypes.number,
      duration: PropTypes.number,
      type: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string
    })
  ),
  scheduleTheme: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      color: PropTypes.string
    })
  ),
  description: PropTypes.string,
  contentComponent: PropTypes.func,
}

const SchedulePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SchedulePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        day={post.frontmatter.day}
        calendarHeight={post.frontmatter.calendarHeight}
        description={post.frontmatter.description}
        scheduleData={post.frontmatter.schedule}
        scheduleTheme={post.frontmatter.scheduleTheme}
      />
    </Layout>
  )
}

SchedulePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default SchedulePage

export const SchedulePageQuery = graphql`
  query SchedulePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        day
        description
        scheduleTheme {
          type
          color
        }
        schedule {
          location
          startTime
          duration
          type
          title
          description
        }
      }
    }
  }
`
