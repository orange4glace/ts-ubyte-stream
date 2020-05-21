import { UByteStream } from '../lib/ubyte-stream'

describe('ubyte-stream', () => {
  it('should read ubyte', () => {
    const stream = new UByteStream();
    stream.writeUBytes(128, 1);
    expect(stream.read()).toEqual([128]);
    stream.clear();
    stream.writeUBytes(237, 1);
    expect(stream.read()).toEqual([237]);
    stream.clear();
    stream.writeUBytes(199, 1);
    expect(stream.read()).toEqual([199]);
    stream.clear();
    stream.writeUBytes(0, 1);
    expect(stream.read()).toEqual([0]);
    stream.clear();
    stream.writeUBytes(2, 1);
    expect(stream.read()).toEqual([2]);
  });
  it('should read ushort', () => {
    const stream = new UByteStream();
    stream.writeUBytes(255, 2);
    console.log(stream.buffer, stream.read());
    expect(stream.read()).toEqual([255, 0]);
    stream.clear();
    stream.writeUBytes(23717, 2);
    expect(stream.read()).toEqual([165, 92]);
    stream.clear();
    stream.writeUBytes(65535, 2);
    expect(stream.read()).toEqual([255, 255]);
    stream.clear();
    stream.writeUBytes(28510, 2);
    expect(stream.read()).toEqual([94 ,111]);
    stream.clear();
    stream.writeUBytes(0, 2);
    expect(stream.read()).toEqual([0, 0]);
  });
})