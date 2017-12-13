import componentA from './components/componentA';
import componentB from './components/componentB';

document.addEventListener('DOMContentLoaded', () => {
  componentA({ name: '' });
  componentB({ title: '', value: 20 });
});
