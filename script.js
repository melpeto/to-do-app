
//creating an app where the user puts a task in the form, submit the form, and the value shows up on the screen


    //query the DOM to find the element. Make it a variable to store it
const formElement = document.querySelector('form');
console.log(formElement);  //in console should see the form node

    //add an event listener for the 'submit' of the form.
    //call the .addEventListener() method on the element.
    //when the event occurs, it creates an OBJECT which holds information about the event. We can take the event object e, and use a method that exists on THAT object. so, need to pass the event as an argumnet to the callback function on the event listener.
formElement.addEventListener('submit', function(e) {
    e.preventDefault();   //** use a method on the event object to stop the page from refeshing when the form is submitted.

    const inputElement = document.getElementById('toDoItem'); //get the item from the form input
    console.log(inputElement);

        //when the form is submitted, if the user has entered a value, run code, if they submitted an empty string, alert them to enter task. The most explicit way:
    if (inputElement.value !== '') {
        // console.log(inputElement.value);
        const liElement = document.createElement('li'); //create an li
        liElement.innerHTML = `<i class="fa-regular fa-square"></i>`;  //add some html to it, for the checkbox

        // liElement.textContent = `${inputElement.value}`;  //can add text content to the li and use the value of the input as the content. but this is reassinging a new value and overriding what is currently in the li, the checkbox
        
        const taskContent = document.createTextNode(inputElement.value); //instead can create a node that represents the text we want to add (the task inputted by the user), then append that text to the li. the textNode can be added wihtout replacing whats already there
        liElement.appendChild(taskContent);

        const ulElement = document.querySelector('ul'); //get the ul element and add the li as a child
        ulElement.appendChild(liElement);
        // document.querySelector('ul').appendChild    //could also find the ul and chain the append method on in the same line

        inputElement.value = ''; //clear the input
    } else {
        alert('Please enter a task!');
    }
    //another way is using the inherent value of a string, truthy vs falsey. if there's a string there, its true. If its an empty string, its false:
    // if (inputElement.value) {} else {alert('Please enter a task!');}
});

//** clicking on a task allows you to togglebetween checked vs unchecked (aka done or not done)

    //not setting this up inside the other submit event listener, bc then it would run every time the form is submitted. we only need this to happen when the boxes are checked
    // want it to be only when the icon checkbox itself is clicked, not the whole li
    
    //we are selecting the li again bc we defined our liElement variable INSIDE the other function:
        // const listElements = document.querySelector('li');
        // listElements.addEventListener('click', function() {
        //     console.log('to-do has been checked!');
        // });

    // BUT ^this causes an error because the li doesn't exist yet!!
    //need EVENT PROPAGATION: we will delegate the responsibility of listening to this event to the (future)li's parent
    const unorderedList = document.querySelector('ul');
    unorderedList.addEventListener('click', function(e) {
        console.log(e);  //if we look at the event object e which is 'click' we can see that it has properties we can use to find the checkbox. look inside the target object, and can see the i element has a localName = 'i' so we could use that
        if (e.target.localName === 'i') {
            console.log('checkbox was clicked!')
            // toggle the classes on the target:
            e.target.classList.toggle('fa-square-check') //does this class exist on the element? If not, add it. If it does, remove it.
            e.target.classList.toggle('fa-square');  //does this class exist on the element? If not, add it. If it does, remove it.
        }

    });
    //the 'this' keyword represents the object which owns the code that is currently running. "what code is running? Ok, what caused this code to run?"


//BONUS?
    //add a 'reset' function which clears all of the to-dos
    //add a remove-task button to each task
    //congrats message for finishing alll the tasks
    //add a take-a-break message if 5 more more tasks are completed