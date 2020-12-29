/* eslint-disable max-classes-per-file */
/**
 * Some class
 */
export declare class A {
    /** @internal */
    public type: string;

    /** something something */
    public prop: string;

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
