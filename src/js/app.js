import Cards from './Cards';
import State from './State';
import DragDrop from './DragDrop';

const card = new Cards();
card.bindToDOM(document.querySelector('.board'));
card.init();

const dragDrop = new DragDrop();
dragDrop.init();

const state = new State(localStorage);

window.addEventListener('unload', () => {
  state.saver(card.save());
});

const loader = state.loader();
card.load(loader);
