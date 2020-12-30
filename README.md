# idtsc

[![License](https://flat.badgen.net/github/license/lusito/idtsc?icon=github)](https://github.com/lusito/idtsc/blob/master/LICENSE)
[![NPM version](https://flat.badgen.net/npm/v/idtsc?icon=npm)](https://www.npmjs.com/package/idtsc)
[![Stars](https://flat.badgen.net/github/stars/lusito/idtsc?icon=github)](https://github.com/lusito/idtsc)
[![Watchers](https://flat.badgen.net/github/watchers/lusito/idtsc?icon=github)](https://github.com/lusito/idtsc)

idtsc (**i**nternal .**d**.**ts** **c**leanup). 

It's a post-processing step to hide/protect internal properties & methods by adding jsdoc tags.

- Transforms class properties marked with `@internal protected`:
  - Access level is changed to protected
  - The `@internal protected` will be removed from the jsdoc.
- Transforms class properties marked with `@internal` (without `protected`):
  - Access level is changed to private
    - If you just remove these properties, you get no warning when extended classes re-define them.
  - Type annotation is removed
    - To avoid referencing internal types, this works similar to how tsc writes private properties
  - Comments are removed
    - They should not be used, so no need to keep the comments.
- Removes exports marked with `@internal`

It is meant to be run on your generated `.d.ts` files.

#### Why use idtsc

- It's simple to use.
- There's [a proposal](https://github.com/microsoft/TypeScript/issues/5228) for an `internal` modifier (in addition to public/protected/private), but it doesn't seem to get anywhere.
- Liberal license: [zlib/libpng](https://github.com/Lusito/idtsc/blob/master/LICENSE)

### Installation via NPM

Install it as dev-dependency in your project:
```
npm i -D idtsc
```

### Adding jsdoc

To mark your properties, methods and classes as internal, simply add a jsdoc tag:

```typescript
export declare class A {
    /** @internal */
    public type: string;

    /** @internal protected */
    public sharedProp: string;
}
```

### Simple Usage

Say you have a build script, which writes `.d.ts` files into the folder `<root>/dist`:

`"build": "tsc"`

All you need to do is ensure that idtsc runs after the build:

`"build": "tsc && idtsc"`

### Advanced usage

type `npx idtsc --help` to see all available options.

Syntax: `idtsc [options] [pattern]`
```
Positionals:
  pattern  files to process (glob pattern)         [default: "./dist/**/*.d.ts"]

Options:
      --help       Show help
      --version    Show version number
  -v, --verbose    Show processed files
  -w, --tab-width  Use a different tab-width when formatting new code
```

### Example

Let's say, you have the following code:

```typescript
/**
 * Some class
 */
export declare class A {
    /** @internal */
    public type: string;

    /** something something */
    public prop: string;

    /** @internal protected */
    public sharedProp: string;

    /** @internal */
    public constructor(foo: string);

    /** @internal */
    public foo(foo: string): void;
}

export declare class B {
    /** @internal */
    public foo: string;

    /** Construct me */
    public constructor(foo: string);
}

/** @internal */
export declare class C {
    /** @internal */
    public foo: string;

    public constructor(foo: string);
}

export declare class D {
    /** @internal */
    public set foo(value: string);

    /** @internal */
    public get foo();
}

export declare class E {
    /** @internal */
    type: string;

    /** @internal */
    set foo(value: string);

    /** @internal */
    get foo();
}

```

After running idtsc, you'll get:
```typescript
/**
 * Some class
 */
export declare class A {
    private type: unknown;

    /** something something */
    public prop: string;

    protected sharedProp: string;

    private constructor();

    private foo: unknown;
}

export declare class B {
    private foo: unknown;

    /** Construct me */
    public constructor(foo: string);
}

export declare class D {
    private set foo(value: unknown);

    private get foo(): unknown;
}

export declare class E {
    private type: unknown;

    private set foo(value: unknown);

    private get foo(): unknown;
}
```

### Report issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/idtsc/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

### Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

### License

idtsc has been released under the [zlib/libpng](https://github.com/Lusito/idtsc/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
