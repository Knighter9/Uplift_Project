document.addEventListener("DOMContentLoaded", () => {
    load_first_page();
    linking_logic();


});



function load_first_page() {
    let url = window.location.href;
    console.log(`The url right now is ${url}`)
    if (url.includes('logout')) {
        //load_nav('home');
        load_template_func('logout-template');
        let destination = document.querySelector('.page-container');
        history.replaceState(destination.innerHTML, 'logout', 'logout');

        /*
        let new_url = 'http://127.0.0.1:5000/'
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
        let source = document.querySelector('#homepage-template').innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        history.replaceState(document.querySelector('.page-container').innerHTML, 'logout', 'logout');
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });
        */

    }
    else if (url === 'http://127.0.0.1:5000/') {
        load_template_func('homepage-template', nav_name = 'home');
        let destination = document.querySelector('.page-container');
        history.replaceState(destination.innerHTML, '', '')

        /*
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
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
        */

    }
    else if (url == "http://127.0.0.1:5000/login?next=%2Fexplore") {
        load_template_func('login-template', nav_name = 'home', force_login = true);
        let destination = document.querySelector('.page-container');
        history.replaceState(destination.innerHTML, 'login', 'login');
        form_controll('explore');

        /*
        // redirect the user to the login form
        // set the nav
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;

        // grab the login form
        let source = document.querySelector('#login-template').innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        history.replaceState(destination.innerHTML, 'login', 'login');
        form_controll('explore');
        */
    }

    else if (url == "http://127.0.0.1:5000/login?next=%2Fexplore%2Fcreate-new-channel") {
        load_template_func('login-template', nav_name = 'home', force_login = true);
        let destination = document.querySelector('.page-container');
        history.replaceState(destination.innerHTML, 'login', 'login');
        form_controll('create-new-channel');
        /*console.log('The user wants to create a new channel');
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;

        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });

        // load the template
        let source = document.querySelector('#login-template').innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;

        history.replaceState(destination.innerHTML, 'login', 'login');

        form_controll('create-new-channel');
        */



    }
    else if (url.includes('http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F')) {
        //redirect the user to the login route

        let data_string = url.split('http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F').pop();

        let data_list = data_string.split('%2Fposts');
        let unclean_post_title = data_list[1];
        console.log(unclean_post_title);
        let channel_name = data_list[0];
        console.log(channel_name)

        if (unclean_post_title != null && unclean_post_title != '%2Fposts' && unclean_post_title != "") {
            console.log('the individual post has been selected');
            // get the post title
            let post_title = unclean_post_title.split('%2F').pop();
            // cleanse the post title
            let cleansed_post_title = post_title.replace(/%2525/g, " ");

            load_template_func('login-template', nav_name = 'home', force_login = true);
            let destination = document.querySelector('.page-container');
            history.replaceState(destination.innerHTML, 'login', 'login');

            /*let source = document.querySelector('#login-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            history.replaceState(destination.innerHTML, 'login', 'login');
            console.log(channel_name)
            console.log(cleansed_post_title);
            */
            // call the form_controll
            form_controll(redirect = 'individual-post', channel_name = channel_name, posts = null, individual_post_title = cleansed_post_title);
        }

        else if (url == `http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F${channel_name}%2Fposts`) {
            console.log('The user is trying to access the posts for a channel without being logged in');
            //set the navbar
            /*let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            // display the login form
            let source = document.querySelector('#login-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            history.replaceState(destination.innerHTML, 'login', 'login');
            */
            load_template_func('login-template', nav_name = 'home', force_login = true);
            let destination = document.querySelector('.page-container');
            history.replaceState(destination.innerHTML, 'login', 'login');
            form_controll('explore-channel', channel_name, 'load');
        }
        else {
            let channel_name = url.split('http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F').pop();
            //set the navbar
            /*let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            // display the login form
            let source = document.querySelector('#login-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            */
            load_template_func(template_name = 'login-template', nav_name = 'home', force_login = true);
            let destination = document.querySelector('.page-container');
            history.replaceState(destination.innerHTML, 'login', 'login');
            form_controll('explore-channel', channel_name);
        }

    }
    else if (url.includes('http://127.0.0.1:5000/explore/channel/')) {
        // check to see if the route contains post
        let channel_name = url.split('http://127.0.0.1:5000/explore/channel/').pop();
        alter_channel_name = channel_name.split('/create-new-post');
        alter_channel_name = alter_channel_name[0];
        channel_name = channel_name.split('/post');
        channel_name = channel_name[0];
        console.log(channel_name);
        if (url == `http://127.0.0.1:5000/explore/channel/${channel_name}/posts`) {
            console.log('The user wants to access the the posts of a channel');
            /*let nav_source = document.querySelector('#explore-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            let mainNav = document.getElementById('js-menu');
            let navBarToggle = document.getElementById('js-navbar-toggle');
            // creating the active class on the navbar
            navBarToggle.addEventListener('click', function (event) {
                mainNav.classList.toggle('active');
            });
            */
            load_nav('explore');
            channel_load_posts(channel_name);

        } else if (url == `http://127.0.0.1:5000/explore/channel/${alter_channel_name}/create-new-post`) {
            console.log('i am loading the create new post')
            load_nav('explore');
            //let source = document.querySelector('#create-post-template').innerHTML;
            //let destination = document.querySelector('.page-container');

            //destination.innerHTML = source;
            // load the create post template
            load_create_post(channel_name = alter_channel_name, first_load = true);
            // call form controll
            console.log('I am about to print the name of the channel and I am doing this now');
            console.log(alter_channel_name);
            //form_controll(redirect = null, channel_name = alter_channel_name);


        }
        else if (url.includes(`http://127.0.0.1:5000/explore/channel/${channel_name}/posts/`)) {
            console.log('The user wants to see and individual post');
            let post_title = url.split(`http://127.0.0.1:5000/explore/channel/${channel_name}/posts/`).pop();
            console.log(post_title);
            post_title = post_title.replace(/%20/g, " ");
            console.log(post_title);
            load_individual_post(channel_name = channel_name, first_load = true, post_title = post_title);

        }
        else {
            console.log('This should print out in the console');
            channel_name = url.split('http://127.0.0.1:5000/explore/channel/').pop();
            console.log(url.includes(`http://127.0.0.1:5000/explore/channel/${channel_name}/create-new-post`));
            console.log(url == `http://127.0.0.1:5000/explore/channel/${channel_name}/create-new-post`);
            console.log(url);
            console.log(`http://127.0.0.1:5000/explore/channel/${channel_name}/create-new-post`);
            load_channel(channel_name);
        }
    }
    else if (url == "http://127.0.0.1:5000/explore") {
        if (localStorage.getItem('login') == 'true') {
            explore_load(first_load = true);
            form_controll('explore');
        }
    }
    else if (url == "http://127.0.0.1:5000/explore/create-new-channel") {
        console.log('this is the way');
        load_template_func('create-channel-template', 'explore');
        let destination = document.querySelector('.page-container');
        console.log('I am about to replace the state');
        history.replaceState(destination.innerHTML, 'explore/create-new-channel', '/explore/create-new-channel');
        form_controll();
    }
    else {
        console.log('The else portion has this');
        let partial_url = url.split('http://127.0.0.1:5000/').pop();
        console.log(partial_url);

        load_template_func(`${partial_url}-template`, 'home');
        /*let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
        let source = document.querySelector(`#${partial_url}-template`).innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');

        });
        */
        form_controll('explore');

    }
}

// loading the forms
function linking_logic() {
    console.log('The linking function has been called');
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
                    form_controll('explore');
                }
                else {
                    if (`${form_name}-template` == 'explore-template') {
                        if (localStorage.getItem('login') != 'true') {
                            console.log("You can't access this link yet you need to login first");
                            let source = document.querySelector('#login-template').innerHTML;
                            let destination = document.querySelector('.page-container');
                            destination.innerHTML = source;
                            history.pushState(destination.innerHTML, 'login', 'login');
                            form_controll(redirect = 'explore');
                        }
                        else if (localStorage.getItem('login') == 'true') {
                            console.log('You will have access to this page');
                            explore_load();
                            form_controll('explore');
                        }
                    }
                    else if (form_name.includes('explore/channel/')) {
                        //let request = new XMLHttpRequest();
                        let channel_name = form_name.split('explore/channel/').pop();
                        console.log('THe channel_name is ');
                        console.log(channel_name);
                        load_channel(channel_name);
                    } else {
                        let source = document.querySelector(`#${form_name}-template`).innerHTML;
                        let destination = document.querySelector('.page-container');
                        destination.innerHTML = source;
                        data = document.querySelector('.page-container').innerHTML;
                        history.pushState(data, new_path, new_path);
                        form_controll('explore');
                    }

                };
            };

        };

    });
};

