const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")

const Band = require('./models/Band');
const Musician = require('./models/Musician');
const Song = require('./models/Song');

Band.hasMany(Musician);
Musician.belongsTo(Band);

Band.belongsToMany(Song, { through: 'BandSong' });
Song.belongsToMany(Band, { through: 'BandSong' });

module.exports = {
    Band,
    Musician,
    Song
};
