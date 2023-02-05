import { $opcodes } from './$opcodes'

UTest({
    'overflows' () {
        eq_($opcodes.int256($opcodes.INT256_MAX + 1n), $opcodes.INT256_MIN);

        eq_($opcodes.sub(0n, 1n), $opcodes.UINT256_MAX);
        eq_($opcodes.div(1n, 2n), 0n);

        eq_($opcodes.sdiv(
            0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEn,
            0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn
        ), 2n);

        eq_($opcodes.smod(
            0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF8n,
            0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDn
        ),  0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEn);

        eq_($opcodes.addmod(
            0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn,
            2n,
            2n
        ), 1n);

        eq_($opcodes.mulmod(
            0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn,
            0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn,
            12n
        ), 9n);

        eq_($opcodes.slt(
            0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn,
            0n
        ), 1n);

        eq_($opcodes.not(
            0n
        ), 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn);

        eq_($opcodes.byte(31,0xFFn), 0xFFn);
        eq_($opcodes.byte(30,0xFF00n), 0xFFn);

        eq_($opcodes.sar(1, 2n), 1n);
        eq_($opcodes.sar(4, 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0n), 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn);
    }
})
