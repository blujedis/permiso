# Permiso

Dot notation permissions helper with optional simple obfuscation. Permiso uses an object map, typically based on a folder structure. Permiso then allows you to use dot notation to build up a permissions path in a controlled way to ensure it matches the permissions map you have supplied.

Additionally you can use obfuscation which obscures, albeit insecurely the actual path to the permission. Essentially making it more difficult to exploit when used on the client side of your application. It is important to understand this is more or less a deterrent. This is because your server/api is the ultimate arbiter.

## Installation

```sh
$ npm install permiso -s
```

OR

```sh
$ yarn add permiso
```

## Getting Started

Consider the following map. Image a directory structure as follows:

/user
/user/profile

/admin
/admin/users

/common
/common/login
/common/reset

```ts
import permiso from 'permiso';

const obj = {

  anonymous: 'anonymous',
  authenticated: 'authenticated',

  user: {
    profile: 'profile' // value can be anything.
  },
  
  admin: {
    users: 'users' // such as a list etc.
  },

  common: {
    login: 'login',
    reset: 'reset'
  }

};

const 
```


