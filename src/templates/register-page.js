import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const RegisterPageTemplate = ({ title, registerLink, content, contentComponent }) => {
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
              <a href={registerLink}
                className="is-size-3 has-text-weight-bold"
                target="_blank" rel="noopener noreferrer">
                <span className="btn">Register</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

RegisterPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  registerLink: PropTypes.string.isRequired,
  content: PropTypes.string,
}

const RegisterPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <RegisterPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        registerLink={post.frontmatter.registerLink}
        content={post.html}
      />
    </Layout>
  )
}

RegisterPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default RegisterPage

export const RegisterPageQuery = graphql`
  query RegisterPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        registerLink
      }
    }
  }
`
