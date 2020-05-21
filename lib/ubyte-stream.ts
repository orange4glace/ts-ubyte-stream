type Bit = 0 | 1;

export class UByteStream {

  private buffer_: Bit[] = [];
  public get buffer(): ReadonlyArray<Bit> {
    return this.buffer_;
  }

  write(bit: Bit): void {
    this.buffer_.push(bit);
  }

  writeUBytes(value: number, bytes: number): void {
    let bitOffset = 0;
    for (let i = 0; i < bytes; i ++) {
      for (let j = 0; j < 8; j ++) {
        const bit = (value & (1 << (bitOffset + 7 - j))) ? 1 : 0;
        this.write(bit);
      }
      bitOffset += 8;
    }
  }

  read(): number[] {
    const ret: number[] = [];
    let byteLength = Math.ceil(this.buffer_.length / 8);
    let idx = 0;
    for (let i = 0; i < byteLength; i ++) {
      let c = 0;
      for (let j = 0; j < 8; j ++) {
        if (this.buffer_[idx]) {
          c |= (1 << (7 - j));
        }
        idx++;
      }
      ret.push(c);
    }
    return ret;
  }
  
  flush(): void {
    const div = Math.ceil(this.buffer_.length / 8);
    const fill = div * 8 - this.buffer_.length;
    for (let i = 0; i < fill; i ++) {
      this.write(0);
    }
  }

  clear(): void {
    this.buffer_ = [];
  }

}