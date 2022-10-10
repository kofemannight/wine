"use strict"



/**=== Стандартная html разметка === */

/* <div class="dropdown">
<div class="dropdown_wrapper">
  <button class="dropdown_button">Options_1</button>
  <ul class="dropdown_list">
    <li class="dropdown_item" data-value="options1">Options_1</li>
    <li class="dropdown_item" data-value="options2">Options_2</li>
    <li class="dropdown_item" data-value="options3">Options_3</li>
    <li class="dropdown_item" data-value="options4">Options_4</li>
  </ul>
  <input class="dropdown_input" type="text" value="">
</div>
</div> */


/**=== Стандартная css разметка === */

/*
.dropdown_wrapper {
  position: relative;
}

.dropdown_button {
  position: relative;
  display: block;
  width: 100%;
  text-align: left;
  background: #fff;
  border: 1px solid rgb(99, 98, 98);
  border-radius: 6px;
  height: 46px;
  padding: 13px 20px;
  padding-right: 35px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  transition-property: background;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-duration: 300ms;
}

.dropdown_button:hover {
  background: rgb(202, 201, 201);
}

.dropdown_button:focus,
.dropdown_button--active {
  outline: none;
  box-shadow: 0 0 0 2px rgb(92, 92, 92);
}

.dropdown_button::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-width: 10.4px 6px 0 6px;
  border-color: rgb(99, 98, 98) transparent transparent transparent;
  border-style: solid;
  pointer-events: none;
}

.dropdown_list {
  display: none;
  position: absolute;
  left: 0;
  top: 52px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  background: #fff;
  box-shadow: 0px 4px 8px rgb(99, 98, 98);
  overflow: hidden;
  border-radius: 6px;
  width: 100%;
  z-index: 10000;
}

.dropdown_list--visible {
  display: block;
}

.dropdown_item {
  margin: 0;
  padding: 0;
  border: 1px solid rgb(99, 98, 98);
  padding: 13px 20px;
  border-bottom: none;
  cursor: pointer;
  transition-property: background;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-duration: 300ms;
}

.dropdown_item:first-child {
  border-radius: 6px 6px 0 0;
}

.dropdown_item:last-child {
  border-radius: 0 0 6px 6px;
  border-bottom: 1px solid rgb(99, 98, 98);
}

.dropdown_item:hover {
  background: rgb(202, 201, 201);
}

.dropdown_input {
  display: none;
}

*/

/** Добавляем полифил для метода forEach, т.к. IE такой метод для NodeList не поддерживает */
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

/** Находим все dropdown на странице, и для каждого вызываем функцию */
document.querySelectorAll('.dropdown').forEach( function(dropdownWrap){

  /** Складываем элементы dropdown в переменные для удобства работы с ними */
  const dropdownButton = dropdownWrap.querySelector('.dropdown_button')
  const dropdownList = dropdownWrap.querySelector('.dropdown_list')
  const dropdownItems = dropdownWrap.querySelectorAll('.dropdown_item')
  const dropdownInput = dropdownWrap.querySelector('.dropdown_input')
  

  /** Прослущиваем клик по кнопке dropdown */
  dropdownButton.addEventListener('click', function() {

    /** Менякм класс dropdown листа на активный, делаем его видимым */
    dropdownList.classList.toggle('dropdown_list--visible')
    /** Кнопке dropdown также задаем активный класс */
    this.classList.add('dropdown_button--active')
  })
  

  /** Находим все элементы dropdown листа */
  dropdownItems.forEach(function(listItem) {

    /** Для каждого элемента прослушиваем клик */
    listItem.addEventListener('click', function(event) {

      /**Останавливаем всплытие события клик */
      event.stopPropagation()
      /**Присваем кнопке dropdown значение выбранного элемента листа */
      dropdownButton.innerText = this.innerText
      /** Оставляем фокус на кнопке dropdown */
      dropdownButton.focus()
      /** Передаем выбранное значение в скрытый input для возможности отправки формы */
      dropdownInput.value = this.dataset.value
      /** Скрываем dropdown лист после выбора элемента */
      dropdownList.classList.remove('dropdown_list--visible')
  
    })
  })


  /** Прослушиваем клик по всему документу */
  document.addEventListener('click', function(event) {
    /** Если клик не по dropdown кнопке */
    if(event.target !== dropdownButton) {
      /** Скрываем dropdown лист и убираем активные классы */
      dropdownButton.classList.remove('dropdown_button--active')
      dropdownList.classList.remove('dropdown_list--visible')
    }
  })
  

  /** Прослушиваем нажатие клавиш по всему документу */
  document.addEventListener('keydown', function(event){
    /** Если нажаты клавиши 'Tab' или 'Escape'*/
    if(event.key === 'Tab' || event.key === 'Escape') {
      /** Скрываем активные классы у dropdown кнопки и листа */
      dropdownButton.classList.remove('dropdown_button--active')
      dropdownList.classList.remove('dropdown_list--visible')
    }
  })
})

