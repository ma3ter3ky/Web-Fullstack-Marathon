mocha.setup('bdd');
const expect = chai.expect;

describe('checkBrackets function', function() {
    describe('Invalid inputs', function() {
        it('should return -1 for a number', function() {
            expect(checkBrackets(123)).to.equal(-1);
        });

        it('should return -1 for null', function() {
            expect(checkBrackets(null)).to.equal(-1);
        });

        it('should return -1 for undefined', function() {
            expect(checkBrackets(undefined)).to.equal(-1);
        });

        it('should return -1 for an object', function() {
            expect(checkBrackets({})).to.equal(-1);
        });

        it('should return -1 for an array', function() {
            expect(checkBrackets([])).to.equal(-1);
        });

        it('should return -1 for a string with no brackets', function() {
            expect(checkBrackets("Hello")).to.equal(-1);
        });
    });

    describe('Bracket-string tests', function() {
        it('should return 0 for "()"', function() {
            expect(checkBrackets("()")).to.equal(0);
        });

        it('should return 0 for "(())"', function() {
            expect(checkBrackets("(())")).to.equal(0);
        });

        it('should return 0 for "()()"', function() {
            expect(checkBrackets("()()")).to.equal(0);
        });

        it('should return 1 for "(()"', function() {
            // needs one extra ")" to balance
            expect(checkBrackets("(()")).to.equal(1);
        });

        it('should return 1 for "())"', function() {
            // needs one extra "(" at the start or somewhere
            expect(checkBrackets("())")).to.equal(1);
        });

        it('should return 2 for ")()()("', function() {
            // needs 1 "(" at the start and 1 ")" at the end
            expect(checkBrackets(")()()(")).to.equal(2);
        });

        it('should return 2 for ")("', function() {
            // needs 1 "(" before the first ")" and 1 ")" after the "("
            expect(checkBrackets(")(")).to.equal(2);
        });

        it('should return 0 for "((()))"', function() {
            // already perfectly balanced
            expect(checkBrackets("((()))")).to.equal(0);
        });

        it('should return 6 for ")))((("', function() {
            // three unmatched ")" and three unmatched "(" => total 6
            expect(checkBrackets(")))(((")).to.equal(6);
        });

        it('should return 2 for "())(()"', function() {
            // By manual counting, 1 unmatched ")" + 1 unmatched "(" => 2
            expect(checkBrackets("())(()")).to.equal(2);
        });
    });
});


mocha.run();