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
    var settPost = {
        url: myApi,
        method: 'POST'
    }
    /***********
     * actions *
     ***********/
    // get all todo
    printTodo(settGet, template, todoList);


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