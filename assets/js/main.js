$(document).ready(function(){
    
    // reference
    var newTodoInput = $('.input-todo');
    var newTodoBtn = $('.fa-plus-circle');
    var todoList = $('.todos');

    // init hendlebars
    var source = $('#todo-template').html();
    var template = Handlebars.compile(source);

    // reference API 
    var myApi = 'http://157.230.17.132:3021/todos';
    var settGet = {
        url: myApi,
        method: 'GET' 
    }
    /***********
     * actions *
     ***********/
    // get all todo
    printTodo(settGet, template, todoList);
    // create a new todo item
    newTodoBtn.click(function(){
        createTodo(settGet, newTodoInput, myApi, template, todoList);
    });
    // remove a todo item
    $(document).on('click', '.remove', function(){
        delateTodo($(this), settGet, myApi, template, todoList);
    });
}); // end document ready

/************
 * FUNCTIONS*
 ***********/
// get all todo from API
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
// create a new todo function
function createTodo(settGet, input, myApi, template, todoList) {
    var todoVal = input.val().trim();
    $.ajax({
        url: myApi,
        method: 'POST',
        data: {
            text : todoVal
        } 
    }).done(function(){
        printTodo(settGet, template, todoList);
    }).fail(function(error){
        console.log('si è verificato un errore nell\'aggiunta del nuovo valore');
    })
}
// delate a todo by ID
function delateTodo(self, settGet, myApi, template, todoList) {
    var todoId = self.data('id');
    $.ajax({
        url: myApi + '/' + todoId,
        method: 'DELETE',
    }).done(function(){
        printTodo(settGet, template, todoList);
    }).fail(function(error){
        console.log('si è verificato un errore nella cancellazione dell\'elemento');
    })
}