const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const deleteAllButton = document.getElementById('delete-all-button');

// Retrieve the list items from localStorage and render them on the page
const renderList = () => {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  for (const item of items) {
    const li = document.createElement('li');
    const text = document.createTextNode(item.text);
    li.appendChild(text);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    checkbox.addEventListener('change', () => {
      item.completed = checkbox.checked;
      localStorage.setItem('items', JSON.stringify(items));
      if (checkbox.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
    });
    li.appendChild(checkbox);
    const button = document.createElement('button');
    button.innerHTML = 'Delete';
    button.classList.add('delete-btn');
    button.addEventListener('click', () => {
      items.splice(items.indexOf(item), 1);
      localStorage.setItem('items', JSON.stringify(items));
      list.removeChild(li);
    });
    li.appendChild(button);
    if (item.completed) {
      li.classList.add('completed');
    }
    list.appendChild(li);
  }
};

// Save the list items to localStorage when they are added
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (value !== '') {
    const item = {
      text: value,
      completed: false,
    };
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    const li = document.createElement('li');
    const text = document.createTextNode(item.text);
    li.appendChild(text);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      item.completed = checkbox.checked;
      localStorage.setItem('items', JSON.stringify(items));
      if (checkbox.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
    });
    li.appendChild(checkbox);
    const button = document.createElement('button');
    button.innerHTML = 'Delete';
    button.classList.add('delete-btn');
    button.addEventListener('click', () => {
      items.splice(items.indexOf(item), 1);
      localStorage.setItem('items', JSON.stringify(items));
      list.removeChild(li);
    });
    li.appendChild(button);
    list.appendChild(li);
    input.value = '';
  }
});

// Render the list items on the page
renderList();

// Add event listener for delete all button
deleteAllButton.addEventListener('click', () => {
  localStorage.removeItem('items');
  list.innerHTML = '';
});
