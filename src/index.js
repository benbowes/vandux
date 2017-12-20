import componentA from './examples/componentA';
import componentB from './examples/componentB';
import componentC from './examples/componentC';

document.addEventListener('DOMContentLoaded', () => {
  componentA({ open: false });
  componentB({ name: '', title: '', value: 20 });
  componentC({ results: [], isLoading: false });
});
