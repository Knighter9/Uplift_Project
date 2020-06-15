document.addEventListener("DOMContentLoaded", () => {
    load_first_page();
    linking_logic();

});










function load_first_page() {
    let url = window.location.href;
    if (url === 'http://127.0.0.1:5000/') {
        let source = document.querySelector('#homepage-template').innerHTML;
        // get the destination for the handlebars html
        let destination = document.querySelector('.page-container');
        // push the html into the div
        destination.innerHTML = source;
        history.replaceState(document.querySelector('.page-container').innerHTML, document.title, document.location.href);
        // get the activae class to work for the navbar
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');

        });
    }
    else {
        let partial_url = url.split('http://127.0.0.1:5000/').pop();
        console.log(partial_url);
        let source = document.querySelector(`#${partial_url}-template`).innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');

        });
    }
}

// loading the forms
function linking_logic() {
    document.body.addEventListener('click', function (event) {
        var tag = event.target;
        if (tag.tagName == 'A' && tag.href && event.button == 0) {
            if (tag.origin = document.location.origin) {

                var old_path = document.location.pathname
                var new_path = tag.href;
                // get the name of the form
                const form_name = new_path.split('http://127.0.0.1:5000/').pop();
                event.preventDefault();
                console.log("Here i will user ajax the the browser should reload");
                if (form_name == null || form_name == '') {
                    let source = document.querySelector('#homepage-template').innerHTML;
                    let destination = document.querySelector('.page-container');
                    destination.innerHTML = source;
                    data = destination.innerHTML;
                    history.pushState(data, new_path, new_path);
                    form_controll();
                }
                else {

                    let source = document.querySelector(`#${form_name}-template`).innerHTML;
                    let destination = document.querySelector('.page-container');
                    destination.innerHTML = source;
                    data = document.querySelector('.page-container').innerHTML;
                    history.pushState(data, new_path, new_path);
                    form_controll();

                };
            };

        };

    });
};

function form_controll() {
    const url = window.location.href;
    const form_name = url.split('http://127.0.0.1:5000/').pop();
    console.log('The name of the form is');
    console.log(form_name)
    submit_button = document.querySelector('.form_submit');
    form = document.querySelector('form');
    form.onsubmit = (event) => {
        console.log("this is means the ajax is about to come");
        event.preventDefault()
        const request = new XMLHttpRequest();
        console.log(`The form name should be r ${form_name}`);
        if (form_name == 'register') {
            request.open('post', '/register');
            request.onload = () => {
                data = JSON.parse(request.responseText);
                console.log('The ajax call has been recieved')
                if (data.success) {
                    console.log('the ajax call has been successful');
                }
                else {
                    console.log("The ajax call didn't succeed");
                }
            }
            let submit_data = new FormData();
            let username = document.querySelector('.register_username').value;
            let password = document.querySelector('.register_password').value;
            let password_confirm = document.querySelector('.register_password_confirm').value;
            let email = document.querySelector('.register_email').value;
            submit_data.append('username', username);
            submit_data.append('password', password);
            submit_data.append('password_confirm', password_confirm);
            submit_data.append('email', email);
            request.send(submit_data);

        }
    }
    /*submit_button.onclick = (event) => {
        event.preventDefault();
        console.log('This is the ajax call');
    }
    */
}

// for the history api. Getting the back button to work
window.onpopstate = (event) => {
    console.log('The window pop state has been fired');
    page = document.querySelector('.page-container');
    console.log('The event state data');
    console.log(event.state);
    page.innerHTML = event.state;
}
/*
let url = window.location.href;
    if (url === 'http://127.0.0.1:5000/') {
        let source = document.querySelector('#homepage-template').innerHTML;
        // get the destination for the handlebars html
        let destination = document.querySelector('.page-container');
        // push the html into the div
        destination.innerHTML = source;
        history.replaceState(document.querySelector('.page-container').innerHTML, document.title, document.location.href);
        // get the activae class to work for the navbar
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');

        });

        load_form_logic();

    }
    else {
        let partial_url = url.split('http://127.0.0.1:5000/').pop();
        console.log(partial_url);
        let source = document.querySelector(`#${partial_url}-template`).innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');

        });

        load_form_logic();

    }

});
*/