function form_controll(redirect = null, channel_name = null, posts = null, individual_post_title = null) {
    console.log('The form function has been called');
    console.log('The channel_name entered is');
    console.log(channel_name);
    const url = window.location.href;
    const form_name = url.split('http://127.0.0.1:5000/').pop();
    console.log('The name of the form is');
    console.log(form_name)
    submit_button = document.querySelector('.form_submit');
    form = document.querySelector('.form');
    console.log(form);
    if (form != null) {
        console.log('There is a form on the page');
        form.onsubmit = (event) => {
            console.log("this is means the ajax is about to come");
            event.preventDefault()
            const request = new XMLHttpRequest();
            console.log(`The form name should be r ${form_name}`);
            console.log("I don't know why the controll flow is not working");
            if (form_name == 'register') {
                request.open('post', '/register');
                request.onload = () => {
                    data = JSON.parse(request.responseText);
                    console.log('The ajax call has been recieved')
                    if (data.success) {
                        console.log('the ajax call has been successful');
                        console.log(`Welcom to the site ${data.username}`);
                        localStorage.setItem('login', true);
                        explore_load();
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
                console.log('an ajax call to th login function is being sent');
                request.open('post', '/login');

                request.onload = () => {
                    data = JSON.parse(request.responseText);
                    if (data.success) {
                        localStorage.setItem('login', true);
                        console.log('The server has sent back data from the login function');
                        if (redirect != null) {
                            if (redirect == 'explore') {
                                // call the explore load function
                                explore_load();
                                //let source = document.querySelector('#explore-template').innerHTML;
                                //let destination = document.querySelector('.page-container');
                                //destination.innerHTML = source;nav
                                //history.pushState(destination.innerHTML, 'explore', 'explore');
                            }
                            else if (redirect == 'explore-channel') {
                                console.log('The user wants to access a channel');
                                if (channel_name != null && posts == 'load') {
                                    console.log('we are going to load the channel and its posts');
                                    let nav_source = document.querySelector('#explore-nav-template').innerHTML;
                                    let nav_destination = document.querySelector('nav');
                                    nav_destination.innerHTML = nav_source;
                                    let mainNav = document.getElementById('js-menu');
                                    let navBarToggle = document.getElementById('js-navbar-toggle');
                                    // creating the active class on the navbar
                                    navBarToggle.addEventListener('click', function (event) {
                                        mainNav.classList.toggle('active');
                                    });

                                    channel_load_posts(channel_name);
                                }
                                else if (channel_name != null) {
                                    load_channel(channel_name);
                                }

                            }
                            else if (redirect == 'individual-post' && individual_post_title != null) {
                                console.log("The user want's an individual");
                                // call the load individidual_post
                                load_indvidual_post(channel_name, first_load = true, post_title = individual_post_title);
                            }
                            else if (redirect == 'create-new-channel') {
                                console.log('loading the create new channel');
                                load_template('create-channel-template');
                                let destination = document.querySelector('.page-container');
                                history.pushState(destination.innerHTML, 'explore/create-new-channel', 'explore/create-new-channel');

                            }
                            else {
                                console.log("I couldn't get teh create_new_post to run");
                            }

                        }


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
            else if (url == `http://127.0.0.1:5000/explore/channel/${channel_name}/create-new-post`) {
                console.log('The create_new post flow logic has accepted the function');
                create_new_post(channel_name);

            }
            else if (form_name == 'logout') {
                const request = new XMLHttpRequest();
                request.open('post', "/logout");
                console.log('a post request has been opened for /logout');
                let submit_data = new FormData();
                submit_data.append('logout', 'I want to logout');
                localStorage.setItem('login', false);
                console.log('the url should change');
                history.pushState(null, '', 'http://127.0.0.1:5000');
                request.send(submit_data);
                console.log('The post request for logout has been fully sent');
                location.reload();

            }

            else if (form_name == 'explore') {
                if (localStorage.getItem('login') != 'true') {
                    console.log('You must login first')
                    let source = document.querySelector('#login-template').innerHTML;
                    let destination = document.querySelectorAll('.page-container');
                    destination.innerHTML = source;
                    history.pushState(destination.innerHTML, 'login', 'login');


                }
                else if (localStorage.getItem('login') == 'true') {
                    let source = document.querySelector('#home-template').innerHTML;
                    let destination = document.querySelector('.page-container');
                    destination.innerHTML = source;
                    console.log('welcome to the home page route');
                    history.pushState(destination.innerHTML, 'explore', 'explore');

                }
            }
            else if (form_name == 'explore/create-new-channel') {
                console.log('The user has submited the create new chnanel form');
                // create a new ajax call
                const request = new XMLHttpRequest();

                request.open('post', '/explore/create-new-channel');

                request.onload = () => {
                    console.log('The server has sent back data');
                    let data = JSON.parse(request.responseText);

                    if (data.success) {
                        console.log('the ajax call was a success');
                        console.log('we are the salt of the eart the light of the world');
                        let message = document.querySelector('#create-new-channel');
                        message.innerHTML = 'Congrats the channel has been created';

                    }
                    else {
                        console.log('There were some erros');

                    }
                }
                let channel_name = document.querySelector('#channel_name').value;
                let channel_description = document.querySelector('#channel_description').value;
                let send_data = new FormData();
                console.log(channel_name)
                console.log(channel_description)
                send_data.append('channel_name', channel_name);
                send_data.append('channel_description', channel_description);
                request.send(send_data);
            }

        }
    }
}

function create_new_post(channel_name) {
    console.log('the create new post function has been called');

    // select the upload submit button to submit the file
    console.log('The create_new_post function has effectivly been called');
    let form = document.querySelector('.form');
    if (form.classList.contains('video')) {
        // get the title of the post
        let title = document.querySelector('#title').value;
        // get the file
        let file = document.querySelector('#file_upload').files;
        file = file[0];
        console.log(typeof (file));
        // create a new ajax call
        const request = new XMLHttpRequest();

        request.open('post', `/explore/channel/${channel_name}/create-new-post`);

        request.onload = () => {
            console.log('The ajax call has been recieved');

            let data = JSON.parse(request.responseText);

            if (data.success) {
                console.log("The server says the ajax call was succesfull");
                // select the post container



            }
            else {
                console.log('There were some errors');
            }
        }

        let submit_data = new FormData();
        submit_data.append('file', file);
        submit_data.append('title', title);
        submit_data.append('type', 'video');
        request.send(submit_data);
    }
    else if (form.classList.contains('text')) {
        let title = document.querySelector('.title').value;
        console.log(title);
        let post_content = document.querySelector('#post-content-input').value;

        const request = new XMLHttpRequest();

        request.open('post', `/explore/channel/${channel_name}/create-new-post`);

        request.onload = () => {
            console.log('The ajax call has been recieved');

            let data = JSON.parse(request.responseText);

            if (data.success) {
                console.log("The server says the ajax call was succesfull");

            }
            else {
                console.log('There were some errors');
            }
        }
        let submit_data = new FormData()
        submit_data.append('post_content', post_content);
        submit_data.append('title', title);
        submit_data.append('type', 'text');
        request.send(submit_data);
    }
}

function load_channel(channel_name) {
    load_nav('explore');
    let request = new XMLHttpRequest();
    request.open('post', `/explore/channel/${channel_name}`);
    request.onload = () => {
        console.log('The channel info ajax call has been sent');
        let data = JSON.parse(request.responseText);

        if (data.success) {
            console.log('The channel exists');
            let channel = data.channel_name;
            console.log(channel);
            let about = data.about;
            console.log(about);
            let num_users = data.num_users;
            console.log(num_users);
            //grab the source
            let source = document.querySelector('#explore-channel-template').innerHTML;
            // compile the source

            let template = Handlebars.compile(source);

            let context = {
                channel_name: channel,
                about: about,
                num_users: num_users,
            }

            let html = template(context);

            let destination = document.querySelector('.page-container');

            destination.innerHTML = html;

            if (data.joined) {
                let btn = document.querySelector('.channel-info-btn');
                btn.classList.toggle('joined');
                btn.innerHTML = "Leave";
            }
            else {
                let btn = document.querySelector('.channel-info-btn');
                btn.classList.toggle('not-joined');
                btn.innerHTML = "Join"
            }

            history.pushState(destination.innerHTML, `/explore/channel/${channel_name}`, `/explore/channel/${channel_name}`)
            channel_load_posts(channel_name, true);
        }
        else {
            console.log('There were some errors');
            console.log('This is rurnning from the load-channel route');
            console.log("The channel doesn't exist");
            let source = document.querySelector('#explore-channel-error-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            console.log('It is finished');
            history.pushState(destination.innerHTML, `explore/channel${channel_name}`, `/explore/channel/${channel_name}`);

        }
    }

    let submit_data = new FormData();
    submit_data.append('channel_name', channel_name);
    request.send(submit_data);
}


function explore_load(first_load = null) {
    console.log('The explore function is running');
    console.log('This is loading the first page');
    load_template_func('explore-template', 'explore');
    let destination = document.querySelector('.page-container')
    // make the ajax call
    const request = new XMLHttpRequest();
    request.open('post', '/explore');
    request.onload = () => {
        console.log('This is should be running');
        console.log(request.responseText);

        let data = JSON.parse(request.responseText);
        console.log('The explore ajax call is running')
        if (data.success) {
            console.log('we are getting the channels');
            let channels = data.channels;
            let channel_list = document.querySelector('.channel-list');

            let length = channels.length;
            for (let i = 0; i < length; i++) {
                let li = document.createElement('li');
                li.classList.add('channel_element');
                let a = document.createElement('a');
                a.href = `/explore/channel/${channels[i]}`
                //li.append(channels[i]);
                a.append(channels[i]);
                console.log(li);
                console.log(channel_list);
                li.append(a);
                channel_list.append(li);
            }
            if (first_load != null) {
                console.log('This is the first load');
                history.replaceState(destination.innerHTML, 'explore', '/explore');
            }
            else {
                history.pushState(destination.innerHTML, 'explore', '/explore');
            }
        }
        else {
            console.log('The server was unable to find the channels');
        }
    }
    let submit_data = new FormData();
    submit_data.append('i want data', 'give me data');
    request.send(submit_data);

}

function channel_load_posts(channel_name, load_from_channel_page = null) {

    console.log('The channel load posts function is running');
    console.log('About to select the user profile pic');
    let user_profile = document.querySelector('.user-profile-pic');
    console.log(user_profile);
    user_profile.onclick = () => {
        console.log('The user profile has been clickedd');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = "250px";
    }

    let close_btn = document.querySelector('.closebtn');
    close_btn.onclick = () => {
        console.log('The close button has been clicked');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = '0px';
    }

    if (load_from_channel_page != null) {
        //select the channel title and load posts if user click on it
        let channel_title = document.querySelector('.channel_name');
        //when the user clicks on the title of the channel
        channel_title.onclick = () => {
            // run the post ajax call
            // create the ajax post
            const request = new XMLHttpRequest();
            request.open('post', `/explore/channel/${channel_name}/posts`);

            request.onload = () => {
                console.log('The response has been received');
                let data = JSON.parse(request.responseText);

                if (data.success) {
                    console.log('The ajax call for the posts has been successful');
                    // select the source handlebars template
                    let source = document.querySelector('#explore-channel-posts-template').innerHTML;
                    let destination = document.querySelector('.page-container');
                    destination.innerHTML = source;

                    let all_posts_container = document.querySelector('.channel-post-container');
                    // get access to the posts
                    let posts_list = data.posts;
                    let length = posts_list.length;
                    for (let i = 0; i < length; i++) {

                        post_type = posts_list[i]['type'];

                        if (post_type == 'text') {
                            post_container = document.createElement('div');
                            post_container.classList.toggle('post-container');
                            // get the data from the ajax call
                            let username = posts_list[i]['username'];
                            let title = posts_list[i]['title'];
                            let post_content = posts_list[i]['post_content'];
                            let num_likes = posts_list[i]['num_likes'];
                            let num_comments = posts_list[i]['num_comments'];
                            let liked_disliked = posts_list[i]['liked_disliked'];
                            if (num_comments != null) {
                                console.log(num_comments);
                            }
                            else if (num_comments == null) {
                                num_comments = 0;
                                console.log(num_comments);
                            }

                            // create the username span tag
                            let username_container = document.createElement('span');
                            username_container.classList.toggle('creater');
                            username_container.innerHTML = username;

                            // create the title h3 tag
                            let title_container = document.createElement('h3');
                            title_container.classList.toggle('title');
                            title_container.innerHTML = title;

                            // create the num likes p tag
                            let post_content_container = document.createElement('p');
                            post_content_container.classList.toggle('post-content');
                            post_content_container.innerHTML = post_content;

                            // create the num likes span
                            let num_likes_container = document.createElement('span');
                            num_likes_container.classList.toggle('num_likes');
                            num_likes_container.innerHTML = `Likes ${num_likes}`;

                            //create the num comments span
                            let num_comments_container = document.createElement('span');
                            num_comments_container.classList.toggle('num_comments');
                            num_comments_container.innerHTML = `Comments ${num_comments}`;

                            //create the likes and dislikes for the post
                            let liking_disliking_container = document.createElement('div');
                            liking_disliking_container.classList.toggle('likes-container');

                            let like = document.createElement('span');
                            like.innerHTML = 'like';
                            like.classList.toggle('like');
                            if (liked_disliked == 'liked') {
                                console.log('The user has liked this post');
                                like.classList.toggle('liked')
                            }


                            let dislike = document.createElement('span');
                            dislike.innerHTML = 'dislike';
                            dislike.classList.toggle('dislike');
                            if (liked_disliked == 'disliked') {
                                dislike.classList.toggle('disliked');
                            }

                            liking_disliking_container.append(like);
                            liking_disliking_container.append(dislike);


                            // append the data containers to the post container;
                            post_container.append(title_container);
                            post_container.append(post_content_container);
                            post_container.append(num_likes_container);
                            post_container.append(username_container);
                            post_container.append(num_comments_container);
                            post_container.append(liking_disliking_container);

                            all_posts_container.append(post_container);

                        }
                        else if (post_type == 'video') {
                            post_container = document.createElement('div');
                            post_container.classList.toggle('post-container');
                            // get the data from the ajax call
                            let username = posts_list[i]['username'];
                            let title = posts_list[i]['title'];
                            let video_file = posts_list[i]['video_file'];
                            console.log(video_file);
                            console.log(typeof (video_file));
                            let num_likes = posts_list[i]['num_likes'];
                            let num_comments = posts_list[i]['num_comments'];
                            let liked_disliked = posts_list[i]['liked_disliked'];
                            if (num_comments != null) {
                                console.log(num_comments);
                            }
                            else if (num_comments == null) {
                                num_comments = 0;
                                console.log(num_comments);
                            }

                            // create the username span tag
                            let username_container = document.createElement('span');
                            username_container.classList.toggle('creater');
                            username_container.innerHTML = username;

                            // create the title h3 tag
                            let title_container = document.createElement('h3');
                            title_container.classList.toggle('title');
                            title_container.innerHTML = title;

                            let full_video_container = document.createElement('video-container');
                            full_video_container.classList.add('video-container');

                            // create the video html tag
                            let video_container = document.createElement('video');
                            video_container.classList.toggle('video');
                            video_container.controls = true;
                            let source = document.createElement('source');
                            source.src = `../../../static/videos/posts/${video_file}`;
                            source.type = "video/mp4";
                            video_container.append(source);

                            full_video_container.append(video_container);

                            // create the num likes span
                            let num_likes_container = document.createElement('span');
                            num_likes_container.classList.toggle('num_likes');
                            num_likes_container.innerHTML = `Likes ${num_likes}`;

                            //create the num comments span
                            let num_comments_container = document.createElement('span');
                            num_comments_container.classList.toggle('num_comments');
                            num_comments_container.innerHTML = `Comments ${num_comments}`;

                            //create the liking disliking container
                            let liking_disliking_container = document.createElement('div');
                            liking_disliking_container.classList.toggle('likes-container');

                            let like = document.createElement('span');
                            like.innerHTML = 'like';
                            like.classList.toggle('like');
                            if (liked_disliked == 'liked') {
                                like.classList.toggle('liked');
                            }

                            let dislike = document.createElement('span');
                            dislike.innerHTML = 'dislike';
                            dislike.classList.toggle('dislike');
                            if (liked_disliked == 'disliked') {
                                dislike.classList.toggle('disliked');
                            }

                            liking_disliking_container.append(like);
                            liking_disliking_container.append(dislike);

                            // append the data containers to the post container;
                            post_container.append(title_container);
                            post_container.append(full_video_container);
                            post_container.append(num_likes_container);
                            post_container.append(username_container);
                            post_container.append(num_comments_container);
                            post_container.append(liking_disliking_container);

                            all_posts_container.append(post_container);

                        }
                        // create the post container
                        /*
                        post_container = document.createElement('div');
                        post_container.classList.toggle('post-container');
                        // get the data from the ajax call
                        let username = posts_list[i]['username'];
                        let title = posts_list[i]['title'];
                        let post_content = posts_list[i]['post_content'];
                        let video_file = posts_list[i]['video_file'];
                        let num_likes = posts_list[i]['num_likes'];
                        let num_comments = posts_list[i]['num_comments'];
                        if (num_comments != null) {
                            console.log(num_comments);
                        }
                        else if (num_comments == null) {
                            num_comments = 0;
                            console.log(num_comments);
                        }

                        // create the username span tag
                        let username_container = document.createElement('span');
                        username_container.classList.toggle('creater');
                        username_container.innerHTML = username;

                        // create the title h3 tag
                        let title_container = document.createElement('h3');
                        title_container.classList.toggle('title');
                        title_container.innerHTML = title;

                        // create the num likes p tag
                        if (post_content != null) {
                            let post_content_container = document.createElement('p');
                            post_content_container.classList.toggle('post-content');
                            post_content_container.innerHTML = post_content;
                        }

                        if (video_file != null) {
                            let video_container = document.createElement('video');
                            video_container.classList.toggle('video');
                            let source = document.createElement('souce');
                            source.src = video_file;
                            source.type = "video/mp4";
                            video_container.append(source);
                        }

                        // create the num likes span
                        let num_likes_container = document.createElement('span');
                        num_likes_container.classList.toggle('num_likes');
                        num_likes_container.innerHTML = `Likes ${num_likes}`;

                        //create the num comments span
                        let num_comments_container = document.createElement('span');
                        num_comments_container.classList.toggle('num_comments');
                        num_comments_container.innerHTML = `Comments ${num_comments}`

                        // append the data containers to the post container;
                        post_container.append(title_container);
                        if (post_content_container) {
                            post_container.append(post_content_container);
                        }
                        if (video_container) {
                            post_container.append(video_container);
                        }
                        post_container.append(num_likes_container);
                        post_container.append(username_container);
                        post_container.append(num_comments_container);

                        all_posts_container.append(post_container);
                        */
                    }
                    // set the source template to be displayed in the main page container
                    // push a new state to the history api
                    console.log(channel_name);
                    history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts`, `/explore/channel/${channel_name}/posts`);
                    like_dislike();
                    console.log('calling the load indivdiaul post func');
                    load_individual_post(channel_name);
                }
                else {
                    console.log('There were some errors retrieving the posts');
                }
            }
            request.send();
        }
    }
    else {
        const request = new XMLHttpRequest();
        request.open('post', `/explore/channel/${channel_name}/posts`);

        request.onload = () => {
            console.log('The response has been received');
            let data = JSON.parse(request.responseText);

            if (data.success) {
                console.log('The ajax call for the posts has been successful');
                // select the source handlebars template
                let source = document.querySelector('#explore-channel-posts-template').innerHTML;
                let destination = document.querySelector('.page-container');
                destination.innerHTML = source;

                let all_posts_container = document.querySelector('.channel-post-container');
                // get access to the posts
                let posts_list = data.posts;
                let length = posts_list.length;
                for (let i = 0; i < length; i++) {
                    post_type = posts_list[i]['type'];

                    if (post_type == 'text') {
                        post_container = document.createElement('div');
                        post_container.classList.toggle('post-container');
                        // get the data from the ajax call
                        let username = posts_list[i]['username'];
                        let title = posts_list[i]['title'];
                        let post_content = posts_list[i]['post_content'];
                        let num_likes = posts_list[i]['num_likes'];
                        let num_comments = posts_list[i]['num_comments'];
                        let liked_disliked = posts_list[i]['liked_disliked'];
                        if (num_comments != null) {
                            console.log(num_comments);
                        }
                        else if (num_comments == null) {
                            num_comments = 0;
                            console.log(num_comments);
                        }

                        // create the username span tag
                        let username_container = document.createElement('span');
                        username_container.classList.toggle('creater');
                        username_container.innerHTML = username;

                        // create the title h3 tag
                        let title_container = document.createElement('h3');
                        title_container.classList.toggle('title');
                        title_container.innerHTML = title;

                        // create the num likes p tag
                        let post_content_container = document.createElement('p');
                        post_content_container.classList.toggle('post-content');
                        post_content_container.innerHTML = post_content;

                        // create the num likes span
                        let num_likes_container = document.createElement('span');
                        num_likes_container.classList.toggle('num_likes');
                        num_likes_container.innerHTML = `Likes ${num_likes}`;

                        //create the num comments span
                        let num_comments_container = document.createElement('span');
                        num_comments_container.classList.toggle('num_comments');
                        num_comments_container.innerHTML = `Comments ${num_comments}`;

                        // create the liking disliking container
                        let liking_disliking_container = document.createElement('div');
                        liking_disliking_container.classList.toggle('likes-container');

                        let like = document.createElement('span');
                        like.innerHTML = 'like';
                        like.classList.toggle('like');
                        if (liked_disliked == 'liked') {
                            like.classList.toggle('liked')
                        }

                        let dislike = document.createElement('span');
                        dislike.innerHTML = 'dislike';
                        dislike.classList.toggle('dislike');
                        if (liked_disliked == 'disliked') {
                            dislike.classList.toggle('disliked');
                        }

                        liking_disliking_container.append(like);
                        liking_disliking_container.append(dislike);

                        // append the data containers to the post container;
                        post_container.append(title_container);
                        post_container.append(post_content_container);
                        post_container.append(num_likes_container);
                        post_container.append(username_container);
                        post_container.append(num_comments_container);
                        post_container.append(liking_disliking_container);

                        all_posts_container.append(post_container);

                    }
                    else if (post_type == 'video') {
                        console.log('createing a video tag');
                        post_container = document.createElement('div');
                        post_container.classList.toggle('post-container');
                        // get the data from the ajax call
                        let username = posts_list[i]['username'];
                        let title = posts_list[i]['title'];
                        let video_file = posts_list[i]['video_file'];
                        let pizza = 'stsfdsa';
                        console.log(typeof (pizza));
                        console.log(video_file);
                        console.log(typeof (vidoe_file));
                        let num_likes = posts_list[i]['num_likes'];
                        let num_comments = posts_list[i]['num_comments'];
                        let liked_disliked = posts_list[i]['liked_disliked'];
                        if (num_comments != null) {
                            console.log(num_comments);
                        }
                        else if (num_comments == null) {
                            num_comments = 0;
                            console.log(num_comments);
                        }

                        // create the username span tag
                        let username_container = document.createElement('span');
                        username_container.classList.toggle('creater');
                        username_container.innerHTML = username;

                        // create the title h3 tag
                        let title_container = document.createElement('h3');
                        title_container.classList.toggle('title');
                        title_container.innerHTML = title;

                        // create the div to hold the video
                        let full_video_container = document.createElement('video-container');
                        full_video_container.classList.add('video-container');
                        // create the video html tag
                        let video_container = document.createElement('video');
                        video_container.classList.toggle('video');
                        video_container.controls = true;
                        let source = document.createElement('source');
                        source.src = `../../../static/videos/posts/${video_file}`;
                        source.type = "video/mp4";
                        video_container.append(source);

                        //append the video to the container

                        full_video_container.append(video_container);

                        // create the num likes span
                        let num_likes_container = document.createElement('span');
                        num_likes_container.classList.toggle('num_likes');
                        num_likes_container.innerHTML = `Likes ${num_likes}`;

                        //create the num comments span
                        let num_comments_container = document.createElement('span');
                        num_comments_container.classList.toggle('num_comments');
                        num_comments_container.innerHTML = `Comments ${num_comments}`;

                        // create the liking disliking container
                        let liking_disliking_container = document.createElement('div');
                        liking_disliking_container.classList.toggle('likes-container');

                        let like = document.createElement('span');
                        like.innerHTML = 'like';
                        like.classList.toggle('like');
                        if (liked_disliked == 'liked') {
                            like.classList.toggle('liked');
                        }

                        let dislike = document.createElement('span');
                        dislike.innerHTML = 'dislike';
                        dislike.classList.toggle('dislike');
                        if (liked_disliked == 'disliked') {
                            dislike.classList.toggle('disliked');
                        }

                        liking_disliking_container.append(like);
                        liking_disliking_container.append(dislike);

                        // append the data containers to the post container;
                        post_container.append(title_container);
                        post_container.append(full_video_container);
                        post_container.append(num_likes_container);
                        post_container.append(username_container);
                        post_container.append(num_comments_container);
                        post_container.append(liking_disliking_container);

                        all_posts_container.append(post_container);

                    }
                    // create the post container
                    /*post_container = document.createElement('div');
                    post_container.classList.toggle('post-container');
                    // get the data from the ajax call
                    let username = posts_list[i]['username'];
                    let title = posts_list[i]['title'];
                    let post_content = posts_list[i]['post_content'];
                    let num_likes = posts_list[i]['num_likes'];
                    let video_file = posts_list[i]['video_file'];
                    let num_comments = posts_list[i]['num_comments'];
                    if (num_comments != null) {
                        console.log(num_comments);
                    }
                    else if (num_comments == null) {
                        num_comments = 0;
                        console.log(num_comments);
                    }

                    // create the username span tag
                    let username_container = document.createElement('span');
                    username_container.classList.toggle('creater');
                    username_container.innerHTML = username;

                    // create the title h3 tag
                    let title_container = document.createElement('h3');
                    title_container.classList.toggle('title');
                    title_container.innerHTML = title;

                    // create the num likes p tag
                    if (post_content != null) {
                        let post_content_container = document.createElement('p');
                        post_content_container.classList.toggle('post-content');
                        post_content_container.innerHTML = post_content;
                    }

                    if (video_file != null) {
                        let video_container = document.createElement('video');
                        video_container.classList.toggle('video');
                        let source = document.createElement('souce');
                        source.src = video_file;
                        source.type = "video/mp4";
                        video_container.append(source);
                    }
                    // create the num likes span
                    let num_likes_container = document.createElement('span');
                    num_likes_container.classList.toggle('num_likes');
                    num_likes_container.innerHTML = `Likes ${num_likes}`;

                    //create the num comments span
                    let num_comments_container = document.createElement('span');
                    num_comments_container.classList.toggle('num_comments');
                    num_comments_container.innerHTML = `Comments ${num_comments}`

                    // append the data containers to the post container;
                    post_container.append(title_container);
                    if (post_content_container) {
                        post_container.append(post_content_container);
                    }
                    if (video_container) {
                        post_container.append(video_container);
                    }
                    post_container.append(num_likes_container);
                    post_container.append(username_container);
                    post_container.append(num_comments_container);

                    all_posts_container.append(post_container);
                    */
                }
                // set the source template to be displayed in the main page container
                // push a new state to the history api
                console.log(channel_name);

                history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts`, `/explore/channel/${channel_name}/posts`);
                like_dislike();
                console.log('calling the load individual post container');
                load_individual_post(channel_name);
            }
            else {
                console.log('There were some errors retrieving the posts');
            }
        }
        request.send();
    }
}

function load_individual_post(channel_name, first_load = null, post_title = null) {
    if (first_load == true) {
        load_nav('explore');
        /*let nav_source = document.querySelector('#explore-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });
        */
        // cleanse the post_title text
        //
        //if (post_title_text.includes('%2525')) {
        //    post_title_text = post_title.replace(/%2525/g, " ");
        // }
        //else if (post_title.text.includes('%20')) {
        //post_title_text = post_title.replace(/%2525/g, " ");
        //}
        //else if (post_title.text.includes('%20%')) {
        //post_title_text = post_title.replace(/%2525/g, " ");
        //  post_title_text = post_title.replace(/%/g, " ");
        //}

        // load the post
        const request = new XMLHttpRequest();

        request.open('post', `/explore/channel/${channel_name}/posts/${post_title}`);

        request.onload = () => {
            console.log('The ajax call has been answered');

            let data = JSON.parse(request.responseText);

            if (data.success) {
                console.log('The call was successfull');
                let comment_list = data.comments;
                let post_data = data.post_data;

                let length = comment_list.length;

                let source = document.querySelector('#individual-post-template').innerHTML;

                let destination = document.querySelector('.page-container');

                let template = Handlebars.compile(source);

                // get the post data from the ajax call
                let post_username = post_data['username'];
                let ajax_post_title = post_data['title'];
                let post_content = post_data['post_content'];
                let post_num_comments = post_data['num_comments'];
                let post_num_likes = post_data['num_likes'];
                let liked_disliked = post_data['liked_disliked'];

                // create the context
                let context = {
                    creator: post_username,
                    post_title: ajax_post_title,
                    post_content: post_content,
                    num_likes: post_num_likes,
                    num_comments: post_num_comments,

                }

                let html = template(context);

                destination.innerHTML = html;

                // setting up the liked_disliked buttons
                if (liked_disliked == 'liked') {
                    document.querySelector('.like').classList.toggle('liked');
                }
                else if (liked_disliked == 'disliked') {
                    document.querySelector('.dislike').classList.toggle('disliked');
                }

                console.log("I am about to print the post data");
                console.log(post_data)

                // select the comments div to put the comments in
                let full_comments_container = document.querySelector('.comments-container');
                //loop for the
                for (let i = 0; i < length; i++) {
                    console.log(comment_list[i]['username'])
                    console.log(comment_list[i]['comment'])
                    let username = comment_list[i]['username']
                    let comment = comment_list[i]['comment']
                    let num_replies = comment_list[i]['num_replies'];

                    //create the comment container
                    let single_comment_container = document.createElement('div');
                    single_comment_container.classList.add('single-comment-container')

                    // create the p to store the comment
                    let comment_p_tag = document.createElement('p');
                    comment_p_tag.classList.toggle('comment');
                    comment_p_tag.innerHTML = comment;

                    // create the span to store the username
                    let username_span_tag = document.createElement('span');
                    username_span_tag.innerHTML = username;
                    username_span_tag.classList.toggle('comment_creator');

                    // create the span to store the reply
                    let reply_span_tag = document.createElement('span');
                    reply_span_tag.innerHTML = 'reply';
                    reply_span_tag.classList.toggle('reply_span');

                    if (num_replies > 0) {
                        // create the span to store the num replies
                        let num_replies_span_tag = document.createElement('span');
                        num_replies_span_tag.innerHTML = `view ${num_replies} replies`;
                        num_replies_span_tag.classList.toggle('num_replies');
                        // add the single comment container
                        single_comment_container.append(comment_p_tag);
                        single_comment_container.append(username_span_tag);
                        single_comment_container.append(reply_span_tag);
                        single_comment_container.append(num_replies_span_tag);
                    }

                    else if (num_replies == 0) {
                        single_comment_container.append(comment_p_tag);
                        single_comment_container.append(username_span_tag);
                        single_comment_container.append(reply_span_tag);
                    }

                    full_comments_container.append(single_comment_container);
                }
                //post_title_text = post_title_text.replace(/ /g, "%");
                //console.log(post_title_text)
                //push a new history

                history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts/${ajax_post_title}`, `/explore/channel/${channel_name}/posts/${ajax_post_title}`);
                like_dislike(load_indvidual_post = true);
                comment_on_post(channel_name, post_title = post_title);
                reply_to_comment(channel_name, post_title = post_title);

            }
            else {
                console.log('There were some errors');
            }

        };
        // send the request
        request.send();
    }
    else {
        let post_title = document.getElementsByClassName('title');
        let length = post_title.length;

        for (let i = 0; i < length; i++) {
            post_title[i].onclick = () => {

                console.log('The post has been clicked about to load the post');

                let post_title_text = post_title[i].innerHTML;

                const request = new XMLHttpRequest();

                request.open('post', `/explore/channel/${channel_name}/posts/${post_title_text}`);

                request.onload = () => {
                    console.log('The ajax call has been answered');

                    let data = JSON.parse(request.responseText);

                    if (data.success) {
                        console.log('The call was successfull');
                        let comment_list = data.comments;
                        let post_data = data.post_data;

                        let length = comment_list.length;

                        let source = document.querySelector('#individual-post-template').innerHTML;

                        let destination = document.querySelector('.page-container');

                        let template = Handlebars.compile(source);

                        // get the post data from the ajax call
                        let post_username = post_data['username'];
                        let ajax_post_title = post_data['title'];
                        let post_content = post_data['post_content'];
                        let post_num_comments = post_data['num_comments'];
                        let post_num_likes = post_data['num_likes'];
                        let liked_disliked = post_data['liked_disliked'];

                        // create the context
                        let context = {
                            creator: post_username,
                            post_title: ajax_post_title,
                            post_content: post_content,
                            num_likes: post_num_likes,
                            num_comments: post_num_comments,

                        }

                        let html = template(context);

                        destination.innerHTML = html;

                        // set up the like dislike buttons
                        if (liked_disliked == 'liked') {
                            document.querySelector('.like').classList.toggle('liked');
                        }
                        else if (liked_disliked == 'disliked') {
                            document.querySelector('.dislike').classList.toggle('disliked');
                        }

                        console.log("I am about to print the post data");
                        console.log(post_data)

                        // select the comments div to put the comments in
                        let full_comments_container = document.querySelector('.comments-container');
                        //loop for the
                        for (let i = 0; i < length; i++) {
                            console.log(comment_list[i]['username'])
                            console.log(comment_list[i]['comment'])
                            let username = comment_list[i]['username']
                            let comment = comment_list[i]['comment']
                            let num_replies = comment_list[i]['num_replies'];

                            //create the comment container
                            let single_comment_container = document.createElement('div');
                            single_comment_container.classList.add('single-comment-container')

                            // create the p to store the comment
                            let comment_p_tag = document.createElement('p');
                            comment_p_tag.classList.toggle('comment');
                            comment_p_tag.innerHTML = comment;

                            // create the span to store the username
                            let username_span_tag = document.createElement('span');
                            username_span_tag.classList.toggle('comment_creator');
                            username_span_tag.innerHTML = username;

                            // create the span for the reply text
                            let reply_span_tag = document.createElement('span');
                            reply_span_tag.innerHTML = 'reply';
                            reply_span_tag.classList.toggle('reply_span');

                            if (num_replies > 0) {
                                // create the span to store the num replies
                                let num_replies_span_tag = document.createElement('span');
                                num_replies_span_tag.innerHTML = `view ${num_replies} replies`;
                                num_replies_span_tag.classList.toggle('num_replies');
                                // add the single comment container
                                single_comment_container.append(comment_p_tag);
                                single_comment_container.append(username_span_tag);
                                single_comment_container.append(reply_span_tag);
                                single_comment_container.append(num_replies_span_tag);
                            }

                            else if (num_replies == 0) {
                                single_comment_container.append(comment_p_tag);
                                single_comment_container.append(username_span_tag);
                                single_comment_container.append(reply_span_tag);

                            }
                            // create the span to store the num replies
                            /*
                            let num_replies_span_tag = document.createElement('span');
                            num_replies_span_tag.innerHTML = `num replies: ${num_replies}`;
                            num_replies_span_tag.classList.toggle('num_replies');

                            single_comment_container.append(comment_p_tag);
                            single_comment_container.append(username_span_tag);
                            single_comment_container.append(reply_span_tag);
                            single_comment_container.append(num_replies_span_tag);
                            */

                            full_comments_container.append(single_comment_container);
                        }
                        console.log(post_title_text);
                        //post_title_text = post_title_text.replace(/ /g, "%");
                        console.log(post_title_text);
                        //push a new history
                        history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts/${ajax_post_title}`, `/explore/channel/${channel_name}/posts/${ajax_post_title}`);
                        like_dislike(load_indvidual_post = true);
                        comment_on_post(channel_name, post_title = post_title_text);
                        reply_to_comment(channel_name, post_title = post_title_text);
                    }
                    else {
                        console.log('There were some errors');
                    }

                };

                request.send();

            }
        }
        /*
        let post_title = document.querySelector('.title');
        post_title_text = post_title.innerHTML

        post_title.onclick = () => {
            console.log('The post has been clicked about to load the post');

            const request = new XMLHttpRequest();

            request.open('post', `/explore/channel/${channel_name}/posts/${post_title_text}`);

            request.onload = () => {
                console.log('The ajax call has been answered');

                let data = JSON.parse(request.responseText);

                if (data.success) {
                    console.log('The call was successfull');
                    let comment_list = data.comments;
                    let post_data = data.post_data;

                    let length = comment_list.length;

                    let source = document.querySelector('#individual-post-template').innerHTML;

                    let destination = document.querySelector('.page-container');

                    let template = Handlebars.compile(source);

                    // get the post data from the ajax call
                    let post_username = post_data['username'];
                    let ajax_post_title = post_data['title'];
                    let post_content = post_data['post_content'];
                    let post_num_comments = post_data['num_comments'];
                    let post_num_likes = post_data['num_likes'];
                    let liked_disliked = post_data['liked_disliked'];

                    // create the context
                    let context = {
                        creator: post_username,
                        post_title: ajax_post_title,
                        post_content: post_content,
                        num_likes: post_num_likes,
                        num_comments: post_num_comments,

                    }

                    let html = template(context);

                    destination.innerHTML = html;

                    // set up the like dislike buttons
                    if (liked_disliked == 'liked') {
                        document.querySelector('.like').classList.toggle('liked');
                    }
                    else if (liked_disliked == 'disliked') {
                        document.querySelector('.dislike').classList.toggle('disliked');
                    }

                    console.log("I am about to print the post data");
                    console.log(post_data)

                    // select the comments div to put the comments in
                    let full_comments_container = document.querySelector('.comments-container');
                    //loop for the
                    for (let i = 0; i < length; i++) {
                        console.log(comment_list[i]['username'])
                        console.log(comment_list[i]['comment'])
                        let username = comment_list[i]['username']
                        let comment = comment_list[i]['comment']

                        //create the comment container
                        let single_comment_container = document.createElement('div');
                        single_comment_container.classList.add('single-comment-container')

                        // create the p to store the comment
                        let comment_p_tag = document.createElement('p');
                        comment_p_tag.innerHTML = comment;

                        // create the span to store the username
                        let username_span_tag = document.createElement('span');
                        username_span_tag.innerHTML = username;

                        single_comment_container.append(comment_p_tag);
                        single_comment_container.append(username_span_tag);

                        full_comments_container.append(single_comment_container);
                    }
                    console.log(post_title_text);
                    //post_title_text = post_title_text.replace(/ /g, "%");
                    console.log(post_title_text);
                    //push a new history
                    history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts/${ajax_post_title}`, `/explore/channel/${channel_name}/posts/${ajax_post_title}`);
                    like_dislike(load_indvidual_post = true);
                    comment_on_post();
                }
                else {
                    console.log('There were some errors');
                }

            };
            request.send();
        }
        */
    }

}
function comment_on_post(channel_name, post_title) {
    console.log('The comment on post function is running');

    // select the comment button
    let comment_input = document.querySelector('.input-comment');

    comment_input.onclick = () => {
        console.log('And you might have a small idea of the noise');
        // selec the cancle span
        let buttons = document.querySelectorAll('.comment-buttons');

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].classList.contains('active-span')) {
                continue;

            }
            else {
                buttons[i].classList.toggle('active-span');
                console.log(buttons[i]);
            }

        }
    }
    let cancle_btn = document.querySelector('.cancel-btn');
    let comment_btn = document.querySelector('.comment-btn');

    // check to see if the user has entered text into to input container
    comment_input.addEventListener('keyup', (event) => {
        // check to see if the comment input container has text in it
        let text = comment_input.innerText;

        text_length = text.trim().length;

        if (text == '' || text == null || text_length == 0) {
            console.log("The user still can't comment");
            // check to see if the comment_btn is disabled
            comment_btn.disabled = true;
        }
        else {
            // make the comment button active
            comment_btn.disabled = false;
        }
    })

    cancle_btn.onclick = () => {
        console.log('A cancel the comment');
        let buttons = document.querySelectorAll('.comment-buttons');

        for (let i = 0; i < buttons.length; i++) {
            console.log('removing the active span styling');
            buttons[i].classList.toggle('active-span');
        }

        // disable the comment button
        comment_btn.disabled = true;

        // reset the comment div field
        comment_input.innerHTML = '';
    }


    comment_btn.onclick = () => {
        console.log('the comment button was clicked');
        // check to see if there is text in the comment field
        let comment = comment_input.innerText;

        if (comment == '' || comment == null) {
            console.log("You can't submit a empty comment");
        }
        else {
            console.log('We can submit this comment button to the server');

            const request = new XMLHttpRequest();

            request.open('post', `/explore/channel/${channel_name}/posts/${post_title}/create-comment`);

            request.onload = () => {
                console.log('The server has sent back data from the server call');
                let data = JSON.parse(request.responseText);

                if (data.success) {
                    console.log('The ajax call has been succesfull');
                    console.log('The comment has been created');
                }
                else {
                    console.log("The ajax call wasn't succesfull");
                }
            }

            let submit_data = new FormData();
            console.log(comment);
            submit_data.append('comment', comment);
            request.send(submit_data);
        }
    }
}
function reply_to_comment(channel_name) {
    console.log('The reply to comment function is running');

    //select the reply span
    let reply_btns = document.getElementsByClassName('reply_span');
    let comments = document.getElementsByClassName('comment');
    let comment_creator = document.getElementsByClassName('comment_creator');
    let comment_container = document.getElementsByClassName('single-comment-container');
    let num_replies_spans = document.getElementsByClassName('num_replies');
    let length = reply_btns.length;

    for (let i = 0; i < length; i++) {
        reply_btns[i].onclick = () => {
            console.log("The reply to comment button was clicked");
            let comment = comments[i].innerHTML;
            let creator = comment_creator[i].innerHTML;
            console.log(comment);
            console.log(creator);

            // remove all of the previous open comment container
            let open_reply_to_comments = document.getElementsByClassName('reply-to-comment');

            if (open_reply_to_comments.length != 0) {
                let length = open_reply_to_comments.length;
                for (let i = 0; i < length; i++) {
                    open_reply_to_comments[i].remove();
                }
            }
            //create the comment container
            let reply_to_comment_container = document.createElement('div');
            reply_to_comment_container.classList.toggle('reply-to-comment');
            // create the cancel button
            let cancel_btn = document.createElement('button');
            cancel_btn.classList.toggle('reply-to-comment-cancel-btn');
            cancel_btn.innerHTML = 'cancel'
            // create the comment button
            let comment_btn = document.createElement('button');
            comment_btn.classList.toggle('reply-to-comment-comment-btn');
            comment_btn.innerHTML = 'comment';
            comment_btn.disabled = true;
            // create the comment input field
            let comment_input = document.createElement('textarea');
            comment_input.classList.toggle('reply-to-comment-input');

            //add the elements to the comment div
            reply_to_comment_container.append(comment_input);
            reply_to_comment_container.append(comment_btn);
            reply_to_comment_container.append(cancel_btn);

            // add the add comment container to the html document
            comment_container[i].insertAdjacentElement('afterEnd', reply_to_comment_container);

            // select the cancel button
            let new_cancel_btn = document.querySelector('.reply-to-comment-cancel-btn');
            // select the input field
            let input_field = document.querySelector('.reply-to-comment-input');
            // select the comment button
            let new_comment_btn = document.querySelector('.reply-to-comment-comment-btn');

            // when the cancel button is clicked
            new_cancel_btn.onclick = () => {
                console.log('you clicked the cancel button');
                // remove the reply to comment container
                let remove_comment = document.querySelector('.reply-to-comment');
                remove_comment.remove();
            }

            // add an event listener for the input field to see if there is text in it
            input_field.addEventListener('keyup', (event) => {
                // check to see if the comment input container has text in it
                let text = input_field.value;

                text_length = text.trim().length;

                if (text == '' || text == null || text_length == 0) {
                    console.log("The user still can't comment");
                    // check to see if the comment_btn is disabled
                    comment_btn.disabled = true;
                }
                else {
                    // make the comment button active
                    comment_btn.disabled = false;
                }
            })

            // when the comment button is clicked
            new_comment_btn.onclick = () => {
                console.log('The comment button has been clicked');
                post_title = document.querySelector('.title');
                post_title = post_title.innerHTML;
                // get the reply comment from the input field
                let reply = input_field.value;
                // create the ajax call\
                const request = new XMLHttpRequest();

                request.open('post', `/explore/channel/${channel_name}/posts/${post_title}/reply-to-comment`);

                request.onload = () => {
                    console.log('The ajax call has been set back')

                    let data = JSON.parse(request.responseText);

                    if (data.success) {
                        console.log('The ajax call was a success');
                    }
                    else {
                        console.log('There were some errors');
                    }
                }

                let submit_data = new FormData();
                submit_data.append('comment', comment);
                submit_data.append('comment_creator', creator);
                submit_data.append('reply', reply);
                request.send(submit_data);
            }
        }
        num_replies_spans[i].onclick = () => {
            console.log('the user has clicked the num_replies_span');
            let num_replies_text = num_replies_spans[i].innerHTML;
            if (num_replies_text.includes('view')) {
                console.log('The user can view the replies');
                let comment = comments[i].innerHTML;
                let creator = comment_creator[i].innerHTML;
                let post_title = document.querySelector('.title');
                post_title = post_title.innerHTML;
                console.log('the num replies button was clicked');

                // create new ajax call
                const request = new XMLHttpRequest();

                request.open('post', `/explore/channel/${channel_name}/posts/${post_title}/get-sub-comments`);

                request.onload = () => {
                    console.log('the ajax call has been sent succesfully');

                    let data = JSON.parse(request.responseText);

                    if (data.success) {
                        console.log('The ajax call has received a true success response from the server');
                        let reply_comment_list = data.reply_comment_list;
                        length = reply_comment_list.length;
                        // change the text in num replies
                        num_replies_spans[i].innerHTML = `hide ${length} replies`;
                        let comments_container = document.querySelector('.comments-container');

                        // create the reply comments container
                        let reply_comments_container = document.createElement('div');
                        reply_comments_container.classList.add('reply-comments-container');
                        reply_comments_container.setAttribute('id', `replied-to-comment-${i}`);

                        // get the comment_number 
                        og_comment_number = i;


                        for (let i = 0; i < length; i++) {
                            // get the reply comment
                            let reply = reply_comment_list[i].reply;
                            let replying_to = reply_comment_list[i].replying_to;

                            replying_to = `@${replying_to} `;

                            // create a span for the user_handle 
                            let user_handle = document.createElement('strong');
                            user_handle.classList.toggle('user-handle');
                            user_handle.innerHTML = replying_to;

                            // create the span to store the comment
                            let span_comment = document.createElement('strong');
                            //span_comment.classList.toggle('comment');
                            span_comment.classList.add('comment-span');
                            span_comment.classList.add('reply-comment');
                            span_comment.innerHTML = reply;

                            // create a paragraph for the reply comment
                            let p = document.createElement('p');
                            p.classList.toggle('comment-p-tag');
                            p.append(span_comment);
                            p.append(user_handle);

                            // get the creator of the reply comment
                            let reply_creator = reply_comment_list[i].username;

                            // create a span for the reply-creator
                            let span = document.createElement('span');
                            //span.classList.toggle('creator')
                            span.classList.add('reply-creator');
                            span.innerHTML = reply_creator;

                            // create the single comment container
                            let single_comment_container = document.createElement('div');
                            single_comment_container.classList.toggle('replied-to-single-comment-container');
                            single_comment_container.classList.add(`og-comment-replied-to-${og_comment_number}`);

                            // create a tag for the user to intiate a reply to the comment
                            let reply_tag = document.createElement('span');
                            reply_tag.classList.toggle('sub_comments_reply');
                            reply_tag.innerHTML = 'reply';

                            // append the reply comment to the container
                            single_comment_container.append(p);

                            // append the creator of the comment container
                            single_comment_container.append(span);

                            // append the reply_tag to the comment container
                            single_comment_container.append(reply_tag);

                            console.log(single_comment_container);

                            // append the single comment container to the comments_container
                            reply_comments_container.append(single_comment_container);
                        }

                        comment_container[i].insertAdjacentElement('afterEnd', reply_comments_container);

                        reply_to_reply_comment(channel_name);

                    }

                    /*{
                       console.log('The ajax call has received a true success response from the server');
                       let reply_comment_list = data.reply_comment_list;
                       length = reply_comment_list.length;
                       let comments_container = document.querySelector('.comments-container');
                       comments_container.innerHTML = '';
    
                       // create the orginal comment that people have replied to
                       let og_comment_container = document.createElement('div');
                       og_comment_container.classList.toggle('original-comment-container');
    
                       // create the p to store the comment
                       let og_comment = document.createElement('p');
                       og_comment.classList.toggle('og-comment');
                       og_comment.innerHTML = comment;
    
                       // create the span to store the og comment creator
                       let og_comment_creator = document.createElement('span');
                       og_comment_creator.classList.toggle('og-comment-creator');
                       og_comment_creator.innerHTML = creator;
    
                       // append the comment and the span tag to the og comment container
                       og_comment_container.append(og_comment);
                       og_comment_container.append(og_comment_creator);
    
                       // append the og comment container to the comments container
    
                       comments_container.append(og_comment_container);
    
    
                       for (let i = 0; i < length; i++) {
                           // get the reply comment
                           let reply = reply_comment_list[i].reply;
                           let replying_to = reply_comment_list[i].replying_to;
    
                           replying_to = `@${replying_to} `;
    
                           // create a span for the user_handle 
                           let user_handle = document.createElement('strong');
                           user_handle.classList.toggle('user-handle');
                           user_handle.innerHTML = replying_to;
    
                           // create the span to store the comment
                           let span_comment = document.createElement('strong');
                           span_comment.classList.toggle('comment');
                           span_comment.classList.add('comment-span');
                           span_comment.innerHTML = reply;
    
                           // create a paragraph for the reply comment
                           let p = document.createElement('p');
                           p.classList.toggle('comment-p-tag');
                           p.append(span_comment);
                           p.append(user_handle);
    
                           // get the creator of the reply comment
                           let reply_creator = reply_comment_list[i].username;
    
                           // create a span for the reply-creator
                           let span = document.createElement('span');
                           span.classList.toggle('creator')
                           span.innerHTML = reply_creator;
    
                           // create the single comment container
                           let single_comment_container = document.createElement('div');
                           single_comment_container.classList.toggle('single-comment-container');
    
                           // create a tag for the user to intiate a reply to the comment
                           let reply_tag = document.createElement('span');
                           reply_tag.classList.toggle('sub_comments_reply');
                           reply_tag.innerHTML = 'reply';
    
                           // append the reply comment to the container
                           single_comment_container.append(p);
    
                           // append the creator of the comment container
                           single_comment_container.append(span);
    
                           // append the reply_tag to the comment container
                           single_comment_container.append(reply_tag);
    
                           console.log(single_comment_container);
    
                           // append the single comment container to the comments_container
                           console.log(comments_container);
                           comments_container.append(single_comment_container);
    
                           let destination = document.querySelector('.page-container');
    
                           // push the history
                       }
                       
                       reply_to_reply_comment(channel_name);
    
                   }
                   */
                    else {
                        console.log('there were some errors on the ajax call');
                    }
                }
                let submit_data = new FormData();
                submit_data.append('comment', comment);
                submit_data.append('creator', creator);
                request.send(submit_data);
            }
            else if (num_replies_text.includes('hide')) {
                console.log('the user can hide the replies');
                console.log('we need to remove the comments');
                // get the container to remove
                reply_to_comment_container = document.querySelector(`#replied-to-comment-${i}`);
                reply_to_comment_container.remove();

                let test_number = num_replies_text.split('hide ');
                console.log(test_number);
                test_number = test_number[1];
                test_number = test_number.split(' replies');
                console.log(test_number);
                test_number = test_number[0];
                console.log(test_number);
                // change the num_replies inner html
                num_replies_spans[i].innerHTML = `view ${test_number} replies`

            }
        }
    }
}

