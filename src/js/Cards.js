export default class Cards {
  constructor() {
    this.board = null;
    this.lists = null;
  }

  init() {
    this.listenerAddCard();
    this.board.addEventListener('click', this.remove); 
    this.task = this.board.querySelectorAll('.task');
  }

  bindToDOM(board) {
    if (!(board instanceof HTMLElement)) {
      throw new Error('No board!');
    }
    this.board = board;
    this.lists = this.board.querySelectorAll('ul');
  }

  remove(e) {
    if (e.target.classList.contains('crest') && e.target.closest('li')) {
      e.target.closest('li').remove();
    }
  }

  listenerAddCard() {
    const add = [...document.querySelectorAll('.add')];
    add.forEach(el => {
      el.addEventListener('click', (e) => {
        const div = document.createElement('div'); 
        div.classList = 'textarea_div';
        div.innerHTML = `
              <textarea required class="textarea" cols="19" placeholder="New Task"></textarea>
              <p class="add">+ Add another card</p>
              <button class="crest">&#215</button>
              `;
        e.target.replaceWith(div);

        div.addEventListener('click', (event) => {
          if (event.target.classList.contains('cross')) {
            div.replaceWith(el);
          }
          if (event.target.classList.contains('add') && div.querySelector('.textarea').value !== '') {
            const li = this.addCard(div.querySelector('.textarea').value);
            const ul = event.target.closest('.col').querySelector('ul');
            ul.append(li);
            div.replaceWith(el);
            this.task = this.board.querySelectorAll('.task');
          }  
        })  
      })
    })
  }

  addCard(text) {
    const li = document.createElement('li');
    li.classList.add('task');
    li.insertAdjacentHTML('beforeend', `<span>${text}</span><button class="crest">&#215</button>`);
    return li;
  }

  save() {
    const saving = { todo: [], inprogress: [], done: [] };
    this.lists.forEach((elem) => {
      elem.querySelectorAll('li').forEach((el, i) => {
        saving[elem.getAttribute('data-category')][i] = el.querySelector('span').textContent;
      });
    });
    return saving;
  }

  load(loader) {
    this.lists.forEach((e) => {
      e.innerHTML = '';
    });

    Object.entries(loader).forEach(([key, value]) => {
      value.forEach((text) => {
        this.board.querySelector(`[data-category="${key}"]`).insertAdjacentElement('beforeend', this.addCard(text));
      });
    });
  }

}