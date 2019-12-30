"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const store_1 = require("./store");
const highlighter_1 = __importDefault(require("./highlighter"));
const utils_1 = require("./utils");
const Store = () => {
    const [store, dispatch] = store_1.useStore();
    const page = store.active;
    const toggles = utils_1.createToggles({
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
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("p", { className: page.box, style: { padding: '18px', marginTop: '12px' } }, page.description),
        react_1.default.createElement("div", { style: { padding: '8px 0 40px' } },
            react_1.default.createElement("article", { className: "message is-dark" },
                react_1.default.createElement("div", { className: "message-body" },
                    react_1.default.createElement("strong", null, "Create a Tentacle"),
                    " or event stack that your ",
                    react_1.default.createElement("strong", null, "Octopods"),
                    "can trigger on change of status. Within your pod (shown below) you can trigger status changes allowing for the event listeners to be triggered. Click \"show code\" below to see how this is initialized.")),
            react_1.default.createElement("button", { className: "button is-dark", style: { width: '100%' }, onClick: eventToggle }, eventValue),
            react_1.default.createElement(highlighter_1.default, { visible: eventActive, content: eventDisplay })),
        react_1.default.createElement("div", { style: { padding: '8px 0 40px' } },
            react_1.default.createElement("article", { className: "message is-dark" },
                react_1.default.createElement("div", { className: "message-body" },
                    react_1.default.createElement("strong", null, "Create a Handler"),
                    " to trigger the above ",
                    react_1.default.createElement("strong", null, "Tentacle"),
                    " event stacks.")),
            react_1.default.createElement("button", { className: "button is-dark", style: { width: '100%' }, onClick: handlerToggle }, handlerValue),
            react_1.default.createElement(highlighter_1.default, { visible: handlerActive, content: handlerDisplay })),
        react_1.default.createElement("div", { style: { padding: '8px 0 40px' } },
            react_1.default.createElement("article", { className: "message is-dark" },
                react_1.default.createElement("div", { className: "message-body" },
                    react_1.default.createElement("strong", null, "Create an Octopod"),
                    " instance passing in any ",
                    react_1.default.createElement("strong", null, "Tentacle"),
                    "instances (multiple supported) and a ",
                    react_1.default.createElement("strong", null, "Handler "),
                    "function that will be used for dispatching.")),
            react_1.default.createElement("button", { className: "button is-dark", style: { width: '100%' }, onClick: podToggle }, podValue),
            react_1.default.createElement(highlighter_1.default, { visible: podActive, content: podDisplay })),
        react_1.default.createElement("div", { style: { padding: '8px 0 40px' } },
            react_1.default.createElement("article", { className: "message is-dark" },
                react_1.default.createElement("div", { className: "message-body" },
                    react_1.default.createElement("strong", null, "Finally Export"),
                    " out your Octo store exposing your provider and your ",
                    react_1.default.createElement("strong", null, "useOcto"),
                    " hook.")),
            react_1.default.createElement("button", { className: "button is-dark", style: { width: '100%' }, onClick: exportToggle }, exportValue),
            react_1.default.createElement(highlighter_1.default, { visible: exportActive, content: exportDisplay })),
        react_1.default.createElement("div", { style: { padding: '8px 0 40px' } },
            react_1.default.createElement("article", { className: "message is-dark" },
                react_1.default.createElement("div", { className: "message-body" },
                    "Shows the ",
                    react_1.default.createElement("strong", null, "full code"),
                    " example of the above")),
            react_1.default.createElement("button", { className: "button is-dark", style: { width: '100%' }, onClick: fullToggle }, fullValue),
            react_1.default.createElement(highlighter_1.default, { visible: fullActive, content: fullDisplay }))));
};
exports.default = Store;
//# sourceMappingURL=home.js.map