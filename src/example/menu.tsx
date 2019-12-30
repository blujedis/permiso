import React, { FC } from 'react';
import { Link } from 'wouter';
import { useStore } from './store';

// @ts-ignore
const devVars = typeof window ? __DEV_VARS__ : {} as any;

interface IMenu {
  name: string;
}

const Menu: FC<IMenu> = ({ name }) => {

  const [store] = useStore();

  let ver = (devVars.version || '');
  ver = ver.length ? '(' + ver + ')' : '';

  const docs = devVars.docs || '/';
  const active = store.active;

  return (

    <div style={{ marginTop: '24px' }}>

      <div className="level">
        <div className="level-item level-left">
          <h1 className="title is-1" style={{ marginBottom: '8px' }}>{devVars.title || 'Library Name'}<span className="subtitle is-5 has-text-grey-lighter"> {ver}</span></h1>

        </div>
        <div className="level-item level-right">
          <h3 className="title is-3 has-text-grey-light">{active.title || 'asdf'} <a style={{ paddingLeft: '24px' }}
            href={devVars.repo} target="_blank"><img src="/github.png" width="30"
              style={{ position: 'relative', opacity: 0.5, paddingTop: '3px' }} /></a></h3>
        </div>

      </div>

      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">

          {/* <a role="button" className="navbar-burger burger" aria-label="menu" 
          aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a> */}

        </div>

        <div id="navbarBasicExample" className="navbar-menu">

          <div className="navbar-start">
            <Link href="/">
              <a className="navbar-item">
                {store.home.menu}
              </a>
            </Link>

            <Link href="/hook">
              {/* <a className="navbar-item">
                {store.hook.menu}
              </a> */}
            </Link>

            <a className="navbar-item" href={docs} target="_blank">
              Docs
              </a>

          </div>

        </div>

      </nav>

    </div>
  );

};

export default Menu;
