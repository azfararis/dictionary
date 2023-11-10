document.addEventListener('DOMContentLoaded', function() {
  const fileNameInput = document.getElementById('fileName');
  const fileContentsTextarea = document.getElementById('fileContents');
  const btnCreate = document.getElementById('btnCreate');
  const btnRead = document.getElementById('btnRead');
  const btnUpdate = document.getElementById('btnUpdate'); // Add this line
  const btnDelete = document.getElementById('btnDelete');
  const displayedData = document.getElementById('displayedData');

  const { ipcRenderer } = require('electron');

  btnCreate.addEventListener('click', function() {
    const fileName = fileNameInput.value;
    const fileContents = fileContentsTextarea.value;

    ipcRenderer.send('createFile', { fileName, fileContents });
  });

  btnRead.addEventListener('click', function() {
    const fileName = fileNameInput.value;

    ipcRenderer.send('readFile', fileName);
  });

  btnUpdate.addEventListener('click', function() { // Add this function
    const fileName = fileNameInput.value;
    const fileContents = fileContentsTextarea.value;

    ipcRenderer.send('updateFile', { fileName, fileContents });
  });

  btnDelete.addEventListener('click', function() {
    const fileName = fileNameInput.value;

    ipcRenderer.send('deleteFile', fileName);
  });

  ipcRenderer.on('fileCreated', (event, data) => {
    updateDisplayedData(data);
  });

  ipcRenderer.on('fileRead', (event, data) => {
    fileContentsTextarea.value = data;
    updateDisplayedData(data);
  });

  ipcRenderer.on('fileDeleted', (event, data) => {
    fileContentsTextarea.value = '';
    updateDisplayedData('');
  });

  function updateDisplayedData(data) {
    displayedData.textContent = data;
  }
});
