import globalify from 'helpers/globalify'

declare global {
    interface Fc {
        super<T extends { new (...args: ConstructorParameters<T>): unknown }>(
            Super: T,
            ...args: ConstructorParameters<T>
        ): InstanceType<T>
        public(...Fc: unknown[]): void
        protected(...Fc: unknown[]): void
        destroy(destroy: () => void): void
        get(get: (key: string | symbol) => unknown): void
        set(get: (key: string | symbol) => unknown): void
    }
    const Fc: Fc &
        (<A extends unknown[] = [], R = void>(
            Fc: (...args: A) => R
        ) => {
            new (...args: A): R extends void ? T : R
        })
}

function Fc<T, A extends unknown[] = [], R = void>(
    Fc: (...args: A) => R
): {
    new (...args: A): R extends void ? T : R
} {
    // eslint-disable-next-line prefer-rest-params
    return __create(Fc, arguments[1])
}

globalify({ Fc })

Fc.super = function <T extends { new (...args: ConstructorParameters<T>): unknown }>(
    Super: T,
    ...args: ConstructorParameters<T>
): InstanceType<T> {
    function Composition(): Object {
        return this
    }

    if (Array.isArray(Super)) {
        Super.forEach(Super => {
            const prototype = Object.getPrototypeOf(Super.prototype)
            const prototype2 = prototype ? Object.getPrototypeOf(prototype) : null
            const prototype3 = prototype2 ? Object.getPrototypeOf(prototype2) : null
            const prototype4 = prototype3 ? Object.getPrototypeOf(prototype3) : null

            prototype4 &&
                Object.defineProperties(
                    Composition.prototype,
                    Object.getOwnPropertyDescriptors(prototype4)
                )
            prototype3 &&
                Object.defineProperties(
                    Composition.prototype,
                    Object.getOwnPropertyDescriptors(prototype3)
                )
            prototype2 &&
                Object.defineProperties(
                    Composition.prototype,
                    Object.getOwnPropertyDescriptors(prototype2)
                )

            prototype &&
                Object.defineProperties(
                    Composition.prototype,
                    Object.getOwnPropertyDescriptors(prototype)
                )
        })

        const supersMap: Record<string, unknown> = {}
        const supersFlags: boolean[] = []

        const traverse = (Super): void => {
            Super.forEach(Super => {
                const isGood = supersMap[Super.name] == null
                supersFlags.push(isGood)
                if (isGood) {
                    supersMap[Super.name] = Super
                    Super['___supers'] && traverse(Super['___supers'])
                }
            })
        }

        traverse(Super)

        Composition['___supers'] = Object.keys(supersMap).map(k => supersMap[k])
        Composition['___supersFlags'] = supersFlags

        return Composition as never
    }

    const superFlags = args[0].constructor['___supersFlags']

    callSuper(...(args as unknown as [unknown, T, ...unknown[]]))
    function callSuper(self: unknown, Super: T, ...args): void {
        if (self['___superIndex'] == null) {
            self['___superIndex'] = -1
        }

        ++self['___superIndex']

        if (self['___superIndex'] === superFlags.length - 1) {
            delete self['___superIndex']
            return
        }

        while (!superFlags[self['___superIndex']]) {
            ++self['___superIndex']

            if (self['___superIndex'] === superFlags.length - 1) {
                delete self['___superIndex']
            }

            return
        }

        if (Super['___constructor']) {
            Super['___constructor'].call(self, ...(args as unknown[]))
        } else {
            const object = new Super(...(args as ConstructorParameters<T>))

            Object.assign(self, object)
            Object.keys(object).forEach(k => {
                if (object[k] === object) {
                    self[k] = self
                }
            })
        }
    }

    return args[0]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Fc.public = function (...Fc: unknown[]): void {
    //
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Fc.protected = function (...Fc: unknown[]): void {
    //
}

Fc.destroy = function (destroy: () => void): void {
    this['___destroy'] = destroy
}

Fc.get = function (get: (key: string | symbol) => unknown): void {
    this['___get'] = get
}

Fc.set = function (set: (key: string | symbol) => unknown): void {
    this['___set'] = set
}

function __create<T, A extends unknown[], R>(
    Fc: (...args: A) => R,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isForwardNew
): {
    new (...args: A): R extends void ? T : R
} {
    return Fc as never
}
