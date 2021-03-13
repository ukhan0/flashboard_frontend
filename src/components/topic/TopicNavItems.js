import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import GradeTwoTone from '@material-ui/icons/GradeTwoTone';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

var iconsMap = {
  BarChartIcon: BarChartIcon,
  CalendarTodayIcon: CalendarTodayIcon,
  ChatIcon: ChatIcon,
  CodeIcon: CodeIcon,
  DashboardIcon: DashboardIcon,
  ErrorIcon: ErrorIcon,
  FolderIcon: FolderIcon,
  DashboardTwoToneIcon: DashboardTwoToneIcon,
  GradeTwoTone: GradeTwoTone,
  ListAltIcon: ListAltIcon,
  LockOpenIcon: LockOpenIcon,
  MailIcon: MailIcon,
  PresentToAllIcon: PresentToAllIcon,
  PeopleIcon: PeopleIcon,
  PersonIcon: PersonIcon,
  ReceiptIcon: ReceiptIcon,
  SettingsIcon: SettingsIcon,
  ViewModuleIcon: ViewModuleIcon
};

const sideBarItems = [
  {
    label: 'Filings',
    icon: 'DashboardTwoToneIcon',
    to: '/5gtechnologies',
    disabled: true,
    content: [
      {
        label: 'Default',
        description: 'This is a dashboard page example built using this template.',
        to: '/5gtechnologies'
      }
    ]
  },
  {
    label: 'Cryptocurrencies',
    icon: 'CalendarTodayIcon',
    to: '/cryptocurrencies',
    disabled: false,
    content: [
      {
        label: 'Digital',
        description: 'This is a dashboard page example built using this template.',
        to: '/cryptocurrencies'
      }
    ]
  },
  {
    label: 'CoronaVirus',
    icon: 'CalendarTodayIcon',
    to: '/coronaVirus',
    disabled: false,
    content: [
      {
        label: 'Covid-19',
        description: 'This is a dashboard page example built using this template.',
        to: '/covid19'
      },
      {
        label: 'Pandamic',
        description: 'This is a dashboard page example built using this template.',
        to: '/pandamic'
      },
      {
        label: 'CoronaVirus Vaccine',
        description: 'This is a dashboard page example built using this template.',
        to: '/coronavirusvaccine'
      },
      {
        label: 'Virus',
        description: 'This is a dashboard page example built using this template.',
        to: '/virus'
      }
    ]
  },
  {
    label: 'Elements',
    icon: 'CalendarTodayIcon',
    to: '/elements',
    disabled: false,
    content: [
      {
        label: 'Digital',
        description: 'This is a dashboard page example built using this template.',
        to: '/cryptocurrencies'
      }
    ]
  }
];

export default [
  {
    label: '',
    content: sideBarItems.map(item => {
      item.icon = iconsMap[item.icon];
      return item;
    })
  }
];
