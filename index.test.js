const Band = require('./models/Band');
const Musician = require('./models/Musician');
const Song = require('./models/Song');

describe('Band, Musician, and Song CRUD operations', () => {

  beforeAll(async () => {
    await Band.sync({ force: true });
    await Musician.sync({ force: true });
    await Song.sync({ force: true });
  });

  test('can create a Band', async () => {
    const testBand = await Band.create({ name: 'The Beatles', genre: 'Rock' });
    expect(testBand.name).toBe('The Beatles');
    expect(testBand.genre).toBe('Rock');
  });

  test('can create a Musician', async () => {
    const testMusician = await Musician.create({ name: 'John Lennon', instrument: 'Guitar' });
    expect(testMusician.name).toBe('John Lennon');
    expect(testMusician.instrument).toBe('Guitar');
  });

  test('can create a Song', async () => {
    const testSong = await Song.create({ title: 'Hey Jude', year: 1968, length: 431 });
    expect(testSong.title).toBe('Hey Jude');
    expect(testSong.year).toBe(1968);
    expect(testSong.length).toBe(431);
  });

  test('can update a Band', async () => {
    const band = await Band.create({ name: 'The Rolling Stones', genre: 'Rock' });
    band.name = 'The Rolling Stones (Updated)';
    await band.save();
    const updatedBand = await Band.findByPk(band.id);
    expect(updatedBand.name).toBe('The Rolling Stones (Updated)');
  });

  test('can update a Musician', async () => {
    const musician = await Musician.create({ name: 'Paul McCartney', instrument: 'Bass' });
    musician.instrument = 'Guitar';
    await musician.save();
    const updatedMusician = await Musician.findByPk(musician.id);
    expect(updatedMusician.instrument).toBe('Guitar');
  });

  test('can update a Song', async () => {
    const song = await Song.create({ title: 'Let It Be', year: 1970, length: 240 });
    song.title = 'Let It Be (Updated)';
    await song.save();
    const updatedSong = await Song.findByPk(song.id);
    expect(updatedSong.title).toBe('Let It Be (Updated)');
  });

  test('can delete a Band', async () => {
    const band = await Band.create({ name: 'Nirvana', genre: 'Grunge' });
    await band.destroy();
    const deletedBand = await Band.findByPk(band.id);
    expect(deletedBand).toBeNull();
  });

  test('can delete a Musician', async () => {
    const musician = await Musician.create({ name: 'Kurt Cobain', instrument: 'Guitar' });
    await musician.destroy();
    const deletedMusician = await Musician.findByPk(musician.id);
    expect(deletedMusician).toBeNull();
  });

  test('can delete a Song', async () => {
    const song = await Song.create({ title: 'Smells Like Teen Spirit', year: 1991, length: 301 });
    await song.destroy();
    const deletedSong = await Song.findByPk(song.id);
    expect(deletedSong).toBeNull();
  });

});