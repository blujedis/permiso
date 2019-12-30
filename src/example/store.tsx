import { createRestash } from 'restash';

const { Provider, useStore } = createRestash({

  initialState: {

    data: null,

    active: {
      menu: 'Initialize',
      title: 'Octopoda Init',
      description: 'Shows how to initialize Octo.',
      box: 'box has-text-white has-background-link is-size-5'
    },

    home: { // NOTE "home" or "/" route must be labled home.
      menu: 'Initialize',
      title: 'Octopoda Init',
      description: 'Initializing an Octo store instance.',
      box: 'box has-text-white has-background-link is-size-5'
    }

  }

});

export {
  Provider,
  useStore
};
