import Landing from './screens/landing.js';
import Overview from './screens/project-overview.js';
import Login from './screens/login.js';
import Signup from './screens/signup.js';
import ForgotPassword from './screens/forgot-password.js';
import ResetPassword from './screens/reset-password.js';
import Dashboard from './screens/dashboard.js';
import Components from './screens/components.js';

// Add every screen here; use a stable route and descriptive name.
export const routes = [
  { path: '/', name: 'home', component: Landing },
  { path: '/project-overview', name: 'overview', component: Overview },
  { path: '/components', name: 'components', component: Components },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: ForgotPassword,
  },
  { path: '/reset-password', name: 'resetPassword', component: ResetPassword },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
];
