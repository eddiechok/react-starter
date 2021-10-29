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
  },
  examples: {
    infinite_scroll: '/examples/infinite-scroll',
    secondary_password_dialog: '/examples/secondary-password-dialog'
  }
};

export default appRoutes;
