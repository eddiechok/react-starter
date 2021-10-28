const appRoutes = {
  auth: {
    login: '/',
    register: ({
      referralCode = '',
      path
    }: { referralCode?: string; path?: boolean } | undefined = {}) => {
      return `/register/${path ? ':referralCode?' : referralCode}`;
    },
    forget_password: () => {
      return '/forget-password';
    }
  },
  home: '/home',
  gateway: '/gateway/:token/:lang',
  member: {
    profile: '/profile'
  }
};

export default appRoutes;
