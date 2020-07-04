document.addEventListener("DOMContentLoaded", () => {
    load_first_page();
    linking_logic();


});










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
        /*
        if (localStorage.getItem('login') == 'true') {
            console.log('Looks like you can login');
            console.log('I am handling the logic')
            let nav_source = document.querySelector('#explore-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            let source = document.querySelector('#explore-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            history.replaceState(document.innerHTML, 'explore', 'explore');
            let mainNav = document.getElementById('js-menu');
            let navBarToggle = document.getElementById('js-navbar-toggle');
            // creating the active class on the navbar
            navBarToggle.addEventListener('click', function (event) {
                mainNav.classList.toggle('active');
            });
            form_controll;
        }
        else {
            let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            console.log("Looks like you can't access this page, login");
            let source = document.querySelector('#login-template').innerHTML;
            destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            history.replaceState(document.innerHTML, 'login', 'login');
            let mainNav = document.getElementById('js-menu');
            let navBarToggle = document.getElementById('js-navbar-toggle');
            // creating the active class on the navbar
            navBarToggle.addEventListener('click', function (event) {
                mainNav.classList.toggle('active');
            });
            form_controll();


        }
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

        /*if (localStorage.getItem('login') == 'true') {
            console.log('Looks like you can view the channel info');
            let channel_name = url.split('http://127.0.0.1:5000/login?next=%2Fexplore%2Fchannel%2F').pop();
            // make an ajax call to the server
            let request = new XMLHttpRequest();

            request.open('post', `explore/channel/${channel_name}`);

            request.onload = () => {
                console.log('The request has been recieved');
                let data = JSON.parse(request.responseText);

                if (data.success) {
                    console.log('The ajax call was succesfull The channel exits');
                    let channel = data.channel_name;
                }
            }

            let submit_data = new FormData();
            submit_data.append('channel_name', channel_name);
            request.send(submit_data);

            let source = document.querySelector('#explore-channel-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            //history.replaceState(document.innerHTML, 'channel', 'explore');
            let mainNav = document.getElementById('js-menu');
            let navBarToggle = document.getElementById('js-navbar-toggle');
            // creating the active class on the navbar
            navBarToggle.addEventListener('click', function (event) {
                mainNav.classList.toggle('active');
            });
            form_controll;
        }
        */
        /*
        else {
        console.log("Looks like you can't access this page, login");
        let nav_source = document.querySelector('#homepage-nav-template').innerHTML;
        let nav_destination = document.querySelector('nav');
        nav_destination.innerHTML = nav_source;
        let source = document.querySelector('#login-template').innerHTML;
        destination = document.querySelector('.page-container');
        destination.innerHTML = source;
        history.replaceState(document.innerHTML, 'login', 'login');
        let mainNav = document.getElementById('js-menu');
        let navBarToggle = document.getElementById('js-navbar-toggle');
        // creating the active class on the navbar
        navBarToggle.addEventListener('click', function (event) {
            mainNav.classList.toggle('active');
        });
        form_controll();
        }
        */
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
        //make a post request 
        /*let request = new XMLHttpRequest();
        let channel_name = url.split('http://127.0.0.1:5000/explore/channel/').pop();
        console.log('THe channel_name is ');
        console.log(channel_name);
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


            }
            else {
                console.log('There were some errors');
                console.log("The channel doesn't exist");
            }
        }

        let submit_data = new FormData();
        submit_data.append('channel_name', channel_name);
        request.send(submit_data);
        */
    }
    else if (url == "http://127.0.0.1:5000/explore") {
        if (localStorage.getItem('login') == 'true') {
            explore_load(first_load = true);
            form_controll('explore');
            /*
            console.log('you have permision');
            let nav_source = document.querySelector('#explore-nav-template').innerHTML;
            let nav_destination = document.querySelector('nav');
            nav_destination.innerHTML = nav_source;
            let source = document.querySelector('#explore-template').innerHTML;
            let destination = document.querySelector('.page-container');
            destination.innerHTML = source;
            history.replaceState(document.innerHTML, 'explore', 'explore');
            let mainNav = document.getElementById('js-menu');
            let navBarToggle = document.getElementById('js-navbar-toggle');
            // creating the active class on the navbar
            navBarToggle.addEventListener('click', function (event) {
                mainNav.classList.toggle('active');

            });
            console.log('about to select the user profile pic');
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
        else {
            console.log('There is no access granted for you')

        }*/
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
                            /*let source = document.querySelector('#explore-template').innerHTML;
                            let destination = document.querySelector('.page-container');
                            destination.innerHTML = source;
                            history.pushState(destination.innerHTML, 'explore', 'explore');
                            */
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
                        /*request.open('post', `/explore/channel/${channel_name}`);

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
                            }
                            else {
                                console.log('There were some errors');
                                console.log("The channel doesn't exist");
                            }
                        }

                        let submit_data = new FormData();
                        submit_data.append('channel_name', channel_name);
                        request.send(submit_data);*/
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
                        //load the explore page
                        //let source = document.querySelector('#explore-template').innerHTML;
                        //let destination = document.querySelector('.page-container');
                        //destination.innerHTML = source;
                        //history.pushState(document.innerHTML, 'explore', 'explore');
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

/*function explore_load() {
    console.log('The explore function is running');
    let source = document.querySelector('#explore-template').innerHTML;
    let destination = document.querySelector('.page-container');
    destination.innerHTML = source;
 
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
        }
        else {
            console.log('The server was unable to find the channels');
        }
 
    }
    let submit_data = new FormData();
    submit_data.append('i want data', 'give me data');
    request.send(submit_data);
}
*/
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
        post_title_text = post_title.replace(/%2525/g, " ");
        post_title_text = post_title.replace(/%/g, " ");
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
                //post_title_text = post_title_text.replace(/ /g, "%");
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
                    //post_title_text = post_title_text.replace(/ /g, "%");
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