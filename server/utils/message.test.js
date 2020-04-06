var expect = require('expect');
var { generateMsg } = require('./message')
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