// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import CalendarCheckOutline  from 'mdi-material-ui/CalendarCheckOutline'
import ClipboardFileOutline from 'mdi-material-ui/ClipboardFileOutline'
import TextBoxMultipleOutline from 'mdi-material-ui/TextBoxMultipleOutline'
import MessageVideo from 'mdi-material-ui/MessageVideo'
import Plus from 'mdi-material-ui/Plus'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import VideoOutline from 'mdi-material-ui/VideoOutline'

const navigation = () => {
  return [
    {
      title: 'Create Project',
      icon: Plus,
      path: '/create-project'
    },
    {
      title: 'Create Meeting',
      icon: Plus,
      path: '/create-meeting'
    },
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Task',
      icon: ClipboardFileOutline,
      path: '/task'
    },
    {
      title: 'Project',
      icon: TextBoxMultipleOutline,
      path: '/project'
    },
    {
      title: 'People',
      icon: AccountGroupOutline,
      path: '/people'
    },
    {
      title: 'Meeting Scedule',
      icon: MessageVideo,
      path: '/meeting'
    },
    {
      title: 'Meeting Setting',
      icon: VideoOutline,
      path: '/meeting-admin'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
