import componentA from './componentA';
import componentB from './componentB';
import componentC from './componentC';

document.addEventListener('DOMContentLoaded', () => {
  componentA({ open: false });
  componentB({ name: '', title: '', value: 20 });
  componentC({ results: [], isLoading: false });
});
