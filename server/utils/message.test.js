var expect = require('expect');
var { generateMsg, generateLocationMsg } = require('./message')
describe('generateMsg', () => {
    it('should generate correct message object', () => {
        
        var from = 'Faker';
        var text = 'Some message';

        var message = generateMsg(from, text);

        expect(message.createdAt)
            .toBeA('number');
        
        expect(message)
            .toInclude({from, text});
    });
});

describe('generateLocationMsg', () => {
    it('should generate correct location url', () => {
        var from = 'Debian';
        var latitude = 15;
        var longitude = 19;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var message = generateLocationMsg(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});