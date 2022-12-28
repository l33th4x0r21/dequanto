import { EVM } from '../EVM';
import Opcode from '../interfaces/IOpcode';

export class COINBASE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'COINBASE';
        this.wrapped = false;
    }

    toString() {
        return 'block.coinbase';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new COINBASE());
};
