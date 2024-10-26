import deepfreeze from 'deep-freeze';

export default deepfreeze({
  staleTime: 120 * 1000,
  retry: false,
});