function reply_to_reply_comment(channel_name) {
    console.log('the reply to reply comment button has been clicked');
    let sub_comments_container = document.getElementsByClassName('single-comment-container');
    let replied_to_sub_comments_container = document.getElementsByClassName('replied-to-single-comment-container');
    let reply_btns = document.getElementsByClassName('sub_comments_reply');
    comments = document.getElementsByClassName('reply-comment');
    creators = document.getElementsByClassName('reply-creator');
    let length = reply_btns.length;

    for (let i = 0; i < length; i++) {
        reply_btns[i].onclick = () => {
            let comment = comments[i].innerHTML;

            // extract the comment from the @ tag
            let creator = creators[i].innerHTML;

            let id_of_og_comment = replied_to_sub_comments_container[i].classList;
            let test_1 = id_of_og_comment[0];
            let test_2 = id_of_og_comment[1];
            let the_og_comment_number = null;
            if (test_1.includes('og-comment-replied-to-')) {
                test_1 = test_1.split('og-comment-replied-to-');
                test_1 = test_1[1];
                console.log('I have found the id of og comment');
                console.log(test_1);
                the_og_comment_number = test_1;
            }
            else if (test_2.includes('og-comment-replied-to-')) {
                test_2 = test_2.split('og-comment-replied-to-');
                test_2 = test_2[1];
                console.log('I have found the id of of comment');
                console.log(test_2);
                the_og_comment_number = test_2;

            }
            // get the og_comment
            let og_comment = sub_comments_container[the_og_comment_number];
            og_comment = og_comment.getElementsByClassName('comment')[0];
            console.log('horray i found the og comment');
            og_comment = og_comment.innerHTML;
            // get the og comment creator
            let og_comment_creator = sub_comments_container[the_og_comment_number];
            og_comment_creator = og_comment_creator.getElementsByClassName('comment')[0];
            og_comment_creator = og_comment_creator.innerHTML;
            console.log('The user has clicked on the reply to reply function');
            console.log(comment);
            console.log(creator);
            // load the comment input field

            let open_reply_to_comments = document.getElementsByClassName('reply-to-comment');

            if (open_reply_to_comments.length != 0) {
                let length = open_reply_to_comments.length;
                for (let i = 0; i < length; i++) {
                    open_reply_to_comments[i].remove();
                }
            }

            // create the comment container
            let reply_to_comment_container = document.createElement('div');
            reply_to_comment_container.classList.toggle('reply-to-comment');

            // create the cancel button
            // create the cancel button
            let cancel_btn = document.createElement('button');
            cancel_btn.classList.toggle('reply-to-comment-cancel-btn');
            cancel_btn.innerHTML = 'cancel'
            // create the comment button
            let comment_btn = document.createElement('button');
            comment_btn.classList.toggle('reply-to-comment-comment-btn');
            comment_btn.innerHTML = 'comment';
            comment_btn.disabled = true;
            // create the comment input field
            let comment_input = document.createElement('textarea');
            comment_input.classList.toggle('reply-to-comment-input');

            //add the elements to the comment div
            reply_to_comment_container.append(comment_input);
            reply_to_comment_container.append(comment_btn);
            reply_to_comment_container.append(cancel_btn);

            // add the add comment container to the html document
            replied_to_sub_comments_container[i].insertAdjacentElement('afterEnd', reply_to_comment_container);

            // select the cancel button
            let new_cancel_btn = document.querySelector('.reply-to-comment-cancel-btn');
            // select the input field
            let input_field = document.querySelector('.reply-to-comment-input');
            // select the comment button
            let new_comment_btn = document.querySelector('.reply-to-comment-comment-btn');

            // when the cancel button is clicked
            new_cancel_btn.onclick = () => {
                console.log('you clicked the cancel button');
                // remove the reply to comment container
                let remove_comment = document.querySelector('.reply-to-comment');
                remove_comment.remove();
            }

            // add an event listener for the input field to see if there is text in it
            input_field.addEventListener('keyup', (event) => {
                // check to see if the comment input container has text in it
                let text = input_field.value;

                text_length = text.trim().length;

                if (text == '' || text == null || text_length == 0) {
                    console.log("The user still can't comment");
                    // check to see if the comment_btn is disabled
                    comment_btn.disabled = true;
                }
                else {
                    // make the comment button active
                    comment_btn.disabled = false;
                }
            })

            new_comment_btn.onclick = () => {
                console.log('The comment button has been clicked');

                post_title = document.querySelector('.title');
                post_title = post_title.innerHTML;

                let reply = input_field.value;

                const request = new XMLHttpRequest();

                request.open('post', `/explore/channel/${channel_name}/posts/${post_title}/reply-to-reply-comment`);

                request.onload = () => {
                    console.log('The ajax call has been set back');

                    let data = JSON.parse(request.responseText);

                    if (data.success) {
                        console.log('The ajax call was a success');

                    }
                    else {
                        console.log('There were some errors');
                    }

                }

                let submit_data = new FormData();

                submit_data.append('comment', comment);
                submit_data.append('comment_creator', creator);
                submit_data.append('reply', reply);
                submit_data.append('og_comment', og_comment);
                submit_data.append('og_comment_creator', og_comment_creator);
                request.send(submit_data);

            }


        }

    }
}
function load_create_post(channel_name, first_load = null) {
    if (first_load == true) {
        console.log('I am going to load the create post');
        /*
        let post_template = document.querySelector('#create-video-post-template').innerHTML;

        let destination = document.querySelector('.page-container');

        destination.innerHTML = post_template;

        // set the active class on the post-template
        */

        let change_post_type_menu = document.getElementById('create-new-post-selector').innerHTML;
        let destination = document.querySelector('.page-container');

        destination.innerHTML = change_post_type_menu;

        let active_post = document.querySelector('#video-post');

        active_post.classList.toggle('active-post-template');

        let default_post = document.querySelector('#create-video-post-template').innerHTML;

        destination.insertAdjacentHTML('beforeend', default_post);

        history.replaceState(destination.innerHTML, `/explore/channel/${channel_name}/create-new-post`, `/explore/channel/${channel_name}/create-new-post`);
        form_controll(redirect = null, channel_name = channel_name);
        switch_post_template(channel_name);
    }
    else {
        console.log('I am going to load the create post');
        let change_post_type_menu = document.getElementById('create-new-post-selector').innerHTML;
        let destination = document.querySelector('.page-container');

        destination.innerHTML = change_post_type_menu;

        let active_post = document.querySelector('#video-post');

        active_post.classList.toggle('active-post-template');

        let default_post = document.querySelector('#create-video-post-template').innerHTML;

        destination.insertAdjacentHTML('beforeend', default_post);

        history.replaceState(destination.innerHTML, `/explore/channel/${channel_name}/create-new-post`, `/explore/channel/${channel_name}/create-new-post`);
        form_controll(redirect = null, channel_name = channel_name);
        switch_post_template(channel_name);
    }
}

