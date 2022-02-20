export default class DragDrop {
  constructor() {
    this.board = null;
    this.drag = null;
    this.drop = null;
    this.x = null;
    this.y = null;
    this.elem = null;
    this.goal = null;
  }

  init() {
    this.board = document.querySelector('.board');
    this.board.addEventListener('mousedown', this.mousedown);
    this.board.addEventListener('mousemove', this.mousemove);
    this.board.addEventListener('mouseup', this.mouseup);
    this.board.addEventListener('mouseleave', this.mouseleave);
  }

  mousedown(e) {
    if (!e.target.closest('.task') || e.target.classList.contains('crest')) {
      return;
    }
    e.preventDefault();
    this.drag = e.target.closest('.task');
    this.drop = this.drag.cloneNode(true);
    this.x = e.clientX - this.drag.getBoundingClientRect().left;
    this.y = e.clientY - this.drag.getBoundingClientRect().top;

    this.drop.style.width = `${this.drag.offsetWidth}px`;
    this.drop.classList.add('dragged');
    document.querySelector('.board').appendChild(this.drop);
    // this.board.appendChild(this.drop);
    this.drop.style.left = `${e.pageX - this.x}px`;
    this.drop.style.top = `${e.pageY - this.y}px`;
    this.drag.style.opacity = 0;

    this.goal = document.createElement('li');
    this.goal.classList.add('goal');
    this.goal.style.height = `${this.drag.offsetHeight}px`;
  }

  mousemove(e) {
    e.preventDefault();
    if (!this.drag) {
      return;
    }

    this.drop.classList.add('hidden');
    this.elem = document.elementFromPoint(e.clientX, e.clientY);
    this.drop.classList.remove('hidden');

    this.drop.style.left = `${e.pageX - this.x}px`;
    this.drop.style.top = `${e.pageY - this.y}px`;

    if (this.elem.closest('.col')) {
      const parentEl = this.elem.closest('.col').querySelector('ul');

      if (!parentEl.hasChildNodes()) {
        parentEl.append(this.goal);
      } else if (this.elem.closest('.add')) {
        parentEl.append(this.goal);
      } else if (this.elem.closest('h3')) {
        parentEl.prepend(this.goal);
      } else if (this.elem.closest('.task')) {
        parentEl.insertBefore(this.goal, this.elem.closest('.task'));
      }
    }
  }

  mouseup(e) {
    e.preventDefault();
    if (!this.drag) {
      return;
    }

    if (!this.elem.closest('.col')) {
      document.querySelector('.board').removeChild(this.drop);
      document.querySelector('.goal').remove();
      this.drag.style.opacity = 100;
      this.drop = null;
      this.drag = null;
      return;
    }

    const parentUl = this.elem.closest('.col').querySelector('ul');

    if (this.elem.closest('h3')) {
      parentUl.prepend(this.drop);
    } else if (this.elem.closest('.add')) {
      parentUl.append(this.drop);
    } else {
      parentUl.insertBefore(this.drop, this.elem.closest('li'));
    }

    if (document.querySelector('.goal')) {
      document.querySelector('.goal').remove();
    }

    this.drop.classList.remove('dragged');
    this.drop.style = '100%';
    this.drag.remove();
    this.drag = null;
    this.drop = null;
  }

  mouseleave() {
    if (!this.drag) {
      return;
    }
    document.querySelector('.board').removeChild(this.drop);
    document.querySelector('.goal').remove();
    this.drag.style.opacity = 100;
    this.drop = null;
    this.drag = null;
  }
}
