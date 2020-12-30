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

export declare class F {
    /**
     * The type of this object
     *
     * @internal protected
     */
    public type: string;

    /** @internal protected */
    public set foo(value: string);

    /** @internal protected */
    public get foo();

    /** @internal protected */
    public constructor(foo: string);

    /**
     * Something something
     *
     * @param foo Some parameter
     * @returns Something else
     * @internal protected
     */
    public bar(foo: string): number;
}
