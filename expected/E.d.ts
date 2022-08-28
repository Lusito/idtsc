/* eslint-disable max-classes-per-file */
/**
 * Some class
 */
export declare class A {
    private type;

    /** something something */
    public prop: string;

    private constructor();

    private foo;
}

export declare class B {
    private foo;

    /** Construct me */
    public constructor(foo: string);
}

export declare class D {
    private set foo(value);

    private get foo();
}

export declare class E {
    private type;

    private set foo(value);

    private get foo();
}

export declare class F {
    /**
     * The type of this object
     */
    protected type: string;

    protected set foo(value: string);

    protected get foo();

    protected constructor(foo: string);

    /**
     * Something something
     *
     * @param foo Some parameter
     * @returns Something else
     */
    protected bar(foo: string): number;
}