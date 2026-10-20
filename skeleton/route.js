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
  { path: '/', name: 'Home', component: Landing },
  { path: '/project-overview', name: 'Overview', component: Overview },
  { path: '/components', name: 'Components', component: Components },
  { path: '/login', name: 'Sign in', component: Login },
  { path: '/signup', name: 'Create an account', component: Signup },
  { path: '/forgot-password', name: 'Forgot password', component: ForgotPassword },
  { path: '/reset-password', name: 'Reset password', component: ResetPassword },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];