function switch_post_template(channel_name) {
    let text_post = document.querySelector("#text-post");
    let video_post = document.querySelector('#video-post');

    let destination = document.querySelector('.post-container');

    text_post.onclick = () => {
        console.log('The text post button was clicked');

        console.log('changing the template');
        // select the new template
        let new_post_template = document.querySelector('#create-text-post-template').innerHTML;

        // remove the current form
        let current_post_template = document.querySelector('.post-template-container');
        current_post_template.remove();
        // append the new text_post_template
        destination = document.querySelector('.page-container');

        destination.insertAdjacentHTML('beforeend', new_post_template);

        // set txt as the active class
        text_post.classList.toggle('active-post-template');

        // remove the active class from the video
        video_post.classList.toggle('active-post-template');

        // push to the history api
        history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/create-new-post`, `/explore/channel/${channel_name}/create-new-post`);

        form_controll(redirect = null, channel_name = channel_name);

        //switch_post_template(channel_name);
        /*
        if (text_post.classList.contains('active-post-template')) {
            console.log('The text-post is already the active one');
        }
        else if (video_post.classList.contains('active-post-template')) {
            console.log('changing the template');
            // select the new template
            let new_post_template = document.querySelector('#create-text-post-template').innerHTML;

            // remove the current form
            let current_post_template = document.querySelector('.post-template-container');
            current_post_template.remove();
            // append the new text_post_template
            destination = document.querySelector('.page-container');

            destination.insertAdjacentHTML('afterend', new_post_template);

            // set txt as the active class
            text_post.classList.toggle('active-post-template');

            // remove the active class from the video
            video_post.classList.toggle('active-post-template');

            // push to the history api
            history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/create-new-post`, `/explore/channel/${channel_name}/create-new-post`);

            //switch_post_template(channel_name);

        }
        */
    }
    video_post.onclick = () => {
        console.log('changing the template');
        // select the new template
        let new_post_template = document.querySelector('#create-video-post-template').innerHTML;

        // remove the current form
        let current_post_template = document.querySelector('.post-template-container');
        current_post_template.remove();
        // append the new text_post_template
        destination = document.querySelector('.page-container');

        destination.insertAdjacentHTML('beforeend', new_post_template);

        // set txt as the active class
        video_post.classList.toggle('active-post-template');

        // remove the active class from the video
        text_post.classList.toggle('active-post-template');

        // push to the history api
        history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/create-new-post`, `/explore/channel/${channel_name}/create-new-post`);
        form_controll(redirect = null, channel_name = channel_name);
        //switch_post_template(channel_name);
        /*console.log('the video post button was clicked');
        if (text_post.classList.contains('active-post-template')) {
            console.log('the video post template is already active');

        }
        else if (text_post.classList.contains('active-post-template')) {

            console.log('changing the template');
            // select the new template
            let new_post_template = document.querySelector('#create-video-post-template').innerHTML;

            // remove the current form
            let current_post_template = document.querySelector('.post-template-container');
            current_post_template.remove();
            // append the new text_post_template
            destination = document.querySelector('.page-container');

            destination.insertAdjacentHTML('afterend', new_post_template);

            // set txt as the active class
            video_post.classList.toggle('active-post-template');

            // remove the active class from the video
            text_post.classList.toggle('active-post-template');

            // push to the history api
            history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/create-new-post`, `/explore/channel/${channel_name}/create-new-post`);
            //switch_post_template(channel_name);
        }
    }
    */
    }
}

