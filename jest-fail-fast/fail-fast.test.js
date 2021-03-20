
describe('Domain1', () => {
    describe('E2E flow 1', () => {
        it('should be true', () => {
            expect(true).toBeTruthy()
        })
        it('should fail', () => {
            expect(true).toBeFalsy()
        })
        it('should skip this', () => {
            expect(true).toBeTruthy()
        })
        it('should skip this too', () => {
            expect(true).toBeTruthy()
        })
    });

    describe('E2E flow 2', () => {
        it('should be true', () => {
            expect(true).toBeTruthy()
        })
        it('should be true', () => {
            expect(true).toBeTruthy()
        })
        it('should be true', () => {
            expect(true).toBeTruthy()
        })
        it('should be true', () => {
            expect(true).toBeTruthy()
        })
    });

});

