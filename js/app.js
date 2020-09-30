//Domcontentloaded - this allows the app.js script to be placed anywhere in the HTML script.
document.addEventListener('DOMContentLoaded', () => {

		const form = document.getElementById('guestInput');
		const input = form.querySelector('input');
		const mainDiv = document.querySelector('.main');
		const ul = document.getElementById('invitedList');

		const div = document.createElement('div');
		const filterLabel = document.createElement('label');
		const filterCheckBox = document.createElement('input');

		filterLabel.textContent = "Hide those who haven't responded";
		filterCheckBox.type = 'checkbox';
		div.appendChild(filterLabel);
		div.appendChild(filterCheckBox);
		mainDiv.insertBefore(div, ul);

		//Filters through the list Items to see who has sent an rsvp and hide the names of those who havn't.
		filterCheckBox.addEventListener('change', (e) => {
				const isChecked = e.target.checked;
				const lis = ul.children;
				if (isChecked) {
						for(let i = 0; i < lis.length; i++) {
								let li = lis[i];
								if (li.className === 'responded') {
										li.style.display = '';
								} else {
										li.style.display = 'none';
								}
						}
				} else {
						for(let i = 0; i < lis.length; i++) {
								let li = lis[i];
								li.style.display = '';
						}
				}
		});

		//function creates a new item and passes into the event listener
		function createLi(text) {
				function createElement(elementName, property, value) {
						const element = document.createElement(elementName);
						element[property] = value;
						return element;
				}
				function appendToLI(elementName, property, value) {
						const element = createElement(elementName, property, value);
						li.appendChild(element);
						return element;
				}
				const li = document.createElement('li'); 
				appendToLI('span', 'textContent', text);
				appendToLI('label', 'textContent', 'Confirmed')
						.appendChild(appendToLI('input', 'type', 'checkbox'));
				appendToLI('button', 'textContent', 'edit');
				appendToLI('button', 'textContent', 'remove');
				return li;
		}

		//An event listener is placed on the form and calls the createLi function to create a new list item.
		form.addEventListener('submit', (e) => {
				e.preventDefault(); //Prevents the page refreshing when a name is placed in the input and instead captures the name.
				const text = input.value;
				input.value = ''; //Clears the input once a name has been added
				if (text === '') {
						alert('Please enter a name')
				} else {
						const li = createLi(text);
						ul.appendChild(li); //new created element is passed to and displayed in the ul
				}
		})

		ul.addEventListener('change', (e) => {
				const checkbox = event.target;
				const checked = checkbox.checked;
				const listItem = checkbox.parentNode.parentNode;
				const labelText = checkbox.parentNode.firstChild;
				//If box is checked it will change color
				if (checked) {
						listItem.className = 'responded';
						labelText.textContent = 'Confirmed';
				} else {
						listItem.className = '';
						labelText.textContent = 'Confirm';
				}
		});

		//allows the user to delete, edit then save an item on the list.
		ul.addEventListener('click', (e) => {
				if (e.target.tagName === 'BUTTON') {
						const button = e.target;
						const li = button.parentNode;
						const ul = li.parentNode;
						const action = button.textContent;
						const nameActions = {
								remove: () => {
										ul.removeChild(li);
								},
								edit: () => {
										const span = li.firstElementChild;
										const input = document.createElement('input');
										input.type = 'text';
										input.value = span.textContent;
										li.insertBefore(input, span);
										li.removeChild(span);
										button.textContent = 'save';
								},
								save: () => {
										const input = li.firstElementChild;
										const span = document.createElement('span');
										span.textContent = input.value;
										li.insertBefore(span, input);
										li.removeChild(input);
										button.textContent = 'edit';
								}
						}
						//select and run action in buttons name.
						nameActions[action]();
				}
		});

}); //End of DOMContentLoaded event listener.
