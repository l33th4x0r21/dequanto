import { TEth } from '@dequanto/models/TEth';

export namespace $is {
    export function Number <T> (val: number | any): val is number {
        return typeof val === 'number' && isNaN(val) === false;
    }

    export function notNull<T> (val: T): boolean {
        return val != null
    }
    export function BigInt<T> (val: bigint | any): val is bigint {
        return typeof val === 'bigint';
    }
    export function Address (val: string, message?: string): val is TEth.Address {
        if (typeof val !== 'string') {
            return false;
        }
        // Make addresses like `0x0` also valid (assumed zeros)
        return /^0x[a-fA-F0-9]{1,40}$/g.test(val);
    }

    export function TxHash (val: TEth.Address): boolean {
        if (Hex(val) === false) {
            return false;
        }
        // 0x115f9d0e3c5d7538eb27466cf42ac68527703a14e93c0d1243131164af2d1c6c
        if (val.length !== 2 + 64) {
            return false;
        }
        return true;
    }

    export function Hex(str: string | any): str is TEth.Hex {
        if (typeof str !== 'string') {
            return false;
        }
        return /^0x[\da-f]+$/i.test(str);
    }
    export function HexBytes32(str: string | any): str is TEth.Hex {
        return Hex(str) && /0x.{64}/.test(str);
    }
}
