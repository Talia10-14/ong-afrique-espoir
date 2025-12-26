declare namespace JSX {
  interface IntrinsicElements {
    'kkiapay-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      amount?: string;
      key?: string;
      url?: string;
      position?: string;
      theme?: string;
      sandbox?: string;
      data?: string;
      callback?: string;
    };
  }
}
