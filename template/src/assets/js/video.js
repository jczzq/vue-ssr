export default class {
  constructor(player) {
    this.player = player;
  }

  buffered() {
    let buffered = this.player.buffered;

    if (!buffered || !buffered.length) {
      buffered = this.createTimeRanges(0, 0);
    }

    return buffered;
  }

  duration() {
    return this.player.duration;
  }

  bufferedEnd() {
    const buffered = this.buffered();
    const duration = this.duration();
    let end = buffered.end(buffered.length - 1);

    if (end > duration) {
      end = duration;
    }

    return end;
  }

  createTimeRanges(start, end) {
    if (Array.isArray(start)) {
      return this.createTimeRangesObj(start);
    } else if (start === undefined || end === undefined) {
      return this.createTimeRangesObj();
    }
    return this.createTimeRangesObj([[start, end]]);
  }

  createTimeRangesObj(ranges) {
    if (ranges === undefined || ranges.length === 0) {
      return {
        length: 0,
        start() {
          throw new Error('This TimeRanges object is empty');
        },
        end() {
          throw new Error('This TimeRanges object is empty');
        }
      };
    }
    return {
      length: ranges.length,
      start: this.getRange.bind(null, 'start', 0, ranges),
      end: this.getRange.bind(null, 'end', 1, ranges)
    };
  }

  getRange(fnName, valueIndex, ranges, rangeIndex) {
    this.rangeCheck(fnName, rangeIndex, ranges.length - 1);
    return ranges[rangeIndex][valueIndex];
  }

  rangeCheck(fnName, index, maxIndex) {
    if (typeof index !== 'number' || index < 0 || index > maxIndex) {
      throw new Error(
                `Failed to execute '${fnName}' on 'TimeRanges': The index provided (${index}) is non-numeric or out of bounds (0-${maxIndex}).`
            );
    }
  }
}
