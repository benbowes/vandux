import componentA from './components/a';
import componentB from './components/b';

document.addEventListener('DOMContentLoaded', () => {
  componentA({ thing: 'ddd', aaa: '' });
  componentB({ a_bit_of: 'initial state', bbb: '', value: 20 });
});
