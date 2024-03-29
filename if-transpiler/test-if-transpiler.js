/**
 * Created by b_sayed on 15-09-18.
 */

var chai = require('chai');

Error.stackTraceLimit = Infinity;

var tree,
    esprima,
    escodegen,
    root,
    expect,
    common,
    path,
    fs,
    existsSync,
    ifTranspiler;

fs = require('fs');
path = require('path');
root = path.join(path.dirname(fs.realpathSync(__filename)));
esprima = require('esprima');
escodegen = require('escodegen');
common = require(path.join(root, 'lib', 'common'));
ifTranspiler = require(path.join(root, 'lib', 'esIF-Transpiler'));

existsSync = fs.existsSync || path.existsSync;
expect = chai.expect;


function testTransformations() {
    fs.readdirSync(__dirname + '/test/transform/').sort().forEach(function (file) {
        var p, codeName, code, expectedName, tree, expected,actual;
        if (/\.js$/.test(file)) {
            if (!/expected\.js$/.test(file)) {
                actual = null;
                expected = null;
                p = file.replace(/\.js$/, '.expected.js');
                codeName = __dirname + '/test/transform/' + file;
                expectedName = __dirname + '/test/transform/' + p;

                expect(existsSync(codeName)).to.be.true;
                expect(existsSync(expectedName)).to.be.true;

                code = fs.readFileSync(codeName, 'utf-8');
                expected = fs.readFileSync(expectedName, 'utf-8').trim();
                tree = esprima.parse(code, {
                    loc: true,
                    range: false,
                    raw: false,
                    tokens: false
                });
                tree = ifTranspiler.transform(tree, null, {
                    destructive: true,
                    directive: true
                });
                // We have to reset the counters to produce same exact result.
                common.resetCounters();

                var formatOption = common.deepCopy(escodegen.FORMAT_DEFAULTS);
                actual = escodegen.generate(tree, {
                    format: formatOption,
                    directive: true
                });

                console.log('Current Test File: '+codeName);
                //console.log(actual);
                //console.log('expected');
                //console.log(expected);


                expect(actual).to.be.equal(expected);

            }
        }
    });
    console.log('All tests passed successfully.');
};

testTransformations();