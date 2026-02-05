// Central navigation link configuration used by NavBar & MobileMenu
// Each link: { to: string, label: string, icon: ReactIconComponent, group?: 'primary' | 'secondary' }
// Order matters for display.
import { FaHome, FaUser, FaCode, FaBookOpen, FaRoad, FaStickyNote, FaQuestionCircle, FaBookmark, FaUserFriends, FaEnvelope } from 'react-icons/fa';

export const NAV_LINKS = [
  { to: '/', label: 'Home', icon: FaHome },
  { to: '/about', label: 'About', icon: FaUser },
  { to: '/editor', label: 'Editor', icon: FaCode },
  { to: '/courses', label: 'Courses', icon: FaBookOpen },
  { to: '/roadmap', label: 'Roadmaps', icon: FaRoad },
  { to: '/notes', label: 'Notes', icon: FaStickyNote },
  { to: '/questions', label: 'Questions', icon: FaQuestionCircle },
  { to: '/bookmarks', label: 'Bookmarks', icon: FaBookmark },
  { to: '/contributors', label: 'Contributors', icon: FaUserFriends },
  { to: '/contact', label: 'Contact', icon: FaEnvelope }
];

// For condensed breakpoint (lg to <xl) choose a subset
export const CONDENSED_LINKS = ['/','/courses','/roadmap','/notes','/questions'];
