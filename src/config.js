import Raven from 'raven-js';

export const sentry_url = 'https://db6e89b1dbaf44e48e0e49b7fe974885@sentry.io/250573';

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
}