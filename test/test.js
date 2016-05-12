var ele = document.getElementById('file');
var btn = document.getElementById('upload');

// var uploading = new Uploading('//up.qiniu.com', file, 'token', 'POST');

QUnit.test('if not select a file, can not get file', function(assert) {
    var input = new InputFile(ele);
    assert.ok(input.getFile() === null, 'ok');
});

QUnit.test( 'if select a file, can get file', function( assert ) {
    var done = assert.async();

    var input = new InputFile(ele);

    btn.addEventListener('click', function() {
        assert.ok(input.getFile().length === 1, 'got file');
        done();
    });
});
