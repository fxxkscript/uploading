/*
    Uploading

    new Uploading('//up.qiniu.com', file, 'token', 'POST');

**/

function Uploading(url, file, token, method) {
    this._file = file;
    this._url = url;
    this._method = method;
    this._token = token;
}

Uploading.prototype.send = function() {
    let data = this._prepareData();

    return this._uploading(data);
};

Uploading.prototype._prepareData = function() {
    var formData = new FormData();

    formData.append('token', this._token);
    formData.append('file', this._file);

    return formData;
};

Uploading.prototype._uploading = function(data) {
    if (!this._url) {
        throw new Error('url cannot be empty');
    }
    var promise = new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();

        request.withCredentials = true;

        request.addEventListener('load', (event) => {
            resolve(event);
        });

        let fail = event => { reject(event); }

        request.addEventListener('error', fail);
        request.addEventListener('abort', fail);

        request.open(this._method, this._url);
        request.send(data);
    });

    return promise;
};

/*

    DOM Binding

**/

function InputFile(element) {
    this._element = element;
};

InputFile.prototype.bindDOM = function () {
    let handler = (e) => {
        let files = e.target.files;
        this._files = files;
    };
    this._handler = handler;
    this._element.addEventListener('change', handler);
};

InputFile.prototype.unbindDom = function() {
    this._element.removeEventListener('change', this._handler);
};

InputFile.prototype.getFile = function() {
    return this._files;
};
