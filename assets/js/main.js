$(document).ready(function(){
    
    // reference
    var newTodoInput = $('.input-todo');
    var newTodoBtn = $('.fa-plus-circle');
    var todoList = $('.todos');
    var todoVal = newTodoInput.val().trim();

    // init hendlebars
    var source = $('#todo-template').html();
    var template = Handlebars.compile(source);

    // reference API 
    var myApi = 'http://157.230.17.132:3021/todos';
    var settGet = {
        url: myApi,
        method: 'GET' 
    }
    var settPost = {
        url: myApi,
        method: 'POST',
        data: {
            text : todoVal
        }
    }
    /***********
     * actions *
     ***********/
    // get all todo
    printTodo(settGet, template, todoList);
    // create a new todo item
    newTodoBtn.click(function(){
        createTodo(newTodoInput,settGet, settPost, template, todoList);
    });



}); // end document ready

/************
 * FUNCTIONS*
 ***********/
function printTodo(settGet, template, todoList) {
    //reset
    todoList.html('');
    $.ajax(settGet).done(function(data){
        var todos = data;
        for( var i = 0; i < todos.length; i++ ) {
            var todo = todos[i];
            var context = {
                text: todo.text,
                id: todo.id
            }
            var html = template(context);
            todoList.append(html);
        }
    }).fail(function(error){
        console.log('errore chiamata API');
    })
}

function createTodo(input, settGet, settPost, template, todoList) {
    // var todoVal = input.val().trim();
    $.ajax(settPost).done(function(){
        printTodo(settGet, template, todoList);
    }).fail(function(error){
        console.log('si è verificato un errore nell\'aggiunta del nuovo valore');
    })
}