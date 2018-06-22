'use strict';

module.exports = function html(_ref) {
  var staticHost = _ref.staticHost,
      title = _ref.title;

  staticHost = staticHost || '';
  return '\n  <!DOCTYPE html>\n  <html>\n    <head>\n      <meta charset="utf-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">\n      <link rel="shortcut icon" type="image/x-icon" href="' + staticHost + 'assets/favicon.ico" />\n      <link href="' + staticHost + 'assets/index.css" rel="stylesheet">\n\n      <title>' + title + '</title>\n    </head>\n    <body>\n      <div id="root"></div>\n      <script src="' + staticHost + 'assets/index.js"></script>\n    </body>\n  </html>\n  ';
};

//# sourceMappingURL=html.js