function like_dislike(load_indvidual_post = null) {
    if (load_indvidual_post != null) {
        console.log('this is the like dislike for the load_individual_post');
        let like_btn = document.querySelector('.like');
        let dislike_btn = document.querySelector('.dislike');
        let post_title = document.querySelector('.title').innerHTML;


        like_btn.onclick = () => {
            console.log('The like button was clicked');
            const request = new XMLHttpRequest();

            request.open('post', `/${post_title}/like_dislike/like`)

            request.onload = () => {
                console.log('The ajax call has been sent back');
                let data = JSON.parse(request.responseText);
                // check to see if the 
                // make the like button 
                if (data.success) {
                    let passed_liked = data.passed_liked;
                    if (passed_liked == 'dislike') {
                        //remove the disliked from the dislike button
                        dislike_btn.classList.toggle('disliked');
                        like_btn.classList.toggle('liked');
                    }
                    else if (passed_liked == 'removed_like') {
                        like_btn.classList.toggle('liked');
                    }
                    else {
                        like_btn.classList.toggle('liked');
                    }
                }
                else {
                    console.log('The were some errors');
                }
            }

            request.send();
        }

        dislike_btn.onclick = () => {
            console.log('The dislike button was clicked');
            const request = new XMLHttpRequest();

            request.open('post', `/${post_title}/like_dislike/dislike`)

            request.onload = () => {
                console.log('The ajax call has been sent back');

                let data = JSON.parse(request.responseText);

                if (data.success) {
                    console.log("The ajax call was succesful");
                    let passed_liked = data.passed_liked;
                    if (passed_liked == 'like') {
                        // remove the liked from the like button
                        like_btn.classList.toggle('liked');
                        dislike_btn.classList.toggle('disliked');
                    }
                    else if (passed_liked == 'removed_dislike') {
                        dislike_btn.classList.toggle('disliked');
                    }
                    else {
                        dislike_btn.classList.toggle('disliked');
                    }
                }
                else {
                    console.log('You have already disliked this post');
                }
            }
            request.send();
        }
    }
    else {
        let like_btn = document.getElementsByClassName('like');
        let dislike_btn = document.getElementsByClassName('dislike');
        let posts = document.getElementsByClassName('post-container');
        for (let i = 0; i < like_btn.length; i++) {
            like_btn[i].onclick = () => {
                console.log("The like button was clicked");
                let post_title = posts[i].querySelector('.title').innerHTML;
                console.log(post_title);
                const request = new XMLHttpRequest();

                request.open('post', `/${post_title}/like_dislike/like`);

                request.onload = () => {
                    console.log('The ajax call has been sent back');

                    let data = JSON.parse(request.responseText);

                    if (data.success) {
                        console.log("The ajac call was succesfull");
                        // check to see if the 
                        // make the like button 
                        let passed_liked = data.passed_liked;
                        if (passed_liked == 'dislike') {
                            //remove the disliked from the dislike button
                            dislike_btn[i].classList.toggle('disliked');
                            like_btn[i].classList.toggle('liked');
                        }
                        else if (passed_liked == 'removed_like') {
                            like_btn[i].classList.toggle('liked');
                        }
                        else {
                            like_btn[i].classList.toggle('liked');
                        }
                    }
                    else {
                        console.log('You have already liked this post');
                    }
                }

                request.send();
            }
        }

        for (let i = 0; i < dislike_btn.length; i++) {
            dislike_btn[i].onclick = () => {
                console.log('The dislike button was clicked');
                let post_title = posts[i].querySelector('.title').innerHTML;
                console.log(post_title);

                const request = new XMLHttpRequest()

                request.open('post', `/${post_title}/like_dislike/dislike`)
                request.onload = () => {
                    console.log('The ajax call has been sent back');

                    let data = JSON.parse(request.responseText);

                    if (data.success) {
                        console.log("The ajax call was succesful");
                        let passed_liked = data.passed_liked;
                        if (passed_liked == 'like') {
                            // remove the liked from the like button
                            like_btn[i].classList.toggle('liked');
                            dislike_btn[i].classList.toggle('disliked');
                        }
                        else if (passed_liked == 'removed_dislike') {
                            dislike_btn[i].classList.toggle('disliked');
                        }
                        else {
                            dislike_btn[i].classList.toggle('disliked');
                        }
                    }
                    else {
                        console.log('You have already disliked this post');
                    }
                }
                request.send();
            }
        }
    }
}

function load_nav(nav_name) {
    if (nav_name == 'home') {
        console.log('Loading the homepage-nav');
        // get the source html
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        // select the nav
        let nav_destination = document.querySelector('nav');
        // push the html into the nav
        nav_destination.innerHTML = nav_source;

        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });


    }
    else if (nav_name == 'explore') {
        console.log('loading the explore nav');
        // get the html source code
        let nav_source = document.querySelector('#explore-nav-template').innerHTML;;
        // select the nav
        let nav_destination = document.querySelector('nav');
        // push the html into the nav
        nav_destination.innerHTML = nav_source;

        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });

        // set up the user profile side nav

        let user_profile = document.querySelector('.user-profile-pic');
        console.log(user_profile);
        user_profile.onclick = () => {
            console.log('The user profile has been clickedd');
            let side_nav = document.querySelector('#mySidenav');
            side_nav.style.width = "250px";
        }

        let close_btn = document.querySelector('.closebtn');
        close_btn.onclick = () => {
            console.log('The close button has been clicked');
            let side_nav = document.querySelector('#mySidenav');
            side_nav.style.width = '0px';
        }
    }

}
function load_template(template_name) {
    let nav_source = document.querySelector('#explore-nav-template').innerHTML;
    let nav_destination = document.querySelector('nav');

    nav_destination.innerHTML = nav_source;

    let mainNav = document.getElementById('js-menu');
    let navBarToggle = document.getElementById('js-navbar-toggle');
    // creating the active class on the navbar
    navBarToggle.addEventListener('click', function (event) {
        mainNav.classList.toggle('active');
    });
    console.log(template_name);
    let source = document.querySelector(`#${template_name}`).innerHTML;

    let destination = document.querySelector('.page-container');
    destination.innerHTML = source;
}

function load_template_func(template_name, nav_name, force_login = null) {
    if (force_login == true) {
        console.log('redirecting the the login route');
        load_nav('home');

        let source = document.querySelector(`#${template_name}`).innerHTML;

        let destination = document.querySelector('.page-container');

        destination.innerHTML = source;

    }
    else if (nav_name == 'explore') {
        load_nav('explore');

        let source = document.querySelector(`#${template_name}`).innerHTML;

        let destination = document.querySelector('.page-container');

        destination.innerHTML = source;
    }

    else {
        load_nav('home');

        let source = document.querySelector(`#${template_name}`).innerHTML;

        let destination = document.querySelector('.page-container');

        destination.innerHTML = source;

    }
}
// for the history api. Getting the back button to work
window.onpopstate = (event) => {
    console.log('The window pop state has been fired');
    page = document.querySelector('.page-container');
    console.log(location.href);
    console.log(event.state);
    let url = location.href;
    if (url.includes('http://127.0.0.1:5000/explore/channel/')) {
        console.log('the url still includes a channel')
        let channel_name = url.split('http://127.0.0.1:5000/explore/channel/').pop();
        console.log(channel_name)
        if (channel_name.includes('/posts/')) {
            console.log('There is a single post so wee should  all the comments function');
            console.log('the comments function should be called');
            channel_name = channel_name.split('/posts/')[0];
            console.log(channel_name);
            page.innerHTML = event.state;
            comment_on_post(channel_name);
            reply_to_comment(channel_name);
            //comment_on_post();
            //reply_to_comment();

        }
        else if (channel_name.includes('/posts')) {
            console.log('here we would call the like post function as well as the load_individual_post function');
            page.innerHTML = event.state;
            channel_name = channel_name.split('/posts')[0];
            console.log('litty');
            console.log(channel_name)
            load_individual_post(channel_name);
        }
        else {
            console.log('here we would call the load channel posts function');
            page.innerHTML = event.state;
            channel_load_posts(channel_name, true)
        }
    }
    else {
        page.innerHTML = event.state;
    }
}





