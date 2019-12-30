import React, { FC } from 'react';
import { useStore } from './store';
import Highlighter from './highlighter';
import { createToggles } from './utils';

const Store: FC = () => {

  const [store, dispatch] = useStore();
  const page = store.active;

  const toggles = createToggles({

    event: {
      active: true,
      on: '</> Hide Code',
      off: '</> Show Code',
      display: `
      const fetchEvents = new Tentacle('fetch');

      fetchEvents
        .on(Status.PROGRESS, () => console.log('FETCH STARTED'))
        .on(Status.SUCCESS, () => console.log('FETCH SUCCESSFUL'))
        .on(Status.COMPLETE, (json) => console.info('FETCH COMPLETED:', json));
      `
    },

    handler: {
      active: false,
      on: '</> Hide Code',
      off: '</> Show Code',
      display: `
      const handler = pod => (url: string, cb?: (data) => void) => {

        pod.status(Status.PROGRESS);

        fetch(url)
          .then(res => {

            if (!res.ok)
              return pod.status(Status.ERROR, res);

            return res.json();

          })

          .then(json => {

            pod.status(Status.SUCCESS);
            pod.status(Status.COMPLETE, json);

            cb(json);

          });

      };
      `
    },

    pod: {
      active: false,
      on: '</> Hide Code',
      off: '</> Show Code',
      display: `
      const fetcher = new Octopod('fetcher', fetchEvents, handler);
      `
    },

    export: {
      active: false,
      on: '</> Hide Code',
      off: '</> Show Code',
      display: `
      const { Provider, useOcto } = initOcto({
        tentacles: {
          fetchEvents
        },
        octopods: {
          fetcher
        }
      });

      export {
        Provider,
        useOcto
      };
      `
    },

    full: {
      active: false,
      on: '</> Hide Code',
      off: '</> Show Code',
      display: `
      import initOcto, { Tentacle, Octopod, Status } from '../';

      const fetchEvents = new Tentacle('fetch');

      fetchEvents
        .on(Status.PROGRESS, () => console.log('FETCH STARTED'))
        .on(Status.SUCCESS, () => console.log('FETCH SUCCESSFUL'))
        .on(Status.COMPLETE, (json) => console.info('FETCH COMPLETED:', json));

      const handler = pod => (url: string, cb?: (data) => void) => {

        pod.status(Status.PROGRESS);

        fetch(url)
          .then(res => {

            if (!res.ok)
              return pod.status(Status.ERROR, res);

            return res.json();

          })

          .then(json => {

            pod.status(Status.SUCCESS);
            pod.status(Status.COMPLETE, json);

            cb(json);

          });

      };

      const fetcher = new Octopod('fetcher', fetchEvents, handler);

      const { Provider, useOcto } = initOcto({
        tentacles: {
          fetchEvents
        },
        octopods: {
          fetcher
        }
      });

      export {
        Provider,
        useOcto
      };
      `
    }
  });

  const [eventValue, eventToggle, eventDisplay, eventActive] = toggles.use('event');
  const [handlerValue, handlerToggle, handlerDisplay, handlerActive] = toggles.use('handler');
  const [podValue, podToggle, podDisplay, podActive] = toggles.use('pod');
  const [exportValue, exportToggle, exportDisplay, exportActive] = toggles.use('export');
  const [fullValue, fullToggle, fullDisplay, fullActive] = toggles.use('full');

  return (
    <div>

      <p className={page.box} style={{ padding: '18px', marginTop: '12px' }}>
        {page.description}
      </p>

      <div style={{ padding: '8px 0 40px' }}>

        <article className="message is-dark">
          <div className="message-body">
            <strong>Create a Tentacle</strong> or event stack that your <strong>Octopods</strong>
            can trigger on change of status.
            Within your pod (shown below) you can trigger status changes allowing for the event listeners to be
            triggered. Click "show code" below
            to see how this is initialized.
          </div>
        </article>

        <button className="button is-dark" style={{ width: '100%' }} onClick={eventToggle} >{eventValue}</button>
        <Highlighter visible={eventActive} content={eventDisplay} />

      </div>

      <div style={{ padding: '8px 0 40px' }}>

        <article className="message is-dark">
          <div className="message-body">
            <strong>Create a Handler</strong> to trigger the above <strong>Tentacle</strong> event stacks.
          </div>
        </article>

        <button className="button is-dark" style={{ width: '100%' }} onClick={handlerToggle} >{handlerValue}</button>
        <Highlighter visible={handlerActive} content={handlerDisplay} />

      </div>

      <div style={{ padding: '8px 0 40px' }}>

        <article className="message is-dark">
          <div className="message-body">
            <strong>Create an Octopod</strong> instance passing in any <strong>Tentacle</strong>
            instances (multiple supported) and a <strong>Handler </strong>
            function that will be used for dispatching.
        </div>
        </article>

        <button className="button is-dark" style={{ width: '100%' }} onClick={podToggle} >{podValue}</button>
        <Highlighter visible={podActive} content={podDisplay} />

      </div>

      <div style={{ padding: '8px 0 40px' }}>

        <article className="message is-dark">
          <div className="message-body">
            <strong>Finally Export</strong> out your Octo store exposing your provider and
            your <strong>useOcto</strong> hook.
          </div>
        </article>

        <button className="button is-dark" style={{ width: '100%' }} onClick={exportToggle} >{exportValue}</button>
        <Highlighter visible={exportActive} content={exportDisplay} />

      </div>

      <div style={{ padding: '8px 0 40px' }}>

        <article className="message is-dark">
          <div className="message-body">
            Shows the <strong>full code</strong> example of the above
          </div>
        </article>

        <button className="button is-dark" style={{ width: '100%' }} onClick={fullToggle} >{fullValue}</button>
        <Highlighter visible={fullActive} content={fullDisplay} />

      </div>

    </div>
  );

};

export default Store;
