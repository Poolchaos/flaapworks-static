
class Navigate {
  to(route) {
    let element = document.querySelector(`#${route}`);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // setTimeout(() => {
    //   console.log(' ::>> element >>>>> ', { element }, element.offsetTop);
      // window.scrollTo(0, element.offsetTop);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }, 500);
  }
}

class BlockSelector {
  blockSelector;
  activeElement;
  activeContentElement;
  contentElements;
  parentElement;

  constructor(blockSelector, selector) {
    this.blockSelector = blockSelector;
    this.contentElements = Array.prototype.slice.call(
      document.querySelectorAll(selector)
    );
  }
  select(el, parentElementId) {
    if (parentElementId) {
      this.hideElement(parentElementId);
    } else {
      this.removeActive();
      this.addActive(el);
    }
    this.showServiceInfo(el.id);
  }
  hideElement(parentElementId) {
    if (!this.parentElement) {
      let el = document.querySelector('#' + parentElementId);
      this.parentElement = el;
    }
    if (this.parentElement) {
      this.hide(this.parentElement);
    }
  }
  removeActive() {
    if (this.activeElement) {
      this.activeElement.className = this.activeElement.className.replace(' showHover', '');
    } else {
      let el = document.querySelector(this.blockSelector + ' .showHover');
      if (el) {
        el.className = el.className.replace(' showHover', '');
      }
    }
  }
  addActive(el) {
    if (el) {
      this.activeElement = el;
      this.activeElement.className += ' showHover';
      this.show(this.activeElement);
    }
  }
  showServiceInfo(id) {
    this.contentElements.find(el => {
      if (el.id === id + '-block') {
        this.activeContentElement = el;
        this.show(this.activeContentElement);
      } else {
        this.hide(el);
      }
    });
  }
  show(el) {
    let element = document.querySelector('#' + el.id)
    element.className = element.className.replace(' hidden', '');
  }
  hide(el) {
    console.log(' ::>> hide ', el);
    let element = document.querySelector('#' + el.id)
    if (element.className.indexOf(' hidden') === -1) {
      element.className += ' hidden';
    }
  }
  back() {
    console.log(' ::>> back ', this.activeContentElement);
    if (this.activeContentElement) {
      this.hide(this.activeContentElement);
    }
    console.log(' ::>> this.parentElement >>>> ', this.parentElement);
    if (this.parentElement) {
      this.show(this.parentElement);
    }
  }
  resetAndBack(elementToHideId, elementParentToHideId, elementToShowId1, elementToShowId2) {
    console.log(' ::>> resetAndBack >>>> ', {
      elementToHideId, elementParentToHideId, elementToShowId1, elementToShowId2
    });
    if (elementToHideId) this.hide({ id: elementToHideId });
    if (elementParentToHideId) this.hide({ id: elementParentToHideId });
    if (elementToShowId1) this.show({ id: elementToShowId1 });
    if (elementToShowId2) this.show({ id: elementToShowId2 });
    this.back();
  }
}

const actions = {
  navigate: new Navigate(),

  service: new BlockSelector('#services', '#services .website-info'),

  explore: new BlockSelector('#explore', '#explore .website-info'),

  about: new BlockSelector('#about', '#about .website-info'),
  aboutProfile: new BlockSelector('#profile-block', '#profile-block .website-info-about'),
};