import componentA from './components/componentA';
import componentB from './components/componentB';

document.addEventListener('DOMContentLoaded', () => {
  componentA({ open: false });
  componentB({ name: '', title: '', value: 20 });
});
