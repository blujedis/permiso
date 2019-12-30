import { ReactElement, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import pretty from 'pretty-format';
import renderer from 'react-test-renderer';

const { ReactTestComponent } = pretty.plugins;

export function renderComponent(component: ReactElement) {
  return pretty(renderer.create(component), {
    plugins: [ReactTestComponent],
    printFunctionName: true
  });
}

export function renderComponentString(component: ReactElement) {
  return renderToStaticMarkup(component);
}

export interface IToggle {
  active?: boolean;         // whether or not is active.
  on?: any;                 // value on active.
  off?: any;                // value on inactive.
  display?: any;            // only shown when active.
}

export function createToggles<T extends { [key: string]: IToggle }>(toggles: T, def: any = null) {

  for (const k in toggles) {
    if (!toggles.hasOwnProperty(k)) continue;
    toggles[k].active = toggles[k].active || false;
    toggles[k].on = toggles[k].on || null;
    toggles[k].off = toggles[k].off || null;
    toggles[k].display = toggles[k].display || null;
  }

  const context = useState(toggles);

  const use = <K extends keyof T>(key: K) => {

    const [state, setState] = context;

    let nextState = state;

    const setter = (active?: boolean) => {

      // This happens when event is passed.
      if (typeof active === 'object')
        active = undefined;

      if (typeof active === 'undefined')
        active = state[key].active ? false : true;

      state[key] = { ...state[key], active };
      nextState = { ...state };

      setState(nextState);

    };

    const isActive = nextState[key].active;
    const value = isActive ? nextState[key].on : nextState[key].off;
    const display = isActive ? nextState[key].display : def;

    return [value, setter, display, isActive];

  };

  return {
    context,
    use
  };

}
