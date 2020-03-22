window.addEventListener('load', () => {
    const screenContentWrapper = document.getElementById('contentWrapper');
    const signInBtn = document.getElementById('logInBtn');
    const signOut = document.getElementById('signOut');
    const menu = document.getElementById('menu');
    const headline = document.getElementById('headline');
    // Nav
    const childrenNav = document.getElementById('childrenNav');
    const roomPlaning = document.getElementById('roomPlaningNav');
    const ridingPlanNav = document.getElementById('ridingPlanNav');
    const feedBackNav = document.getElementById('feedBackNav');

    roomPlaning.addEventListener('click', () => {
        menu.click();
        changeHeadline('Zimmer Einteilung');
    });

    childrenNav.addEventListener('click', () => {
        menu.click();
        changeHeadline('Kinder');
    });

    ridingPlanNav.addEventListener('click', () => {
        menu.click();
        changeHeadline('Reitplan');
    });

    feedBackNav.addEventListener('click', () => {
        menu.click();
        changeHeadline('Feedbackfragebögen');
    });

    signInBtn.addEventListener('click', () => {
        activateLoading();

        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const error = document.getElementById('errorField');
        let isValid = '';
    
        username.value = username.value.toLowerCase();
    
        if (username.value === '') {
            error.textContent = 'Es darf kein Feld leer bleiben.'
            isValid += false;
            activateUsernameError(username);
        } else {
            deactivateUsernameError(username);
        }
        
        if (password.value === '') {
            error.textContent = 'Es darf kein Feld leer bleiben.'
            isValid += false;
            activateUsernameError(password);
        } else {
            deactivateUsernameError(password);
        }

        if (username.value === '' && password.value === '') {
            error.textContent = 'Es dürfen keine Felder leer bleiben.'
            isValid += false;
            activateUsernameError(username);
            activateUsernameError(password);
        } else if (!error.textContent.includes('darf')) {
            deactivateUsernameError(username);
            deactivateUsernameError(password);            
        }

        function activateUsernameError(name) {
            deActivateLoading();
            name.style.borderBottom = 'red 1.5px solid';
            name.removeEventListener('focus', () => {
                name.style.borderBottom = '#00000080 1.5px solid';
            });
        }

        function deactivateUsernameError(name) {
            name.style.borderBottom = 'lightgray 1.5px solid';
            name.addEventListener('focus', () => {
                name.style.borderBottom = '#00000080 1.5px solid';
            });

            name.addEventListener('blur', () => {
                name.style.borderBottom = 'lightgray 1.5px solid';
            });
        }

        if (!isValid.includes('false')) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost/login', true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.addEventListener('load', (e) => {                
                if (getBoolean(e.target.responseText)) {
                    changeHeadline('Kinder');
                    goToScreen('childrenScreen');
                    requestChildren();
                    
                    error.innerHTML = '&nbsp;';
                } else {
                    error.textContent = 'Benutzername oder Passwort nicht korrekt!';
                    
                }

                deActivateLoading();
            });

            xhr.send(JSON.stringify({username: username.value, password: password.value}));
        }
    });

    signOut.addEventListener('click', () => {
        menu.click();
        goToSpecificScreen(0);
        headline.innerHTML = '&nbsp;'

        let wrapper = [
            document.getElementById('detailedChildrenScreen'),
            document.getElementById('childrenScreen'),
        ];

        for (const box of wrapper) {
            while (box.firstChild) {
                box.removeChild(box.firstChild);
            }
        }

        // document.getElementById('usernameField').innerHTML = '&nbsp;'

        printChildrenList(children);
    });

    function activateLoading() {
        const loader = document.getElementById('loader');
    
        loader.classList.remove('hide');
    }

    function deActivateLoading() {
        const loader = document.getElementById('loader');

        loader.classList.add('hide');
    }

    function changeHeadline(newText) {
        headline.style.opacity = 0;

        setTimeout(() => {
            headline.textContent = newText;
            headline.style.opacity = 1;
        }, 200);
    }

    function goToScreen(screenId) {
        let boxToShow;

        for (const box of screenContentWrapper.children) {
            box.id === screenId ? boxToShow = box : box.classList.add('hide');
        }

        boxToShow.classList.remove('hide');
    }

    function requestChildren() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost/children', true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.addEventListener('load', (e) => {                
            if (e.target.responseText !== 'false') {
                printChildren(e.target.responseText);
            }
        });

        xhr.send();
    }

    function printChildren(children) {
        
    }
});

function getBoolean(string) {
    if (string === 'true') {
        return true;
    } else if (string === 'false') {
        return false;
    } else {
        return undefined;
    }
}

function removeAllChildren(wrapper) {
    if (typeof wrapper === 'string') {
        wrapper = document.getElementById(wrapper);
    }

    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }
}