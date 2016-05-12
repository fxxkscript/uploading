/*
    Uploading

    new Uploading('//up.qiniu.com', file, 'token', 'POST');

**/

function Uploading(url, file, getTokenURL, method) {
    this._file = file;
    this._url = url;
    this._method = method;
    this._getTokenURL = getTokenURL;


}

Uploading.prototype.getToken = function() {
    var formData = new FormData();
    formData.append('scope', 'kdt_img_test');

    return this.ajax(this._getTokenURL, formData, 'POST');
};

Uploading.prototype.ajax = function(url, data, method) {
    var promise = new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();

        request.withCredentials = true;

        request.addEventListener('load', (event) => {
            resolve(event);
        });

        let fail = event => { reject(event); }

        request.addEventListener('error', fail);
        request.addEventListener('abort', fail);

        request.open(method, url);
        request.send(data);
    });

    return promise;
};

Uploading.prototype.send = function() {
    this._data = this._prepareData();

    return this._uploading(this._data);
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

    return this.ajax(this.url, data, this.method);
};

Uploading.prototype.destroy = function() {
    this._files = null;
    this._url = null;
    this._method = null;
    this._token = null;
    this._data = null;
};

/*

    DOM Binding

**/

function InputFile(element) {
    this._element = element;
    this._files = null;

    this.init();
};

InputFile.prototype.init = function() {
    this.bindDOM();
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

InputFile.prototype.destroy = function() {
    this.unbindDom();

    this._element = null;
    this._handler = null;
    this._files = null;
};