/*

function load_first_page() {
    let url = window.location.href;
    console.log(`The url right now is ${url}`)
    if (url.includes('logout')) {
        let new_url = 'http://127.0.0.1:5000/'
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
        let source = document.querySelector('#homepage-template').innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        history.replaceState(document.querySelector('.page-container').innerHTML, '', new_url);
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });

    }
    else if (url === 'http://127.0.0.1:5000/') {
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
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
    else if (url == "http://127.0.0.1:5000/login?next=%2Fexplore") {
        // redirect the user to the login form
        // set the nav
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;

        // grab the login form
        let source = document.querySelector('#login-template').innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        history.replaceState(destination.innerHTML, 'login', 'login');
        form_controll('explore');
    }

    else if (url == "http://127.0.0.1:5000/login?next=%2Fexplore%2Fcreate-new-channel") {
        console.log('The user wants to create a new channel');
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;

        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });

        // load the template
        let source = document.querySelector('#login-template').innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;

        history.replaceState(destination.innerHTML, 'login', 'login');

        form_controll('create-new-channel');



    }
    else if (url.includes('http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F')) {
        //redirect the user to the login route

        let data_string = url.split('http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F').pop();

        let data_list = data_string.split('%2Fposts');
        let unclean_post_title = data_list[1];
        console.log(unclean_post_title);
        let channel_name = data_list[0];
        console.log(channel_name)

        if (unclean_post_title != null && unclean_post_title != '%2Fposts' && unclean_post_title != "") {
            console.log('the individual post has been selected');
            // get the post title
            let post_title = unclean_post_title.split('%2F').pop();
            // cleanse the post title
            let cleansed_post_title = post_title.replace(/%2525/g, " ");

            let source = document.querySelector('#login-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            history.replaceState(destination.innerHTML, 'login', 'login');
            console.log(channel_name)
            console.log(cleansed_post_title);
            // call the form_controll
            form_controll(redirect = 'individual-post', channel_name = channel_name, oosts = null, individual_post_title = cleansed_post_title);
        }

        else if (url == `http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F${channel_name}%2Fposts`) {
            console.log('The user is trying to access the posts for a channel without being logged in');
            //set the navbar
            let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            // display the login form
            let source = document.querySelector('#login-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            history.replaceState(destination.innerHTML, 'login', 'login');
            form_controll('explore-channel', channel_name, 'load');
        }
        else {
            let channel_name = url.split('http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F').pop();
            //set the navbar
            let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            // display the login form
            let source = document.querySelector('#login-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            history.replaceState(destination.innerHTML, 'login', 'login');
            form_controll('explore-channel', channel_name);
        }

    }
    else if (url.includes('http://127.0.0.1:5000/explore/channel/')) {
        // check to see if the route contains post
        let channel_name = url.split('http://127.0.0.1:5000/explore/channel/').pop();
        channel_name = channel_name.split('/post');
        channel_name = channel_name[0];
        console.log(channel_name);
        if (url == `http://127.0.0.1:5000/explore/channel/${channel_name}/posts`) {
            console.log('The user wants to access the the posts of a channel');
            let nav_source = document.querySelector('#explore-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            let mainNav = document.getElementById('js-menu');
            let navBarToggle = document.getElementById('js-navbar-toggle');
            // creating the active class on the navbar
            navBarToggle.addEventListener('click', function (event) {
                mainNav.classList.toggle('active');
            });
            channel_load_posts(channel_name);

        }
        else if (url.includes(`http://127.0.0.1:5000/explore/channel/${channel_name}/posts/`)) {
            console.log('The user wants to see and individual post');
            let post_title = url.split(`http://127.0.0.1:5000/explore/channel/${channel_name}/posts/`).pop();
            console.log(post_title);
            post_title = post_title.replace(/%20/g, " ");
            console.log(post_title);
            load_indvidual_post(channel_name = channel_name, first_load = true, post_title = post_title);

        }
        else {
            console.log('This should print out in the console');
            let nav_source = document.querySelector('#explore-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            let mainNav = document.getElementById('js-menu');
            let navBarToggle = document.getElementById('js-navbar-toggle');
            // creating the active class on the navbar
            navBarToggle.addEventListener('click', function (event) {
                mainNav.classList.toggle('active');
            });
            channel_name = url.split('http://127.0.0.1:5000/explore/channel/').pop();
            load_channel(channel_name);
        }
    }
    else if (url == "http://127.0.0.1:5000/explore") {
        if (localStorage.getItem('login') == 'true') {
            explore_load(first_load = true);
            form_controll('explore');
        }
    }
    else if (url == "http://127.0.0.1:5000/explore/create-new-channel") {
        let nav_source = document.querySelector('#explore-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });
        load_template('create-channel-template');
        let destination = document.querySelector('.page-container');
        history.replaceState(destination.innerHTML, 'explore/create-new-channel', 'explore/create-new-channel');
    }
    else {
        console.log('The else portion has this');
        let partial_url = url.split('http://127.0.0.1:5000/').pop();
        console.log(partial_url);
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
        let source = document.querySelector(`#${partial_url}-template`).innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');

        });
        form_controll('explore');

    }
}

// loading the forms
function linking_logic() {
    console.log('The linking function has been called');
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
                    form_controll('explore');
                }
                else {
                    if (`${form_name}-template` == 'explore-template') {
                        if (localStorage.getItem('login') != 'true') {
                            console.log("You can't access this link yet you need to login first");
                            let source = document.querySelector('#login-template').innerHTML;
                            let destination = document.querySelector('.page-container');
                            destination.innerHTML = source;
                            history.pushState(destination.innerHTML, 'login', 'login');
                            form_controll(redirect = 'explore');
                        }
                        else if (localStorage.getItem('login') == 'true') {
                            console.log('You will have access to this page');
                            explore_load();
                            form_controll('explore');
                        }
                    }
                    else if (form_name.includes('explore/channel/')) {
                        //let request = new XMLHttpRequest();
                        let channel_name = form_name.split('explore/channel/').pop();
                        console.log('THe channel_name is ');
                        console.log(channel_name);
                        load_channel(channel_name);
                    } else {
                        let source = document.querySelector(`#${form_name}-template`).innerHTML;
                        let destination = document.querySelector('.page-container');
                        destination.innerHTML = source;
                        data = document.querySelector('.page-container').innerHTML;
                        history.pushState(data, new_path, new_path);
                        form_controll('explore');
                    }

                };
            };

        };

    });
};

function form_controll(redirect = null, channel_name = null, posts = null, individual_post_title = null) {
    console.log('The form function has been called');
    const url = window.location.href;
    const form_name = url.split('http://127.0.0.1:5000/').pop();
    console.log('The name of the form is');
    console.log(form_name)
    submit_button = document.querySelector('.form_submit');
    form = document.querySelector('.form');
    console.log(form);
    if (form != null) {
        console.log('There is a form on the page');
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
                        localStorage.setItem('login', true);
                        explore_load();
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
                console.log('an ajax call to th login function is being sent');
                request.open('post', '/login');

                request.onload = () => {
                    data = JSON.parse(request.responseText);
                    if (data.success) {
                        localStorage.setItem('login', true);
                        console.log('The server has sent back data from the login function');
                        if (redirect != null) {
                            if (redirect == 'explore') {
                                // call the explore load function
                                explore_load();
                                //let source = document.querySelector('#explore-template').innerHTML;
                                //let destination = document.querySelector('.page-container');
                                //destination.innerHTML = source;nav
                                //history.pushState(destination.innerHTML, 'explore', 'explore');
                            }
                            else if (redirect == 'explore-channel') {
                                console.log('The user wants to access a channel');
                                if (channel_name != null && posts == 'load') {
                                    console.log('we are going to load the channel and its posts');
                                    let nav_source = document.querySelector('#explore-nav-template').innerHTML;
                                    let nav_destination = document.querySelector('nav');
                                    nav_destination.innerHTML = nav_source;
                                    let mainNav = document.getElementById('js-menu');
                                    let navBarToggle = document.getElementById('js-navbar-toggle');
                                    // creating the active class on the navbar
                                    navBarToggle.addEventListener('click', function (event) {
                                        mainNav.classList.toggle('active');
                                    });

                                    channel_load_posts(channel_name);
                                }
                                else if (channel_name != null) {
                                    load_channel(channel_name);
                                }

                            }
                            else if (redirect == 'individual-post' && individual_post_title != null) {
                                console.log("The user want's an individual");
                                // call the load individidual_post
                                load_indvidual_post(channel_name, first_load = true, post_title = individual_post_title);
                            }
                            else if (redirect == 'create-new-channel') {
                                console.log('loading the create new channel');
                                load_template('create-channel-template');
                                let destination = document.querySelector('.page-container');
                                history.pushState(destination.innerHTML, 'explore/create-new-channel', 'explore/create-new-channel');

                            }

                        }


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
                console.log('a post request has been opened for /logout');
                let submit_data = new FormData();
                submit_data.append('logout', 'I want to logout');
                localStorage.setItem('login', false);
                request.send(submit_data);
                console.log('The post request for logout has been fully sent');
                location.reload();

            }

            else if (form_name == 'explore') {
                if (localStorage.getItem('login') != 'true') {
                    console.log('You must login first')
                    let source = document.querySelector('#login-template').innerHTML;
                    let destination = document.querySelectorAll('.page-container');
                    destination.innerHTML = source;
                    history.pushState(destination.innerHTML, 'login', 'login');


                }
                else if (localStorage.getItem('login') == 'true') {
                    let source = document.querySelector('#home-template').innerHTML;
                    let destination = document.querySelector('.page-container');
                    destination.innerHTML = source;
                    console.log('welcome to the home page route');
                    history.pushState(destination.innerHTML, 'explore', 'explore');

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

function login_redirect(route_name) {
    if (route_name == 'explore') {
        let nav_source = document.querySelector()
    }
}

function load_channel(channel_name) {
    let nav_source = document.querySelector('#explore-nav-template').innerHTML;
    let nav_destination = document.querySelector('nav');
    nav_destination.innerHTML = nav_source;
    let mainNav = document.getElementById('js-menu');
    let navBarToggle = document.getElementById('js-navbar-toggle');
    // creating the active class on the navbar
    navBarToggle.addEventListener('click', function (event) {
        mainNav.classList.toggle('active');
    });
    console.log('About to select the user profile pic');
    let user_profile = document.querySelector('.user-profile-pic');
    console.log(user_profile);
    user_profile.onclick = () => {
        console.log('The user profile has been clickedd');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = "250px";
    }

    let close_btn = document.querySelector('.closebtn');
    close_btn.onclick = () => {
        console.log('The close button has been clicked');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = '0px';
    }
    let request = new XMLHttpRequest();
    request.open('post', `/explore/channel/${channel_name}`);
    request.onload = () => {
        console.log('The channel info ajax call has been sent');
        let data = JSON.parse(request.responseText);

        if (data.success) {
            console.log('The channel exists');
            let channel = data.channel_name;
            console.log(channel);
            let about = data.about;
            console.log(about);
            let num_users = data.num_users;
            console.log(num_users);
            //grab the source
            let source = document.querySelector('#explore-channel-template').innerHTML;
            // compile the source

            let template = Handlebars.compile(source);

            let context = {
                channel_name: channel,
                about: about,
                num_users: num_users,
            }

            let html = template(context);

            let destination = document.querySelector('.page-container');

            destination.innerHTML = html;

            if (data.joined) {
                let btn = document.querySelector('.channel-info-btn');
                btn.classList.toggle('joined');
                btn.innerHTML = "Leave";
            }
            else {
                let btn = document.querySelector('.channel-info-btn');
                btn.classList.toggle('not-joined');
                btn.innerHTML = "Join"
            }

            history.pushState(destination.innerHTML, `/explore/channel/${channel_name}`, `/explore/channel/${channel_name}`)
            channel_load_posts(channel_name, true);
        }
        else {
            console.log('There were some errors');
            console.log('This is rurnning from the load-channel route');
            console.log("The channel doesn't exist");
            let source = document.querySelector('#explore-channel-error-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            console.log('It is finished');
            history.pushState(destination.innerHTML, `explore/channel${channel_name}`, `/explore/channel/${channel_name}`);

        }
    }

    let submit_data = new FormData();
    submit_data.append('channel_name', channel_name);
    request.send(submit_data);
}


function explore_load(first_load = null) {
    console.log('The explore function is running');
    console.log('This is loading the first page');
    // set up the navBar
    let nav_source = document.querySelector('#explore-nav-template').innerHTML;
    let nav_destination = document.querySelector('nav');
    nav_destination.innerHTML = nav_source;
    // set up the basic html
    let source = document.querySelector('#explore-template').innerHTML;
    let destination = document.querySelector('.page-container');
    destination.innerHTML = source;
    let mainNav = document.getElementById('js-menu');
    let navBarToggle = document.getElementById('js-navbar-toggle');
    // creating the active class on the navbar
    navBarToggle.addEventListener('click', function (event) {
        mainNav.classList.toggle('active');

    });

    console.log('About to select the user profile pic');
    let user_profile = document.querySelector('.user-profile-pic');
    console.log(user_profile);
    user_profile.onclick = () => {
        console.log('The user profile has been clickedd');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = "250px";
    }

    let close_btn = document.querySelector('.closebtn');
    close_btn.onclick = () => {
        console.log('The close button has been clicked');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = '0px';
    }
    // make the ajax call
    const request = new XMLHttpRequest();
    request.open('post', '/explore');
    request.onload = () => {
        console.log('This is should be running');
        console.log(request.responseText);

        let data = JSON.parse(request.responseText);
        console.log('The explore ajax call is running')
        if (data.success) {
            console.log('we are getting the channels');
            let channels = data.channels;
            let channel_list = document.querySelector('.channel-list');

            let length = channels.length;
            for (let i = 0; i < length; i++) {
                let li = document.createElement('li');
                li.classList.add('channel_element');
                let a = document.createElement('a');
                a.href = `/explore/channel/${channels[i]}`
                //li.append(channels[i]);
                a.append(channels[i]);
                console.log(li);
                console.log(channel_list);
                li.append(a);
                channel_list.append(li);
            }
            if (first_load != null) {
                console.log('This is the first load');
                history.replaceState(destination.innerHTML, 'explore', 'explore');
            }
            else {
                history.pushState(destination.innerHTML, 'explore', 'explore');
            }
        }
        else {
            console.log('The server was unable to find the channels');
        }
    }
    let submit_data = new FormData();
    submit_data.append('i want data', 'give me data');
    request.send(submit_data);

}

function channel_load_posts(channel_name, load_from_channel_page = null) {

    console.log('The channel load posts function is running');
    console.log('About to select the user profile pic');
    let user_profile = document.querySelector('.user-profile-pic');
    console.log(user_profile);
    user_profile.onclick = () => {
        console.log('The user profile has been clickedd');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = "250px";
    }

    let close_btn = document.querySelector('.closebtn');
    close_btn.onclick = () => {
        console.log('The close button has been clicked');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = '0px';
    }

    if (load_from_channel_page != null) {
        //select the channel title and load posts if user click on it
        let channel_title = document.querySelector('.channel_name');
        //when the user clicks on the title of the channel
        channel_title.onclick = () => {
            // run the post ajax call
            // create the ajax post
            const request = new XMLHttpRequest();
            request.open('post', `/explore/channel/${channel_name}/posts`);

            request.onload = () => {
                console.log('The response has been received');
                let data = JSON.parse(request.responseText);

                if (data.success) {
                    console.log('The ajax call for the posts has been successful');
                    // select the source handlebars template
                    let source = document.querySelector('#explore-channel-posts-template').innerHTML;
                    let destination = document.querySelector('.page-container');
                    destination.innerHTML = source;

                    let all_posts_container = document.querySelector('.channel-post-container');
                    // get access to the posts
                    let posts_list = data.posts;
                    let length = posts_list.length;
                    for (let i = 0; i < length; i++) {
                        // create the post container
                        post_container = document.createElement('div');
                        post_container.classList.toggle('post-container');
                        // get the data from the ajax call
                        let username = posts_list[i]['username'];
                        let title = posts_list[i]['title'];
                        let post_content = posts_list[i]['post_content'];
                        let num_likes = posts_list[i]['num_likes'];
                        let num_comments = posts_list[i]['num_comments'];
                        if (num_comments != null) {
                            console.log(num_comments);
                        }
                        else if (num_comments == null) {
                            num_comments = 0;
                            console.log(num_comments);
                        }

                        // create the username span tag
                        let username_container = document.createElement('span');
                        username_container.classList.toggle('creater');
                        username_container.innerHTML = username;

                        // create the title h3 tag
                        let title_container = document.createElement('h3');
                        title_container.classList.toggle('title');
                        title_container.innerHTML = title;

                        // create the num likes p tag
                        let post_content_container = document.createElement('p');
                        post_content_container.classList.toggle('post-content');
                        post_content_container.innerHTML = post_content;

                        // create the num likes span
                        let num_likes_container = document.createElement('span');
                        num_likes_container.classList.toggle('num_likes');
                        num_likes_container.innerHTML = `Likes ${num_likes}`;

                        //create the num comments span
                        let num_comments_container = document.createElement('span');
                        num_comments_container.classList.toggle('num_comments');
                        num_comments_container.innerHTML = `Comments ${num_comments}`

                        // append the data containers to the post container;
                        post_container.append(title_container);
                        post_container.append(post_content_container);
                        post_container.append(num_likes_container);
                        post_container.append(username_container);
                        post_container.append(num_comments_container);

                        all_posts_container.append(post_container);
                    }
                    // set the source template to be displayed in the main page container
                    // push a new state to the history api
                    console.log(channel_name);
                    history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts`, `/explore/channel/${channel_name}/posts`);
                    load_indvidual_post(channel_name);
                }
                else {
                    console.log('There were some errors retrieving the posts');
                }
            }
            request.send();
        }
    }
    else {
        const request = new XMLHttpRequest();
        request.open('post', `/explore/channel/${channel_name}/posts`);

        request.onload = () => {
            console.log('The response has been received');
            let data = JSON.parse(request.responseText);

            if (data.success) {
                console.log('The ajax call for the posts has been successful');
                // select the source handlebars template
                let source = document.querySelector('#explore-channel-posts-template').innerHTML;
                let destination = document.querySelector('.page-container');
                destination.innerHTML = source;

                let all_posts_container = document.querySelector('.channel-post-container');
                // get access to the posts
                let posts_list = data.posts;
                let length = posts_list.length;
                for (let i = 0; i < length; i++) {
                    // create the post container
                    post_container = document.createElement('div');
                    post_container.classList.toggle('post-container');
                    // get the data from the ajax call
                    let username = posts_list[i]['username'];
                    let title = posts_list[i]['title'];
                    let post_content = posts_list[i]['post_content'];
                    let num_likes = posts_list[i]['num_likes'];
                    let num_comments = posts_list[i]['num_comments'];
                    if (num_comments != null) {
                        console.log(num_comments);
                    }
                    else if (num_comments == null) {
                        num_comments = 0;
                        console.log(num_comments);
                    }

                    // create the username span tag
                    let username_container = document.createElement('span');
                    username_container.classList.toggle('creater');
                    username_container.innerHTML = username;

                    // create the title h3 tag
                    let title_container = document.createElement('h3');
                    title_container.classList.toggle('title');
                    title_container.innerHTML = title;

                    // create the num likes p tag
                    let post_content_container = document.createElement('p');
                    post_content_container.classList.toggle('post-content');
                    post_content_container.innerHTML = post_content;

                    // create the num likes span
                    let num_likes_container = document.createElement('span');
                    num_likes_container.classList.toggle('num_likes');
                    num_likes_container.innerHTML = `Likes ${num_likes}`;

                    //create the num comments span
                    let num_comments_container = document.createElement('span');
                    num_comments_container.classList.toggle('num_comments');
                    num_comments_container.innerHTML = `Comments ${num_comments}`

                    // append the data containers to the post container;
                    post_container.append(title_container);
                    post_container.append(post_content_container);
                    post_container.append(num_likes_container);
                    post_container.append(username_container);
                    post_container.append(num_comments_container);

                    all_posts_container.append(post_container);
                }
                // set the source template to be displayed in the main page container
                // push a new state to the history api
                console.log(channel_name);

                history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts`, `/explore/channel/${channel_name}/posts`);
                load_indvidual_post(channel_name);
            }
            else {
                console.log('There were some errors retrieving the posts');
            }
        }
        request.send();
    }
}

function load_indvidual_post(channel_name, first_load = null, post_title = null) {
    if (first_load == true) {
        let nav_source = document.querySelector('#explore-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });
        // cleanse the post_title text
        //
        //if (post_title_text.includes('%2525')) {
        //    post_title_text = post_title.replace(/%2525/g, " ");
       // }
        //else if (post_title.text.includes('%20')) {
            //post_title_text = post_title.replace(/%2525/g, " ");
        //}
        //else if (post_title.text.includes('%20%')) {
            //post_title_text = post_title.replace(/%2525/g, " ");
          //  post_title_text = post_title.replace(/%/g, " ");
        //}

        // load the post
        const request = new XMLHttpRequest();

        request.open('post', `/explore/channel/${channel_name}/posts/${post_title}`);

        request.onload = () => {
            console.log('The ajax call has been answered');

            let data = JSON.parse(request.responseText);

            if (data.success) {
                console.log('The call was successfull');
                let comment_list = data.comments;
                let post_data = data.post_data;

                let length = comment_list.length;

                let source = document.querySelector('#individual-post-template').innerHTML;

                let destination = document.querySelector('.page-container');

                let template = Handlebars.compile(source);

                // get the post data from the ajax call
                let post_username = post_data['username'];
                let ajax_post_title = post_data['title'];
                let post_content = post_data['post_content'];
                let post_num_comments = post_data['num_comments'];
                let post_num_likes = post_data['num_likes'];

                // create the context

                let context = {
                    creator: post_username,
                    post_title: ajax_post_title,
                    post_content: post_content,
                    num_likes: post_num_likes,
                    num_comments: post_num_comments,

                }

                let html = template(context);

                destination.innerHTML = html;

                console.log("I am about to print the post data");
                console.log(post_data)

                // select the comments div to put the comments in
                let full_comments_container = document.querySelector('.comments-container');
                //loop for the
                for (let i = 0; i < length; i++) {
                    console.log(comment_list[i]['username'])
                    console.log(comment_list[i]['comment'])
                    let username = comment_list[i]['username']
                    let comment = comment_list[i]['comment']

                    //create the comment container
                    let single_comment_container = document.createElement('div');
                    single_comment_container.classList.add('single-comment-container')

                    // create the p to store the comment
                    let comment_p_tag = document.createElement('p');
                    comment_p_tag.innerHTML = comment;

                    // create the span to store the username
                    let username_span_tag = document.createElement('span');
                    username_span_tag.innerHTML = username;

                    single_comment_container.append(comment_p_tag);
                    single_comment_container.append(username_span_tag);

                    full_comments_container.append(single_comment_container);
                }
                //post_title_text = post_title_text.replace(/ /g, "%");
                //console.log(post_title_text)
                //push a new history
                history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts/${ajax_post_title}`, `/explore/channel/${channel_name}/posts/${ajax_post_title}`);

            }
            else {
                console.log('There were some errors');
            }

        };
        // send the request
        request.send();
    }
    else {
        let post_title = document.querySelector('.title');
        post_title_text = post_title.innerHTML

        post_title.onclick = () => {
            console.log('The post has been clicked about to load the post');

            const request = new XMLHttpRequest();

            request.open('post', `/explore/channel/${channel_name}/posts/${post_title_text}`);

            request.onload = () => {
                console.log('The ajax call has been answered');

                let data = JSON.parse(request.responseText);

                if (data.success) {
                    console.log('The call was successfull');
                    let comment_list = data.comments;
                    let post_data = data.post_data;

                    let length = comment_list.length;

                    let source = document.querySelector('#individual-post-template').innerHTML;

                    let destination = document.querySelector('.page-container');

                    let template = Handlebars.compile(source);

                    // get the post data from the ajax call
                    let post_username = post_data['username'];
                    let ajax_post_title = post_data['title'];
                    let post_content = post_data['post_content'];
                    let post_num_comments = post_data['num_comments'];
                    let post_num_likes = post_data['num_likes'];

                    // create the context

                    let context = {
                        creator: post_username,
                        post_title: ajax_post_title,
                        post_content: post_content,
                        num_likes: post_num_likes,
                        num_comments: post_num_comments,

                    }

                    let html = template(context);

                    destination.innerHTML = html;

                    console.log("I am about to print the post data");
                    console.log(post_data)

                    // select the comments div to put the comments in
                    let full_comments_container = document.querySelector('.comments-container');
                    //loop for the
                    for (let i = 0; i < length; i++) {
                        console.log(comment_list[i]['username'])
                        console.log(comment_list[i]['comment'])
                        let username = comment_list[i]['username']
                        let comment = comment_list[i]['comment']

                        //create the comment container
                        let single_comment_container = document.createElement('div');
                        single_comment_container.classList.add('single-comment-container')

                        // create the p to store the comment
                        let comment_p_tag = document.createElement('p');
                        comment_p_tag.innerHTML = comment;

                        // create the span to store the username
                        let username_span_tag = document.createElement('span');
                        username_span_tag.innerHTML = username;

                        single_comment_container.append(comment_p_tag);
                        single_comment_container.append(username_span_tag);

                        full_comments_container.append(single_comment_container);
                    }
                    console.log(post_title_text);
                    //post_title_text = post_title_text.replace(/ /g, "%");
                    console.log(post_title_text);
                    //push a new history
                    history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts/${ajax_post_title}`, `/explore/channel/${channel_name}/posts/${ajax_post_title}`);

                }
                else {
                    console.log('There were some errors');
                }

            };
            request.send();
        }
    }
}
function load_nav(nav_name) {
    if (nav_name == 'home') {
        console.log('Loading the homepage-nav');
        // get the source html
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        // select the nav
        let nav_destination = document.querySelector('nav');
        // push the html into the nav
        destination.innerHTML = source;

        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });


    }
    else if (nav_name == 'explore') {
        console.log('loading the explore nav');
        // get the html source code
        let nav_source = document.querySelector('#explore-nav-template');
        // select the nav
        let nav_destination = document.querySelector('nav');
        // push the html into the nav
        nav_destination.innerHTML = source;

        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });

        // set up the user profile side nav

        let user_profile = document.querySelector('.user-profile-pic');
        console.log(user_profile);
        user_profile.onclick = () => {
            console.log('The user profile has been clickedd');
            let side_nav = document.querySelector('#mySidenav');
            side_nav.style.width = "250px";
        }

        let close_btn = document.querySelector('.closebtn');
        close_btn.onclick = () => {
            console.log('The close button has been clicked');
            let side_nav = document.querySelector('#mySidenav');
            side_nav.style.width = '0px';
        }
    }

}
function load_template(template_name) {
    let nav_source = document.querySelector('#explore-nav-template').innerHTML;
    let nav_destination = document.querySelector('nav');

    nav_destination.innerHTML = nav_source;

    let mainNav = document.getElementById('js-menu');
    let navBarToggle = document.getElementById('js-navbar-toggle');
    // creating the active class on the navbar
    navBarToggle.addEventListener('click', function (event) {
        mainNav.classList.toggle('active');
    });
    console.log(template_name);
    let source = document.querySelector(`#${template_name}`).innerHTML;

    let destination = document.querySelector('.page-container');
    destination.innerHTML = source;
}
// for the history api. Getting the back button to work
window.onpopstate = (event) => {
    console.log('The window pop state has been fired');
    page = document.querySelector('.page-container');
    console.log('The event state data');
    console.log(event.state);
    page.innerHTML = event.state;
}


*/






