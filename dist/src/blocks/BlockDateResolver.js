"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockDateResolver = void 0;
const _block_1 = require("@dequanto/utils/$block");
const alot_1 = __importDefault(require("alot"));
class BlockDateResolver {
    constructor(client) {
        this.client = client;
        this.AVG_INITIAL = {
            eth: 12 * 1000,
            bsc: 3 * 1000
        };
        this.known = [];
    }
    async getBlockNumberFor(date) {
        this.q = date;
        let now = new Date();
        let topBlock = {
            blockNumber: await this.client.getBlockNumberCached(),
            date: now,
            avg: this.AVG_INITIAL[this.client.platform],
        };
        this.known.push(topBlock);
        return await this.moveNext(date);
    }
    async moveNext(date) {
        let closestIndex = this.getClosest(date);
        let block = this.known[closestIndex];
        let timeDiff = this.diffTime(block.date, date);
        let timeDistance = Math.abs(timeDiff);
        const BLOCKS_TOLERANCE = 2;
        if (timeDistance < block.avg * BLOCKS_TOLERANCE) {
            return block.blockNumber;
        }
        if (this.closestTime != null && timeDistance >= this.closestTime) {
            let b = this.known[this.closestIdx];
            return b.blockNumber;
        }
        this.closestTime = timeDistance;
        this.closestIdx = closestIndex;
        let nextInfo = await this.checkPoint(block, timeDiff);
        if (nextInfo == null) {
            return block.blockNumber;
        }
        return this.moveNext(date);
    }
    getClosest(date) {
        let entry = (0, alot_1.default)(this.known).map(x => [
            this.diffTimeAbs(x.date, date),
            x
        ]).minItem(x => x[0])[1];
        let i = this.known.indexOf(entry);
        return i;
    }
    async checkPoint(anchor, diffTime) {
        let diffCount = Math.round(diffTime / anchor.avg);
        if (diffCount === 0) {
            return null;
        }
        let blockNumber = anchor.blockNumber + diffCount;
        let date = await this.getBlockDate(blockNumber);
        let info = {
            blockNumber: blockNumber,
            date: date,
        };
        this.push(info);
        this.refineAvg();
        return info;
    }
    push(info) {
        for (let i = 0; i < this.known.length; i++) {
            let x = this.known[i];
            if (info.date < x.date) {
                this.known.splice(i, 0, info);
                return;
            }
        }
        this.known.push(info);
    }
    async getBlockDate(blockNumber) {
        let block = await this.client.getBlock(blockNumber);
        if (block == null) {
            throw new Error(`Block not loaded: ${blockNumber}`);
        }
        let date = _block_1.$block.getDate(block);
        return date;
    }
    diffTime(t1, t2) {
        return (t2.getTime() - t1.getTime());
    }
    diffTimeAbs(t1, t2) {
        return Math.abs(this.diffTime(t1, t2));
    }
    getAvg(b1, b2) {
        let diff = this.diffTimeAbs(b1.date, b2.date);
        return Math.round(diff / Math.abs(b2.blockNumber - b1.blockNumber));
    }
    refineAvg() {
        for (let i = 1; i < this.known.length; i++) {
            let info = this.known[i];
            let prev = this.known[i - 1];
            info.avg = this.getAvg(prev, info);
            if (i === 1) {
                this.known[0].avg = info.avg;
            }
        }
    }
}
exports.BlockDateResolver = BlockDateResolver;
