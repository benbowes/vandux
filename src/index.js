import componentA from './components/componentA';
import componentB from './components/componentB';

document.addEventListener('DOMContentLoaded', () => {
  componentA({ thing: 'ddd', aaa: '' });
  componentB({ a_bit_of: 'initial state', bbb: '', value: 20 });
});
