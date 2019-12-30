import React, { useEffect } from 'react';
import { RouteProps, DefaultParams } from 'wouter';
import { useStore } from './store';

interface IRoute extends RouteProps<DefaultParams> { }

const Route = (props: IRoute) => {
  const [state, setState] = useStore();
  const { path, component: Component, ...clone } = props;
  const key = path.replace(/^\//, '') || 'home';
  useEffect(() => {
    setState({ ...state, ...{ active: state[key] } });
  }, [path]);
  return (<Component {...clone as any} />);
};

export default Route;