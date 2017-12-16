const jsdom = require('jsdom');
const { JSDOM } = jsdom;
import { join } from 'path';

const INDEX_HTML_PATH = join(__dirname, '../dist/index.html');

// setup the simplest document possible
JSDOM.fromFile(INDEX_HTML_PATH, {
  pretendToBeVisual: true,
  includeNodeLocations: true,
  runScripts: 'dangerously'
}).then(dom => {
  // set globals for mocha that make access to document and window
  global.JSDOM_dom = dom;
  global.window = dom.window;
  global.document = dom.window.document;
  global.navigator = { userAgent: 'node.js' };
});
