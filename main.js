(function() {
    
var elements = document.querySelectorAll("a");    
var conn = new WebSocket('ws://127.0.0.1:8080/echo');
    conn.onmessage = function(e) { 
       var data = JSON.parse(e.data);
        console.log(data);
        elements.forEach(function(el){
            if (el.getAttribute('id') == data.id)
            {
                el.innerHTML = data.name;
            }
        });
    };
    conn.onopen = function(e) { conn.send('Hello Me!'); };    
    


console.log(elements);

elements.forEach(function(el){
    el.addEventListener('click', updateElement);
});

function updateElement()
{
    var id = this.getAttribute('id');
    var val = this.innerHTML;
    
    
    var textForm = document.createElement("input");  
    textForm.setAttribute('type', 'text');
    textForm.setAttribute('id', id);
    textForm.setAttribute('value', val);
    this.parentNode.appendChild(textForm);
    
    var cancelButton = document.createElement("input");  
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('id', 'cancel');
    cancelButton.setAttribute('value', 'Cancel');
    this.parentNode.appendChild(cancelButton);
    cancelButton.addEventListener('click', cancelUpdate);
    
    
    var sendButton = document.createElement("input");  
    sendButton.setAttribute('type', 'button');
    sendButton.setAttribute('id', 'send');
    sendButton.setAttribute('value', 'Send');
    this.parentNode.appendChild(sendButton);
    sendButton.addEventListener('click', sendUpdate);
    this.remove();
  //  this.parentNode.innerHTML = "<input type='text' value="+val+" id="+id+"><input type='button' id='send' value='Send'><input type='button' id='cancel' value='Cancel'>";
    
}

function cancelUpdate()
{
   var elementText = this.parentNode.querySelector("input[type=text]");
   var id = elementText.getAttribute('id');
   var value = elementText.value;
   
   parentNode = this.parentNode;   
   parentNode.innerHTML = '';       
   var link = document.createElement("a");  
   link.setAttribute('type', 'text');
   link.setAttribute('id', id);
   link.innerHTML = value;
   parentNode.appendChild(link);  
   link.addEventListener('click', updateElement);
}

function sendUpdate()
{
   var elementText = this.parentNode.querySelector("input[type=text]");
   var id = elementText.getAttribute('id');
   var value = elementText.value;
   
   
   const request = new XMLHttpRequest();

    // Указываем путь до файла на сервере, который будет обрабатывать наш запрос 
    const url = "ajax_quest.php";
     
    // Так же как и в GET составляем строку с данными, но уже без пути к файлу 
    const params = "id=" + id+ "&name=" + value;
     
    /* Указываем что соединение	у нас будет POST, говорим что путь к файлу в переменной url, и что запрос у нас
    асинхронный, по умолчанию так и есть не стоит его указывать, еще есть 4-й параметр пароль авторизации, но этот
        параметр тоже необязателен.*/ 
    request.open("POST", url, true);
     
    //В заголовке говорим что тип передаваемых данных закодирован. 
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     
    request.addEventListener("readystatechange", () => {

        if(request.readyState === 4 && request.status === 200) {       
            if (request.responseText){
                var data = {};
                data.id = id;
                data.name = value;
                conn.send(JSON.stringify(data));   
                     
                parentNode = this.parentNode;   
                parentNode.innerHTML = '';       
                var link = document.createElement("a");  
                link.setAttribute('type', 'text');
                link.setAttribute('id', id);
                link.innerHTML = value;
                parentNode.appendChild(link);  
                link.addEventListener('click', updateElement);
                                
            }
        }
    });
     
    //	Вот здесь мы и передаем строку с данными, которую формировали выше. И собственно выполняем запрос. 
    request.send(params);
}


}());