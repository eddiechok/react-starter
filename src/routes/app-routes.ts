const appRoutes = {
  auth: {
    login: '/',
    register: ({
      referralCode = '',
      path
    }: { referralCode?: string; path?: boolean } | undefined = {}) => {
      return `/register/${path ? ':referralCode?' : referralCode}`;
    },
    forget_password: '/forget-password'
  },
  home: '/home',
  gateway: '/gateway/:token/:lang',
  member: {
    profile: '/profile',
    login_password: '/member/login-password',
    transaction_password: '/member/transaction-password'
  },
  examples: {
    infinite_scroll: '/examples/infinite-scroll',
    secondary_password_dialog: '/examples/secondary-password-dialog',
    form_input: '/examples/form-input',
    tree_list: '/examples/tree-list',
    wheel_spinner: '/examples/wheel-spinner'
  }
};

export default appRoutes;