/*
function load_first_page() {
    let url = window.location.href;
    console.log(`The url right now is ${url}`)
    if (url.includes('logout')) {
        let new_url = 'http://127.0.0.1:5000/'
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
        let source = document.querySelector('#homepage-template').innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        history.replaceState(document.querySelector('.page-container').innerHTML, '', new_url);
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });

    }
    else if (url === 'http://127.0.0.1:5000/') {
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
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
    else if (url == "http://127.0.0.1:5000/login?next=%2Fexplore") {
        // redirect the user to the login form
        // set the nav
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;

        // grab the login form
        let source = document.querySelector('#login-template').innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        history.replaceState(destination.innerHTML, 'login', 'login');
        form_controll('explore');
    }
    else if (url.includes('http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F')) {
        //redirect the user to the login route

        let data_string = url.split('http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F').pop();

        let data_list = data_string.split('%2Fposts');
        let unclean_post_title = data_list[1];
        console.log(unclean_post_title);
        let channel_name = data_list[0];
        console.log(channel_name)

        if (unclean_post_title != null && unclean_post_title != '%2Fposts' && unclean_post_title != "") {
            console.log('the individual post has been selected');
            // get the post title
            let post_title = unclean_post_title.split('%2F').pop();
            // cleanse the post title
            let cleansed_post_title = post_title.replace(/%2525/g, " ");

            let source = document.querySelector('#login-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            history.replaceState(destination.innerHTML, 'login', 'login');
            console.log(channel_name)
            console.log(cleansed_post_title);
            // call the form_controll
            form_controll(redirect = 'individual-post', channel_name = channel_name, oosts = null, individual_post_title = cleansed_post_title);
        }

        else if (url == `http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F${channel_name}%2Fposts`) {
            console.log('The user is trying to access the posts for a channel without being logged in');
            //set the navbar
            let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            // display the login form
            let source = document.querySelector('#login-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            history.replaceState(destination.innerHTML, 'login', 'login');
            form_controll('explore-channel', channel_name, 'load');
        }
        else {
            let channel_name = url.split('http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F').pop();
            //set the navbar
            let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            // display the login form
            let source = document.querySelector('#login-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            history.replaceState(destination.innerHTML, 'login', 'login');
            form_controll('explore-channel', channel_name);
        }

    }
    else if (url.includes('http://127.0.0.1:5000/explore/channel/')) {
        // check to see if the route contains post
        let channel_name = url.split('http://127.0.0.1:5000/explore/channel/').pop();
        channel_name = channel_name.split('/post');
        channel_name = channel_name[0];
        console.log(channel_name);
        if (url == `http://127.0.0.1:5000/explore/channel/${channel_name}/posts`) {
            console.log('The user wants to access the the posts of a channel');
            let nav_source = document.querySelector('#explore-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            let mainNav = document.getElementById('js-menu');
            let navBarToggle = document.getElementById('js-navbar-toggle');
            // creating the active class on the navbar
            navBarToggle.addEventListener('click', function (event) {
                mainNav.classList.toggle('active');
            });
            channel_load_posts(channel_name);

        }
        else if (url.includes(`http://127.0.0.1:5000/explore/channel/${channel_name}/posts/`)) {
            console.log('The user wants to see and individual post');
            let post_title = url.split(`http://127.0.0.1:5000/explore/channel/${channel_name}/posts/`).pop();
            console.log(post_title);
            post_title = post_title.replace(/%20/g, " ");
            console.log(post_title);
            load_indvidual_post(channel_name = channel_name, firs_load = true, post_title = post_title);
        }
        else {
            console.log('This should print out in the console');
            let nav_source = document.querySelector('#explore-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            let mainNav = document.getElementById('js-menu');
            let navBarToggle = document.getElementById('js-navbar-toggle');
            // creating the active class on the navbar
            navBarToggle.addEventListener('click', function (event) {
                mainNav.classList.toggle('active');
            });
            channel_name = url.split('http://127.0.0.1:5000/explore/channel/').pop();
            load_channel(channel_name);
        }
    }
    else if (url == "http://127.0.0.1:5000/explore") {
        if (localStorage.getItem('login') == 'true') {
            explore_load(first_load = true);
            form_controll('explore');
        }
    }
    else {
        let partial_url = url.split('http://127.0.0.1:5000/').pop();
        console.log(partial_url);
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
        let source = document.querySelector(`#${partial_url}-template`).innerHTML;
        let destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');

        });
        form_controll('explore');

    }
}

// loading the forms
function linking_logic() {
    console.log('The linking function has been called');
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
                    form_controll('explore');
                }
                else {
                    if (`${form_name}-template` == 'explore-template') {
                        if (localStorage.getItem('login') != 'true') {
                            console.log("You can't access this link yet you need to login first");
                            let source = document.querySelector('#login-template').innerHTML;
                            let destination = document.querySelector('.page-container');
                            destination.innerHTML = source;
                            history.pushState(destination.innerHTML, 'login', 'login');
                            form_controll(redirect = 'explore');
                        }
                        else if (localStorage.getItem('login') == 'true') {
                            console.log('You will have access to this page');
                            explore_load();
                            form_controll('explore');
                        }
                    }
                    else if (form_name.includes('explore/channel/')) {
                        //let request = new XMLHttpRequest();
                        let channel_name = form_name.split('explore/channel/').pop();
                        console.log('THe channel_name is ');
                        console.log(channel_name);
                        load_channel(channel_name);
                    } else {
                        let source = document.querySelector(`#${form_name}-template`).innerHTML;
                        let destination = document.querySelector('.page-container');
                        destination.innerHTML = source;
                        data = document.querySelector('.page-container').innerHTML;
                        history.pushState(data, new_path, new_path);
                        form_controll('explore');
                    }

                };
            };

        };

    });
};

function form_controll(redirect = null, channel_name = null, posts = null, individual_post_title = null) {
    console.log('The form function has been called');
    const url = window.location.href;
    const form_name = url.split('http://127.0.0.1:5000/').pop();
    console.log('The name of the form is');
    console.log(form_name)
    submit_button = document.querySelector('.form_submit');
    form = document.querySelector('.form');
    console.log(form);
    if (form != null) {
        console.log('There is a form on the page');
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
                        localStorage.setItem('login', true);
                        explore_load();
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
                console.log('an ajax call to th login function is being sent');
                request.open('post', '/login');

                request.onload = () => {
                    data = JSON.parse(request.responseText);
                    if (data.success) {
                        localStorage.setItem('login', true);
                        console.log('The server has sent back data from the login function');
                        if (redirect != null) {
                            if (redirect == 'explore') {
                                // call the explore load function
                                explore_load();
                                //let source = document.querySelector('#explore-template').innerHTML;
                                //let destination = document.querySelector('.page-container');
                                //destination.innerHTML = source;nav
                                //history.pushState(destination.innerHTML, 'explore', 'explore');
                            }
                            else if (redirect == 'explore-channel') {
                                console.log('The user wants to access a channel');
                                if (channel_name != null && posts == 'load') {
                                    console.log('we are going to load the channel and its posts');
                                    let nav_source = document.querySelector('#explore-nav-template').innerHTML;
                                    let nav_destination = document.querySelector('nav');
                                    nav_destination.innerHTML = nav_source;
                                    let mainNav = document.getElementById('js-menu');
                                    let navBarToggle = document.getElementById('js-navbar-toggle');
                                    // creating the active class on the navbar
                                    navBarToggle.addEventListener('click', function (event) {
                                        mainNav.classList.toggle('active');
                                    });

                                    channel_load_posts(channel_name);
                                }
                                else if (channel_name != null) {
                                    load_channel(channel_name);
                                }

                            }
                            else if (redirect == 'individual-post' && individual_post_title != null) {
                                console.log("The user want's an individual");
                                // call the load individidual_post
                                load_indvidual_post(channel_name, first_load = true, post_title = individual_post_title);
                            }

                        }


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
                console.log('a post request has been opened for /logout');
                let submit_data = new FormData();
                submit_data.append('logout', 'I want to logout');
                localStorage.setItem('login', false);
                request.send(submit_data);
                console.log('The post request for logout has been fully sent');
                location.reload();

            }

            else if (form_name == 'explore') {
                if (localStorage.getItem('login') != 'true') {
                    console.log('You must login first')
                    let source = document.querySelector('#login-template').innerHTML;
                    let destination = document.querySelectorAll('.page-container');
                    destination.innerHTML = source;
                    history.pushState(destination.innerHTML, 'login', 'login');


                }
                else if (localStorage.getItem('login') == 'true') {
                    let source = document.querySelector('#home-template').innerHTML;
                    let destination = document.querySelector('.page-container');
                    destination.innerHTML = source;
                    console.log('welcome to the home page route');
                    history.pushState(destination.innerHTML, 'explore', 'explore');

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

function login_redirect(route_name) {
    if (route_name == 'explore') {
        let nav_source = document.querySelector()
    }
}

function load_channel(channel_name) {
    let nav_source = document.querySelector('#explore-nav-template').innerHTML;
    let nav_destination = document.querySelector('nav');
    nav_destination.innerHTML = nav_source;
    let mainNav = document.getElementById('js-menu');
    let navBarToggle = document.getElementById('js-navbar-toggle');
    // creating the active class on the navbar
    navBarToggle.addEventListener('click', function (event) {
        mainNav.classList.toggle('active');
    });
    console.log('About to select the user profile pic');
    let user_profile = document.querySelector('.user-profile-pic');
    console.log(user_profile);
    user_profile.onclick = () => {
        console.log('The user profile has been clickedd');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = "250px";
    }

    let close_btn = document.querySelector('.closebtn');
    close_btn.onclick = () => {
        console.log('The close button has been clicked');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = '0px';
    }
    let request = new XMLHttpRequest();
    request.open('post', `/explore/channel/${channel_name}`);
    request.onload = () => {
        console.log('The channel info ajax call has been sent');
        let data = JSON.parse(request.responseText);

        if (data.success) {
            console.log('The channel exists');
            let channel = data.channel_name;
            console.log(channel);
            let about = data.about;
            console.log(about);
            let num_users = data.num_users;
            console.log(num_users);
            //grab the source
            let source = document.querySelector('#explore-channel-template').innerHTML;
            // compile the source

            let template = Handlebars.compile(source);

            let context = {
                channel_name: channel,
                about: about,
                num_users: num_users,
            }

            let html = template(context);

            let destination = document.querySelector('.page-container');

            destination.innerHTML = html;

            if (data.joined) {
                let btn = document.querySelector('.channel-info-btn');
                btn.classList.toggle('joined');
                btn.innerHTML = "Leave";
            }
            else {
                let btn = document.querySelector('.channel-info-btn');
                btn.classList.toggle('not-joined');
                btn.innerHTML = "Join"
            }

            history.pushState(destination.innerHTML, `/explore/channel/${channel_name}`, `/explore/channel/${channel_name}`)
            channel_load_posts(channel_name, true);
        }
        else {
            console.log('There were some errors');
            console.log('This is rurnning from the load-channel route');
            console.log("The channel doesn't exist");
            let source = document.querySelector('#explore-channel-error-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            console.log('It is finished');
            history.pushState(destination.innerHTML, `explore/channel${channel_name}`, `/explore/channel/${channel_name}`);

        }
    }

    let submit_data = new FormData();
    submit_data.append('channel_name', channel_name);
    request.send(submit_data);
}


function explore_load(first_load = null) {
    console.log('The explore function is running');
    console.log('This is loading the first page');
    // set up the navBar
    let nav_source = document.querySelector('#explore-nav-template').innerHTML;
    let nav_destination = document.querySelector('nav');
    nav_destination.innerHTML = nav_source;
    // set up the basic html
    let source = document.querySelector('#explore-template').innerHTML;
    let destination = document.querySelector('.page-container');
    destination.innerHTML = source;
    let mainNav = document.getElementById('js-menu');
    let navBarToggle = document.getElementById('js-navbar-toggle');
    // creating the active class on the navbar
    navBarToggle.addEventListener('click', function (event) {
        mainNav.classList.toggle('active');

    });

    console.log('About to select the user profile pic');
    let user_profile = document.querySelector('.user-profile-pic');
    console.log(user_profile);
    user_profile.onclick = () => {
        console.log('The user profile has been clickedd');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = "250px";
    }

    let close_btn = document.querySelector('.closebtn');
    close_btn.onclick = () => {
        console.log('The close button has been clicked');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = '0px';
    }
    // make the ajax call
    const request = new XMLHttpRequest();
    request.open('post', '/explore');
    request.onload = () => {
        console.log('This is should be running');
        console.log(request.responseText);

        let data = JSON.parse(request.responseText);
        console.log('The explore ajax call is running')
        if (data.success) {
            console.log('we are getting the channels');
            let channels = data.channels;
            let channel_list = document.querySelector('.channel-list');

            let length = channels.length;
            for (let i = 0; i < length; i++) {
                let li = document.createElement('li');
                li.classList.add('channel_element');
                let a = document.createElement('a');
                a.href = `/explore/channel/${channels[i]}`
                //li.append(channels[i]);
                a.append(channels[i]);
                console.log(li);
                console.log(channel_list);
                li.append(a);
                channel_list.append(li);
            }
            if (first_load != null) {
                console.log('This is the first load');
                history.replaceState(destination.innerHTML, 'explore', 'explore');
            }
            else {
                history.pushState(destination.innerHTML, 'explore', 'explore');
            }
        }
        else {
            console.log('The server was unable to find the channels');
        }
    }
    let submit_data = new FormData();
    submit_data.append('i want data', 'give me data');
    request.send(submit_data);

}

function channel_load_posts(channel_name, load_from_channel_page = null) {

    console.log('The channel load posts function is running');
    console.log('About to select the user profile pic');
    let user_profile = document.querySelector('.user-profile-pic');
    console.log(user_profile);
    user_profile.onclick = () => {
        console.log('The user profile has been clickedd');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = "250px";
    }

    let close_btn = document.querySelector('.closebtn');
    close_btn.onclick = () => {
        console.log('The close button has been clicked');
        let side_nav = document.querySelector('#mySidenav');
        side_nav.style.width = '0px';
    }

    if (load_from_channel_page != null) {
        //select the channel title and load posts if user click on it
        let channel_title = document.querySelector('.channel_name');
        //when the user clicks on the title of the channel
        channel_title.onclick = () => {
            // run the post ajax call
            // create the ajax post
            const request = new XMLHttpRequest();
            request.open('post', `/explore/channel/${channel_name}/posts`);

            request.onload = () => {
                console.log('The response has been received');
                let data = JSON.parse(request.responseText);

                if (data.success) {
                    console.log('The ajax call for the posts has been successful');
                    // select the source handlebars template
                    let source = document.querySelector('#explore-channel-posts-template').innerHTML;
                    let destination = document.querySelector('.page-container');
                    destination.innerHTML = source;

                    let all_posts_container = document.querySelector('.channel-post-container');
                    // get access to the posts
                    let posts_list = data.posts;
                    let length = posts_list.length;
                    for (let i = 0; i < length; i++) {
                        // create the post container
                        post_container = document.createElement('div');
                        post_container.classList.toggle('post-container');
                        // get the data from the ajax call
                        let username = posts_list[i]['username'];
                        let title = posts_list[i]['title'];
                        let post_content = posts_list[i]['post_content'];
                        let num_likes = posts_list[i]['num_likes'];
                        let num_comments = posts_list[i]['num_comments'];
                        if (num_comments != null) {
                            console.log(num_comments);
                        }
                        else if (num_comments == null) {
                            num_comments = 0;
                            console.log(num_comments);
                        }

                        // create the username span tag
                        let username_container = document.createElement('span');
                        username_container.classList.toggle('creater');
                        username_container.innerHTML = username;

                        // create the title h3 tag
                        let title_container = document.createElement('h3');
                        title_container.classList.toggle('title');
                        title_container.innerHTML = title;

                        // create the num likes p tag
                        let post_content_container = document.createElement('p');
                        post_content_container.classList.toggle('post-content');
                        post_content_container.innerHTML = post_content;

                        // create the num likes span
                        let num_likes_container = document.createElement('span');
                        num_likes_container.classList.toggle('num_likes');
                        num_likes_container.innerHTML = `Likes ${num_likes}`;

                        //create the num comments span
                        let num_comments_container = document.createElement('span');
                        num_comments_container.classList.toggle('num_comments');
                        num_comments_container.innerHTML = `Comments ${num_comments}`

                        // append the data containers to the post container;
                        post_container.append(title_container);
                        post_container.append(post_content_container);
                        post_container.append(num_likes_container);
                        post_container.append(username_container);
                        post_container.append(num_comments_container);

                        all_posts_container.append(post_container);
                    }
                    // set the source template to be displayed in the main page container
                    // push a new state to the history api
                    console.log(channel_name);
                    history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts`, `/explore/channel/${channel_name}/posts`);
                    load_indvidual_post(channel_name);
                }
                else {
                    console.log('There were some errors retrieving the posts');
                }
            }
            request.send();
        }
    }
    else {
        const request = new XMLHttpRequest();
        request.open('post', `/explore/channel/${channel_name}/posts`);

        request.onload = () => {
            console.log('The response has been received');
            let data = JSON.parse(request.responseText);

            if (data.success) {
                console.log('The ajax call for the posts has been successful');
                // select the source handlebars template
                let source = document.querySelector('#explore-channel-posts-template').innerHTML;
                let destination = document.querySelector('.page-container');
                destination.innerHTML = source;

                let all_posts_container = document.querySelector('.channel-post-container');
                // get access to the posts
                let posts_list = data.posts;
                let length = posts_list.length;
                for (let i = 0; i < length; i++) {
                    // create the post container
                    post_container = document.createElement('div');
                    post_container.classList.toggle('post-container');
                    // get the data from the ajax call
                    let username = posts_list[i]['username'];
                    let title = posts_list[i]['title'];
                    let post_content = posts_list[i]['post_content'];
                    let num_likes = posts_list[i]['num_likes'];
                    let num_comments = posts_list[i]['num_comments'];
                    if (num_comments != null) {
                        console.log(num_comments);
                    }
                    else if (num_comments == null) {
                        num_comments = 0;
                        console.log(num_comments);
                    }

                    // create the username span tag
                    let username_container = document.createElement('span');
                    username_container.classList.toggle('creater');
                    username_container.innerHTML = username;

                    // create the title h3 tag
                    let title_container = document.createElement('h3');
                    title_container.classList.toggle('title');
                    title_container.innerHTML = title;

                    // create the num likes p tag
                    let post_content_container = document.createElement('p');
                    post_content_container.classList.toggle('post-content');
                    post_content_container.innerHTML = post_content;

                    // create the num likes span
                    let num_likes_container = document.createElement('span');
                    num_likes_container.classList.toggle('num_likes');
                    num_likes_container.innerHTML = `Likes ${num_likes}`;

                    //create the num comments span
                    let num_comments_container = document.createElement('span');
                    num_comments_container.classList.toggle('num_comments');
                    num_comments_container.innerHTML = `Comments ${num_comments}`

                    // append the data containers to the post container;
                    post_container.append(title_container);
                    post_container.append(post_content_container);
                    post_container.append(num_likes_container);
                    post_container.append(username_container);
                    post_container.append(num_comments_container);

                    all_posts_container.append(post_container);
                }
                // set the source template to be displayed in the main page container
                // push a new state to the history api
                console.log(channel_name);

                history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts`, `/explore/channel/${channel_name}/posts`);
                load_indvidual_post(channel_name);
            }
            else {
                console.log('There were some errors retrieving the posts');
            }
        }
        request.send();
    }
}

function load_indvidual_post(channel_name, first_load = null, post_title = null) {
    if (first_load == true) {
        let nav_source = document.querySelector('#explore-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });
        // cleanse the post_title text
        if (post_title_text.includes('%2525')) {
            post_title_text = post_title.replace(/%2525/g, " ");
        }
        else if (post_title.text.includes('%20')) {
            post_title_text = post_title.replace(/%2525/g, " ");
        }
        else if (post_title.text.includes('%20%')) {
            //post_title_text = post_title.replace(/%2525/g, " ");
            post_title_text = post_title.replace(/%/g, " ");
        }

        // load the post
        const request = new XMLHttpRequest();

        request.open('post', `/explore/channel/${channel_name}/posts/${post_title_text}`);

        request.onload = () => {
            console.log('The ajax call has been answered');

            let data = JSON.parse(request.responseText);

            if (data.success) {
                console.log('The call was successfull');
                let comment_list = data.comments;
                let post_data = data.post_data;

                let length = comment_list.length;

                let source = document.querySelector('#individual-post-template').innerHTML;

                let destination = document.querySelector('.page-container');

                let template = Handlebars.compile(source);

                // get the post data from the ajax call
                let post_username = post_data['username'];
                let ajax_post_title = post_data['title'];
                let post_content = post_data['post_content'];
                let post_num_comments = post_data['num_comments'];
                let post_num_likes = post_data['num_likes'];

                // create the context

                let context = {
                    creator: post_username,
                    post_title: ajax_post_title,
                    post_content: post_content,
                    num_likes: post_num_likes,
                    num_comments: post_num_comments,

                }

                let html = template(context);

                destination.innerHTML = html;

                console.log("I am about to print the post data");
                console.log(post_data)

                // select the comments div to put the comments in
                let full_comments_container = document.querySelector('.comments-container');
                //loop for the
                for (let i = 0; i < length; i++) {
                    console.log(comment_list[i]['username'])
                    console.log(comment_list[i]['comment'])
                    let username = comment_list[i]['username']
                    let comment = comment_list[i]['comment']

                    //create the comment container
                    let single_comment_container = document.createElement('div');
                    single_comment_container.classList.add('single-comment-container')

                    // create the p to store the comment
                    let comment_p_tag = document.createElement('p');
                    comment_p_tag.innerHTML = comment;

                    // create the span to store the username
                    let username_span_tag = document.createElement('span');
                    username_span_tag.innerHTML = username;

                    single_comment_container.append(comment_p_tag);
                    single_comment_container.append(username_span_tag);

                    full_comments_container.append(single_comment_container);
                }
                post_title_text = post_title_text.replace(/ /g, "%");
                console.log(post_title_text)
                //push a new history
                history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts/${post_title_text}`, `/explore/channel/${channel_name}/posts/${post_title_text}`);

            }
            else {
                console.log('There were some errors');
            }

        };
        // send the request
        request.send();
    }
    else {
        let post_title = document.querySelector('.title');
        post_title_text = post_title.innerHTML

        post_title.onclick = () => {
            console.log('The post has been clicked about to load the post');

            const request = new XMLHttpRequest();

            request.open('post', `/explore/channel/${channel_name}/posts/${post_title_text}`);

            request.onload = () => {
                console.log('The ajax call has been answered');

                let data = JSON.parse(request.responseText);

                if (data.success) {
                    console.log('The call was successfull');
                    let comment_list = data.comments;
                    let post_data = data.post_data;

                    let length = comment_list.length;

                    let source = document.querySelector('#individual-post-template').innerHTML;

                    let destination = document.querySelector('.page-container');

                    let template = Handlebars.compile(source);

                    // get the post data from the ajax call
                    let post_username = post_data['username'];
                    let ajax_post_title = post_data['title'];
                    let post_content = post_data['post_content'];
                    let post_num_comments = post_data['num_comments'];
                    let post_num_likes = post_data['num_likes'];

                    // create the context

                    let context = {
                        creator: post_username,
                        post_title: ajax_post_title,
                        post_content: post_content,
                        num_likes: post_num_likes,
                        num_comments: post_num_comments,

                    }

                    let html = template(context);

                    destination.innerHTML = html;

                    console.log("I am about to print the post data");
                    console.log(post_data)

                    // select the comments div to put the comments in
                    let full_comments_container = document.querySelector('.comments-container');
                    //loop for the
                    for (let i = 0; i < length; i++) {
                        console.log(comment_list[i]['username'])
                        console.log(comment_list[i]['comment'])
                        let username = comment_list[i]['username']
                        let comment = comment_list[i]['comment']

                        //create the comment container
                        let single_comment_container = document.createElement('div');
                        single_comment_container.classList.add('single-comment-container')

                        // create the p to store the comment
                        let comment_p_tag = document.createElement('p');
                        comment_p_tag.innerHTML = comment;

                        // create the span to store the username
                        let username_span_tag = document.createElement('span');
                        username_span_tag.innerHTML = username;

                        single_comment_container.append(comment_p_tag);
                        single_comment_container.append(username_span_tag);

                        full_comments_container.append(single_comment_container);
                    }
                    console.log(post_title_text);
                    post_title_text = post_title_text.replace(/ /g, "%");
                    console.log(post_title_text);
                    //push a new history
                    history.pushState(destination.innerHTML, `/explore/channel/${channel_name}/posts/${post_title_text}`, `/explore/channel/${channel_name}/posts/${post_title_text}`);

                }
                else {
                    console.log('There were some errors');
                }

            };
            request.send();
        }
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

*/