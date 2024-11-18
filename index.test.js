// Part 1: CRUD Operations Tests
const { Band, Musician, Song } = require('./index');
const sequelize = require('./db');

describe('CRUD Operations Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('should create a new Band', async () => {
    const band = await Band.create({ name: 'The Beatles', genre: 'Rock' });
    expect(band.name).toBe('The Beatles');
    expect(band.genre).toBe('Rock');
  });

  it('should create a new Musician', async () => {
    const musician = await Musician.create({ name: 'John Lennon', instrument: 'Guitar' });
    expect(musician.name).toBe('John Lennon');
    expect(musician.instrument).toBe('Guitar');
  });

  it('should create a new Song', async () => {
    const song = await Song.create({ title: 'Hey Jude', year: 1968, length: 431 });
    expect(song.title).toBe('Hey Jude');
    expect(song.year).toBe(1968);
    expect(song.length).toBe(431);
  });

  it('should update a Band', async () => {
    const band = await Band.create({ name: 'The Beatles', genre: 'Rock' });
    band.name = 'The Beatles (Updated)';
    await band.save();
    expect(band.name).toBe('The Beatles (Updated)');
  });

  it('should update a Musician', async () => {
    const musician = await Musician.create({ name: 'John Lennon', instrument: 'Guitar' });
    musician.instrument = 'Bass';
    await musician.save();
    expect(musician.instrument).toBe('Bass');
  });

  it('should update a Song', async () => {
    const song = await Song.create({ title: 'Hey Jude', year: 1968, length: 431 });
    song.length = 435;
    await song.save();
    expect(song.length).toBe(435);
  });

  it('should delete a Band', async () => {
    const band = await Band.create({ name: 'The Beatles', genre: 'Rock' });
    await band.destroy();
    const foundBand = await Band.findByPk(band.id);
    expect(foundBand).toBeNull();
  });

  it('should delete a Musician', async () => {
    const musician = await Musician.create({ name: 'John Lennon', instrument: 'Guitar' });
    await musician.destroy();
    const foundMusician = await Musician.findByPk(musician.id);
    expect(foundMusician).toBeNull();
  });

  it('should delete a Song', async () => {
    const song = await Song.create({ title: 'Hey Jude', year: 1968, length: 431 });
    await song.destroy();
    const foundSong = await Song.findByPk(song.id);
    expect(foundSong).toBeNull();
  });
});

// Part 2: Associations Tests
describe('Associations Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const band1 = await Band.create({ name: 'The Beatles', genre: 'Rock' });
    const band2 = await Band.create({ name: 'The Rolling Stones', genre: 'Rock' });

    const musician1 = await Musician.create({ name: 'John Lennon', instrument: 'Guitar' });
    const musician2 = await Musician.create({ name: 'Paul McCartney', instrument: 'Bass' });
    const musician3 = await Musician.create({ name: 'Mick Jagger', instrument: 'Vocals' });
    const musician4 = await Musician.create({ name: 'Keith Richards', instrument: 'Guitar' });

    await band1.addMusician(musician1);
    await band1.addMusician(musician2);
    await band2.addMusician(musician3);
    await band2.addMusician(musician4);

    const song1 = await Song.create({ title: 'Hey Jude', year: 1968, length: 431 });
    const song2 = await Song.create({ title: 'Paint It Black', year: 1966, length: 210 });

    await band1.addSong(song1);
    await band2.addSong(song2);
    await band1.addSong(song2);
  });

  it('should retrieve all bands and their musicians', async () => {
    const bands = await Band.findAll({
      include: Musician,
    });

    expect(bands.length).toBe(2);
    expect(bands[0].Musicians.length).toBe(2);
    expect(bands[1].Musicians.length).toBe(2);
  });

  it('should retrieve all bands and their songs', async () => {
    const bands = await Band.findAll({
      include: Song,
    });

    expect(bands.length).toBe(2);
    expect(bands[0].Songs.length).toBe(2);
    expect(bands[1].Songs.length).toBe(1);
  });

  it('should add multiple musicians to a band', async () => {
    const band = await Band.create({ name: 'Led Zeppelin', genre: 'Rock' });
    const musician1 = await Musician.create({ name: 'Jimmy Page', instrument: 'Guitar' });
    const musician2 = await Musician.create({ name: 'John Bonham', instrument: 'Drums' });
    
    await band.addMusician(musician1);
    await band.addMusician(musician2);

    const foundBand = await Band.findByPk(band.id, { include: Musician });
    expect(foundBand.Musicians.length).toBe(2);
  });

  it('should add multiple songs to a band', async () => {
    const band = await Band.create({ name: 'Queen', genre: 'Rock' });
    const song1 = await Song.create({ title: 'Bohemian Rhapsody', year: 1975, length: 354 });
    const song2 = await Song.create({ title: 'We Will Rock You', year: 1977, length: 122 });

    await band.addSong(song1);
    await band.addSong(song2);

    const foundBand = await Band.findByPk(band.id, { include: Song });
    expect(foundBand.Songs.length).toBe(2);
  });
});
