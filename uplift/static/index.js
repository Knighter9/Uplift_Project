document.addEventListener("DOMContentLoaded", () => {
    load_first_page();
    linking_logic();
    load_page();

});










function load_first_page() {
    let url = window.location.href;
    console.log(`The url right now is ${url}`)
    console.log(url.includes('logout'));
    if (url.includes('logout')) {
        let new_url = 'http://127.0.0.1:5000/'
        let source = document.querySelector('#homepage-template').innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        history.replaceState(document.querySelectorAll('.page-container').innerHTML, '', new_url);
    }
    else if (url === 'http://127.0.0.1:5000/') {
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
        form_controll();
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
                    if (`${form_name}-template` == 'home-template') {
                        if (localStorage.getItem('login') != true) {
                            console.log("You can't access this link yet you need to login first");
                            let source = document.querySelector('#login-template');
                            let destination = document.querySelector('.page-conatiner')
                            destination.innerHTML = source;
                            history.pushState(destination.innerHTML, 'login', 'login');
                            form_controll()
                        }
                        else if (localStorage.getItem('login') == true) {
                            let source = document.querySelector('#home-template');
                            let destination = document.querySelector('.page-container');
                            destination.innerHTML = source;
                            history.pushState(destination.innerHTML, 'home', 'home');
                            form_controll()
                        }
                    }
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
    form = document.querySelector('.form');
    console.log(form);
    if (form != null) {
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
                        console.log(`Welcom to the site ${data.username}`);
                    }
                    else {
                        console.log('There are errors the server has sent back')
                        console.log(data)
                        data = Object.entries(data);
                        console.log(data);
                        for (let i = 0; i < data.length; i++) {
                            console.log(data[i])
                            if (data[i][0].includes('password')) {
                                console.log('there is a password error');
                                let destination = document.querySelectorAll('.password-errors');
                                for (j = 0; j < destination.length; j++) {
                                    let span = document.createElement('span');
                                    span.classList.toggle('error-message');
                                    span.innerHTML = data[i][1]
                                    destination[j].classList.toggle('register-errors-active');
                                    destination[j].append(span);
                                };
                            }
                            else if (data[i][0].includes('username')) {
                                console.log('there was a username error')
                                let destination = document.querySelector('.username-errors');
                                destination.classList.toggle('register-errors-active');
                                let span = document.createElement('span');
                                span.classList.add('error-message');
                                span.innerHTML = data[i][1];
                                destination.append(span);
                            }
                            else if (data[i][0].includes('email')) {
                                console.log('There must have been a email error');
                                let destination = document.querySelector('.email-errors');
                                destination.classList.toggle('register-errors-active');
                                let span = document.createElement('span');
                                span.innerHTML = data[i][1];
                                destination.append(span);
                            }
                        }
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
            else if (form_name == 'login') {
                const request = new XMLHttpRequest();

                request.open('post', '/login');

                request.onload = () => {
                    data = JSON.parse(request.responseText);
                    if (data.success) {
                        localStorage.setItem('login', true);
                        let source = document.querySelector('#home-template').innerHTML;
                        let destination = document.querySelector('.page-container');
                        destination.innerHTML = source;
                        history.pushState(destination.innerHTML, 'home', 'home');

                    }
                    else {
                        console.log('The were some errors')
                    }
                }
                const submit_data = new FormData();
                username = document.querySelector('.login-username').value;
                password = document.querySelector('.login-password').value;
                submit_data.append('username', username);
                submit_data.append('password', password);
                request.send(submit_data);

            }

            else if (form_name == 'logout') {
                const request = new XMLHttpRequest();
                request.open('post', "/logout");
                console.log('The request is about ')
                let submit_data = new FormData();
                submit_data.append('logout', 'I want to logout');
                request.send(submit_data);
            }

            else if (form_name == 'home') {
                if (localStorage.getItem('login') != true) {
                    console.log('You must login first')
                    let source = document.querySelector('#login-template').innerHTML;
                    let destination = document.querySelectorAll('.page-container');
                    destination.innerHTML = source;
                    history.pushState(destination.innerHTML, 'login', 'login');


                }
                else if (localStorage.getItem('login') == true) {
                    let source = document.querySelector('#home-template').innerHTML;
                    let destination = document.querySelector('.page-container');
                    destination.innerHTML = source;
                    console.log('welcome to the home page route');
                    history.pushState(destination.innerHTML, 'home', 'home');

                }
            }

        }
    }
}
function load_page() {
    let url = window.location.href;
    if (url == 'http://127.0.0.1:5000/login?next=%2Fhome') {
        console.log('This is is going to send you to the login route');
        let source = document.querySeleter('#login-template');
        let destination = doucment.querySelector('.page-container');
        destination.innerHTML = source;
        history.pushState(destination.innerHTML, 'login', 'login');
    }
}

// for the history api. Getting the back button to work
window.onpopstate = (event) => {
    console.log('The window pop state has been fired');
    page = document.querySelector('.page-container');
    console.log('The event state data');
    console.log(event.state);
    page.innerHTML = event.state;
}