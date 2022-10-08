"use strict"

document.querySelector('.dropdown_button').addEventListener('click', function () {
  document.querySelector('.dropdown_list').classList.toggle('dropdown_list--visible')
  this.classList.add('dropdown_button--active')
})

document.querySelectorAll('.dropdown_item').forEach(function(listItem) {
  listItem.addEventListener('click', function() {
    document.querySelector('.dropdown_button').innerText = this.innerText
    document.querySelector('.dropdown_button').focus()
    document.querySelector('.dropdown_input').value = this.dataset.value
    document.querySelector('.dropdown_list').classList.remove('dropdown_list--visible')

  })
})