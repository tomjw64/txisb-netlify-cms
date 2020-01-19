import React from 'react'
import PropTypes from 'prop-types'
import { RegisterPageTemplate } from '../../templates/register-page'

const RegisterPagePreview = ({ entry, widgetFor }) => {
  return (
  <RegisterPageTemplate
    title={entry.getIn(['data', 'title'])}
    registerLink={entry.getIn(['data', 'registerLink'])}
    content={widgetFor('body')}
  />
)}

RegisterPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default RegisterPagePreview
