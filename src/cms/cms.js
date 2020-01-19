import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import EventPagePreview from './preview-templates/EventPagePreview'
import SchedulePagePreview from './preview-templates/SchedulePagePreview'
import RegisterPagePreview from './preview-templates/RegisterPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('event', EventPagePreview)
CMS.registerPreviewTemplate('schedule', SchedulePagePreview)
CMS.registerPreviewTemplate('register', RegisterPagePreview)
