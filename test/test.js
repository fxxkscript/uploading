var ele = document.getElementById('file');
var btn = document.getElementById('upload');
var input = new InputFile(ele);

QUnit.test('if not select a file, can not get file', function(assert) {
    var input = new InputFile(ele);
    assert.ok(input.getFile() === null, 'ok');
});


QUnit.test( 'if select a file, can get file', function( assert ) {
    var done = assert.async();

    btn.addEventListener('click', function() {
        assert.ok(input.getFile().length === 1, 'got file');
        done();
    });
});

QUnit.test( 'if select a file, can send file', function( assert ) {
    assert.expect(0);

    var done = assert.async();

    btn.addEventListener('click', function() {
        var uploading = new Uploading('//up.qiniu.com', input.getFile()[0], 'token', 'POST');
        uploading.send();

        done();
    });
});
