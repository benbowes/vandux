const { JSDOM } = require('jsdom');
const { join } = require('path');
const INDEX_HTML_PATH = join(__dirname, '../dist/index.html');

// setup DOM from dist/index.html
const setupJSDOM = JSDOM.fromFile(INDEX_HTML_PATH, { includeNodeLocations: true })
  .then(dom => {
    // set globals for mocha that make access to document and window
    global.JSDOM_dom = dom;
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = { userAgent: 'node.js' };
  });

export default setupJSDOM;
