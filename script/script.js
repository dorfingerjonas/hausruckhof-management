window.addEventListener('load', () => {
    const detailedHammer = new Hammer(document.getElementById('detailedChildrenScreen'));
    const roomPlaningHammer = new Hammer(document.getElementById('roomPlaningScreen'));
    const roomHammer = new Hammer(document.getElementById('roomsScreen'));
    const horseListHammer = new Hammer(document.getElementById('ridingPlan'));
    const sendFeedBackHammer = new Hammer(document.getElementById('sendFeedbackScreen'));
    const signInBtn = document.getElementById('logInBtn');
    const signOut = document.getElementById('signOut');
    const menu = document.getElementById('menu');
    const headline = document.querySelector('#headline');
    let loggedIn = localStorage.getItem('loggedIn');
    let currentScreen = 0;
    // Nav
    const childrenNav = document.getElementById('childrenNav');
    const roomPlaning = document.getElementById('roomPlaningNav');
    const ridingPlanNav = document.getElementById('ridingPlanNav');
    const feedBackNav = document.getElementById('feedBackNav');

    // Delete
    document.getElementById('back').addEventListener('click', () => {
        changeScreen(false);
    });

    roomPlaning.addEventListener('click', () => {
        goToSpecificScreen(4);
        menu.click();
        changeHeadline('Zimmer Einteilung');
    });

    childrenNav.addEventListener('click', () => {
        goToSpecificScreen(1);
        menu.click();
        changeHeadline('Kinder');
    });

    ridingPlanNav.addEventListener('click', () => {
        goToSpecificScreen(6);
        menu.click();
        changeHeadline('Reitplan');
    });

    feedBackNav.addEventListener('click', () => {
        goToSpecificScreen(8);
        menu.click();
        changeHeadline('Feedbackfragebögen');
    });

    const xhttpChildren = new XMLHttpRequest();
    xhttpChildren.open('POST', './php/getData.php', true);
    xhttpChildren.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttpChildren.send('req=children');

    let children = [];

    xhttpChildren.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            children = JSON.parse(this.responseText);

            for (let i = 0; i < children.length; i++) {   
                const child = children[i];

                children[i] = {
                    parentsEmail: child[0], street: child[1], plzAndPlace: child[2], phonenumbers: [{owner: child[3], number: child[4]}, {owner: child[5], number: child[6]}], takenExtraLessons: parseInt(child[7]),
                    name: child[8], birthdate: child[9], gender: child[10], groupNumber: parseInt(child[11]), packageNumber: parseInt(child[12]), svnr: child[13], extraLessonsAllowed: getBoolean(child[14]), maxExtraLessons: parseInt(child[15]), poolAllowed: getBoolean(child[16]), roomNumber: parseInt(child[17]),
                    picture: getBoolean(child[18]), picturePayed: getBoolean(child[19]), allergen: child[20], vegetarian: getBoolean(child[21]), vegan: getBoolean(child[22]), extraDay: getBoolean(child[23]), foRiding: getBoolean(child[24]), afRiding: getBoolean(child[25]), jumping: getBoolean(child[26]), dressur: getBoolean(child[27]), note: child[28]
                };
            }
        }
    }

    const xhttpRoom = new XMLHttpRequest();
    xhttpRoom.open('POST', './php/getData.php', true);
    xhttpRoom.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttpRoom.send('req=rooms');

    let rooms = [];

    xhttpRoom.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            rooms = JSON.parse(this.responseText);

            for (let i = 0; i < rooms.length; i++) {
                const room = rooms[i];
                
                rooms[i] = {
                    number: parseInt(room[0]), capacity: parseInt(room[1]), unusedBeds: parseInt(room[2]), children: []
                };
            }
        }
    }

    const xhttpHorse = new XMLHttpRequest();
    xhttpHorse.open('POST', './php/getData.php', true);
    xhttpHorse.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttpHorse.send('req=horses');

    let horses = [];

    xhttpHorse.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            horses = JSON.parse(this.responseText);

            for (let i = 0; i < horses.length; i++) {
                const horse = horses[i];
                
                horses[i] = {
                    name: horse[0], id: horse[1], timetable: []
                };
            }
        }
    }
    
    if (loggedIn === null) {
        localStorage.setItem('loggedIn', false);
        loggedIn = false;
    } else {
        if (loggedIn === 'false') {
            loggedIn = false;
        } else {
            loggedIn = true;
            // goToSpecificScreen(1);
            // printDetailedList(children);
        }
    }

    signInBtn.addEventListener('click', () => {
        activateLoading();

        printChildrenList(children);
        printRoomList(rooms);
        printDetailedRoomList(rooms, true, children);
        printHorseList(horses);
        printDetailedHorseList(horses, true, children);
        printSendFeedback(children);

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
            setTimeout(() => {
                deActivateLoading();
                goToSpecificScreen(1);
                // document.getElementById('usernameField').textContent = `Benutzername: ${username.value}`;
                if (username.value === 'admin') printDetailedList(children, true);
                else printDetailedList(children, false);
                changeHeadline('Kinder');
            }, 1250);
            
            error.innerHTML = '&nbsp;';
            localStorage.setItem('loggedIn', true);
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

    function changeScreen(next) {
        const contentWrapper = document.getElementById('contentWrapper');
        const menu = document.getElementById('menu');

        setTimeout(() => {
            document.getElementById('contentWrapper').scrollTo({
                top: 0,
                left: 0,
            });
        }, 210);

        if (next) {
            currentScreen++;
        } else {
            currentScreen--;
        }

        const screens = [];

        for (const child of contentWrapper.childNodes) {
            if (child.localName === 'div') {
                screens.push(child);
            }
        }

        if (screens[currentScreen].className.includes('requiresScroll')) {
            contentWrapper.style.overflowY = 'scroll';
        } else {
            contentWrapper.style.overflowY = 'hidden';
        }

        contentWrapper.style.left = `${(currentScreen * 100 * (-1))}vw`;
        
        if (currentScreen >= 1) {
            setTimeout(() => {
                menu.style.top = '1.5vh';
            }, 200);
        } else {
            menu.style.top = '-9vh';
        }
    }

    function goToSpecificScreen(screenIndex) {
        const contentWrapper = document.getElementById('contentWrapper');
        const menu = document.getElementById('menu');

        setTimeout(() => {
            document.getElementById('contentWrapper').scrollTo({
                top: 0,
                left: 0,
            });
        }, 210);

        currentScreen = screenIndex;

        contentWrapper.style.left = `${(currentScreen * 100 * (-1))}vw`;
        
        if (currentScreen >= 1) {
            setTimeout(() => {
                menu.style.top = '1.5vh';
            }, 200);
        } else {
            menu.style.top = '-9vh';
        }

        const screens = [];

        for (const child of contentWrapper.childNodes) {
            if (child.localName === 'div') {
                screens.push(child);
            }
        }

        if (screens[currentScreen].className.includes('requiresScroll')) {
            contentWrapper.style.overflowY = 'scroll';
        } else {
            contentWrapper.style.overflowY = 'hidden';
        }

        // hide all children details
        const detailedChildren = document.getElementById('detailedChildrenScreen');

        for (const child of detailedChildren.childNodes) {
            child.classList.add('hide');
        }
    }

    function printChildrenList(children) {
        const contentWrapper = document.getElementById('childrenScreen');

        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            const newChild = document.createElement('div');
            const name = document.createElement('p');
            const icon = document.createElement('i');

            name.textContent = child.name;
            // icon.setAttribute('class', 'fas fa-sort-down icon');
            icon.setAttribute('class', 'material-icons icon');
            icon.textContent = 'keyboard_arrow_right';

            newChild.setAttribute('class', 'selectionChild');

            if (i === 0) newChild.classList.add('firstChild');
            else if (i === children.length - 1) newChild.classList.add('lastChild');

            const hammer = new Hammer(newChild);

            hammer.on('swipeleft', (ev) => {
                newChild.click();
            });

            newChild.addEventListener('click', () => {
                const detailedChildren = document.getElementById('detailedChildrenScreen');

                goToSpecificScreen(2);
                detailedChildren.childNodes[i].classList.remove('hide');
            });
            
            newChild.appendChild(name);
            newChild.appendChild(icon);
            contentWrapper.appendChild(newChild);
        }
    }

    function printDetailedList(children, hasWritePermission) {
        const contentWrapper = document.getElementById('detailedChildrenScreen');

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const inputElms = [];
            const checkboxes = [];

            const newChild = document.createElement('div');
            newChild.setAttribute('class', 'hide');

            // print name 
            let newRow = document.createElement('div');
            newRow.setAttribute('class', 'detailedChildRow');

            let text = document.createElement('h2');
            text.textContent = child.name;

            let edit = document.createElement('i');

            if (hasWritePermission) {
                edit.setAttribute('class', 'fas fa-pencil-alt edit');
                
                edit.addEventListener('click', () => {
                    if (edit.className.includes('fa-pencil-alt')) {
                        edit.style.opacity = 0;
                        
                        setTimeout(() => {
                            edit.classList.remove('fa-pencil-alt');
                            edit.classList.add('fa-check');
                            edit.style.opacity = 1;
                        }, 310);

                        for (const elm of inputElms) {
                            elm.style.borderColor = 'darkgray';
                            elm.classList.add('focus');
                            elm.readOnly = false;
                        }

                        for (const box of checkboxes) {
                            box.disabled = false;
                        }
                    } else {
                        edit.style.opacity = 0;

                        setTimeout(() => {
                            edit.classList.add('fa-pencil-alt');
                            edit.classList.remove('fa-check');
                            edit.style.opacity = 1;
                        }, 310);

                        for (const elm of inputElms) {
                            elm.style.borderColor = 'transparent';
                            elm.classList.remove('focus');
                            elm.readOnly = true;
                        }

                        for (const box of checkboxes) {
                            box.disabled = true;
                        }
                    }
                });
            }

            newRow.appendChild(text);
            if (hasWritePermission) newRow.appendChild(edit);
            newChild.appendChild(newRow);

            // print content in order
            let order = [
                {diplayText: 'E-Mail Eltern:', content: child.parentsEmail},
                {diplayText: 'Geburtsdatum:', content: child.birthdate},
                {diplayText: 'Straße:', content: child.street},
                {diplayText: 'PLZ, Ort:', content: child.plzAndPlace},
                {diplayText: 'Geschlecht:', content: child.gender},
                {diplayText: 'SVNR:', content: child.svnr},
                {diplayText: 'Allergene:', content: child.allergen},
                {diplayText: 'Pauschale:', content: `Pauschale ${child.packageNumber}`},
                {diplayText: 'Reitgruppe:', content: `Gruppe ${child.groupNumber}`},
                // {diplayText: 'Annmerkungen:', content: child.note},
            ];

            appendInput(order, false);

            // print phonenumbers
            printPhoneNumbers();

            // print checkboxes in order
            order = [
                {diplayText: 'Vegetarisch', checked: child.vegetarian},
                {diplayText: 'Vegan', checked: child.vegan},
                {diplayText: 'Fortgeschrittener Ausritt erlaubt', checked: child.foRiding},
                {diplayText: 'Anfänger Ausritt erlaubt', checked: child.afRiding},
                {diplayText: 'Zusatztag anwesend', checked: child.extraDay},
                {diplayText: 'darf Freibad besuchen', checked: child.poolAllowed},
                {diplayText: 'Foto + Urkunde', checked: child.picture},
                {diplayText: 'Foto + Urkunde bezahlt', checked: child.picturePayed},
                {diplayText: 'Spring Stunde', checked: child.jumping},
                {diplayText: 'Dressur Stunde', checked: child.dressur},
                {diplayText: 'Extrastunden erlaubt', checked: child.extraLessonsAllowed},
            ];

            // print checkboxes
            appendCheckbox(order);

            appendInput([{diplayText: 'maximale Extrastunden', content: child.maxExtraLessons}], true);

            let infos = [{diplayText: 'Reitplan'}];

            // appendLinkToAnotherScreen(infos);

            printDeleteChildButton();

            function appendLinkToAnotherScreen(infos) {
                for (const info of infos) {
                    const newRow = document.createElement('div');
                    newRow.setAttribute('class', 'detailedChildRow');

                    const text = document.createElement('p');
                    text.textContent = info.diplayText;

                    const icon = document.createElement('i');
                    icon.setAttribute('class', 'material-icons icon');
                    icon.textContent = 'keyboard_arrow_right';

                    const ridingHammer = new Hammer(newRow);

                    ridingHammer.on('swipeleft', () => {
                        changeScreen(true);                    
                    });
                    
                    newRow.appendChild(text);
                    newRow.appendChild(icon);
                    newChild.appendChild(newRow);
                }
            }

            function printChildrenSpecificRidingPlan(horses) {
                // TODO
            }

            function printPhoneNumbers() {
                for (const number of child.phonenumbers) {
                    const newRow = document.createElement('div');
                    newRow.setAttribute('class', 'detailedChildRow');
    
                    const text = document.createElement('p');
                    if (number.owner.includes(':')) {
                        text.textContent = `${number.owner}`;
                    } else {
                        text.textContent = `${number.owner}:`;
                    }
    
                    const wrapper = document.createElement('div');
                    wrapper.setAttribute('class', 'phoneWrapper');
    
                    const content = document.createElement('input');
                    content.type = 'text';
                    content.value = number.number;
                    content.readOnly = true;
                    content.setAttribute('class', 'hideInput');
    
                    inputElms.push(content);
    
                    let phonenumber = number.number.replace('/', ''); 
    
                    const call = document.createElement('a');
                    call.href = `tel:${phonenumber}`;
    
                    const icon = document.createElement('i');
                    icon.setAttribute('class', 'fas fa-phone');
    
                    call.appendChild(icon);
    
                    newRow.appendChild(text);
                    wrapper.appendChild(content);
                    wrapper.appendChild(call);
                    newRow.appendChild(wrapper);
                    newChild.appendChild(newRow);
                }
            }
            
            function appendInput(order, short) {
                for (const orderElm of order) {
                    const newRow = document.createElement('div');
                    newRow.setAttribute('class', 'detailedChildRow');

                    const text = document.createElement('p');
                    text.textContent = orderElm.diplayText;

                    const content = document.createElement('input');
                    content.type = 'text';
                    content.value = orderElm.content;
                    content.readOnly = true;
                    content.setAttribute('class', 'hideInput');

                    if (short) content.setAttribute('class', 'hideInput shorterInput');
                    else content.setAttribute('class', 'hideInput');

                    inputElms.push(content);

                    newRow.appendChild(text);
                    newRow.appendChild(content);
                    newChild.appendChild(newRow);
                }    
            }

            function appendCheckbox(order) {
                for (const orderElm of order) {
                    const newRow = document.createElement('div');
                    newRow.setAttribute('class', 'detailedChildRow');
    
                    const text = document.createElement('p');
                    text.textContent = orderElm.diplayText;
    
                    const inputWrapper = document.createElement('div');
                    const label = document.createElement('label');
                    const input = document.createElement('input');
                    const span = document.createElement('span');
    
                    input.type = 'checkbox';
                    input.checked = orderElm.checked;
                    input.disabled = true;
    
                    checkboxes.push(input);
    
                    label.setAttribute('class', 'switch');
                    span.setAttribute('class', 'slider round');
    
                    label.appendChild(input);
                    label.appendChild(span);
    
                    inputWrapper.appendChild(label);
    
                    newRow.appendChild(text);
                    newRow.appendChild(inputWrapper);
                    newChild.appendChild(newRow);
                }
            }

            function printDeleteChildButton() {
                newRow = document.createElement('div');
                newRow.setAttribute('class', 'detailedChildRow');

                text = document.createElement('p');
                text.textContent = `${child.name} löschen`;

                const icon = document.createElement('i');
                icon.setAttribute('class', 'fas fa-trash');

                newRow.addEventListener('click', () => {
                    changeScreen(false);

                    let wrapper = [
                        document.getElementById('detailedChildrenScreen'),
                        document.getElementById('childrenScreen'),
                    ];
            
                    for (const box of wrapper) {
                        while (box.firstChild) {
                            box.removeChild(box.firstChild);
                        }
                    }

                    let newChildren = [];

                    for (let j = 0; j < children.length; j++) {
                        if (children[j].name !== child.name && children[j].birthdate !== child.birthdate) {
                            newChildren.push(children[j]);   
                        }
                    }
            
                    printChildrenList(newChildren);
                    printDetailedList(newChildren, true);
                });

                newRow.style.color = 'red';
                
                newRow.appendChild(text);
                newRow.appendChild(icon);
                newChild.appendChild(newRow);
            }

            contentWrapper.appendChild(newChild);
        }
    }

    function printRoomList(rooms) {
        const contentWrapper = document.getElementById('roomPlaningScreen');

        for (let i = 0; i < rooms.length; i++) {
            const room = rooms[i];

            const newRoom = document.createElement('div');
            const number = document.createElement('p');
            const capacity = document.createElement('p');
            const icon = document.createElement('i');

            number.textContent = `Zimmer ${room.number}`;
            capacity.textContent = `${room.unusedBeds}/${room.capacity} Betten frei`;
            icon.setAttribute('class', 'material-icons icon');
            icon.textContent = 'keyboard_arrow_right';

            newRoom.setAttribute('class', 'selectionChild');

            if (i === 0) newRoom.classList.add('firstChild');
            else if (i === rooms.length - 1) newRoom.classList.add('lastChild');

            const hammer = new Hammer(newRoom);

            hammer.on('swipeleft', () => {
                newRoom.click();
            });

            newRoom.addEventListener('click', () => {
                changeScreen(true);
                document.getElementById('roomsScreen').childNodes[i].classList.remove('hide');
            });
            
            newRoom.appendChild(number);
            newRoom.appendChild(capacity);
            newRoom.appendChild(icon);
            contentWrapper.appendChild(newRoom);
        }
    }

    function printDetailedRoomList(rooms, hasWritePermission, children) {
        const contentWrapper = document.getElementById('roomsScreen');
        
        for (let i = 0; i < rooms.length; i++) {
            const room = rooms[i];

            const newRoom = document.createElement('div');

            const header = document.createElement('div');
            const headline = document.createElement('h2');
            const roomNumber = document.createElement('p');

            headline.textContent = 'Zimmer Einteilug';
            roomNumber.textContent = `Nr. ${room.number}`;

            header.appendChild(headline);
            header.appendChild(roomNumber);
            header.setAttribute('class', 'roomHeader');

            const roomInfos = document.createElement('div');
            const firstLine = document.createElement('div');
            const mainText = document.createElement('p');
            const memberCounter = document.createElement('p');

            mainText.textContent = 'In diesem Zimmer sind:';
            memberCounter.textContent = `${room.capacity - room.unusedBeds}/${room.capacity}`;
            memberCounter.setAttribute('id', `PersonCounter${room.number}`);
            firstLine.appendChild(mainText);
            firstLine.appendChild(memberCounter);
            firstLine.setAttribute('class', 'roomInfoFirstLine');
            roomInfos.setAttribute('class', 'roomInfo');

            let ulInfo = document.createElement('ul');

            createUL();

            roomInfos.appendChild(firstLine);
            roomInfos.appendChild(ulInfo);

            function createUL() {
                for (const child of room.children) {
                    ul.appendChild(createIsInThisRoomLi(child));
                }
            }

            roomInfos.appendChild(firstLine);
            roomInfos.appendChild(ulInfo);

            const childrenToAdd = document.createElement('div');

            childrenToAdd.setAttribute('class', 'childrenToAdd');

            let ul = document.createElement('ul');

            for (const child of children) {
                if (child.roomNumber === -1) {
                    ul.appendChild(createIsNotInThisRoomLi(child));
                }
            }

            function createIsNotInThisRoomLi(child) {
                const li = document.createElement('li');
                const name = document.createElement('p');
                const iconWrapper = document.createElement('div');
                const add = document.createElement('i');
                const gender = document.createElement('i');

                name.textContent = child.name;
                add.setAttribute('class', 'removeChildFromRoom fas fa-plus');

                if (child.gender === 'weiblich') gender.setAttribute('class', 'roomGender fas fa-venus');
                else gender.setAttribute('class', 'roomGender fas fa-mars');

                iconWrapper.setAttribute('class', 'iconWrapper');

                add.addEventListener('click', () => {
                    ul.removeChild(li);
                    ulInfo.appendChild(createIsInThisRoomLi(child));
                    child.roomNumber = room.number;
                    let currentState = document.getElementById(`PersonCounter${room.number}`).textContent.split('/');
                    document.getElementById(`PersonCounter${room.number}`).textContent = `${parseInt(currentState[0]) + 1}/${room.capacity}`;
                });

                if (hasWritePermission) iconWrapper.appendChild(add);
                iconWrapper.appendChild(gender);
                li.appendChild(name);
                li.appendChild(iconWrapper);

                return li;
            }

            function createIsInThisRoomLi(child) {
                const li = document.createElement('li');
                const name = document.createElement('p');
                const iconWrapper = document.createElement('div');
                const remove = document.createElement('i');
                const gender = document.createElement('i');

                name.textContent = child.name;
                remove.setAttribute('class', 'removeChildFromRoom fas fa-minus');

                if (child.gender === 'weiblich') gender.setAttribute('class', 'roomGender fas fa-venus');
                else gender.setAttribute('class', 'roomGender fas fa-mars');

                iconWrapper.setAttribute('class', 'iconWrapper');

                remove.addEventListener('click', () => {
                    ulInfo.removeChild(li);
                    ul.appendChild(createIsNotInThisRoomLi(child));
                    child.roomNumber = -1;
                    let currentState = document.getElementById(`PersonCounter${room.number}`).textContent.split('/');
                    document.getElementById(`PersonCounter${room.number}`).textContent = `${parseInt(currentState[0]) -1}/${room.capacity}`;
                });

                if (hasWritePermission) iconWrapper.appendChild(remove);
                iconWrapper.appendChild(gender);
                li.appendChild(name);
                li.appendChild(iconWrapper);

                return li;
            }

            childrenToAdd.appendChild(ul);

            newRoom.setAttribute('class', 'hide newRoom');

            newRoom.appendChild(header);
            newRoom.appendChild(roomInfos);
            newRoom.appendChild(childrenToAdd);
            contentWrapper.appendChild(newRoom);
        }
    }

    function printHorseList(horses) {
        const contentWrapper = document.getElementById('ridingPlan');

        for (let i = 0; i < horses.length; i++) {
            const horse = horses[i];

            const newHorse = document.createElement('div');
            const name = document.createElement('p');
            const icon = document.createElement('i');

            name.textContent = horse.name;
            icon.setAttribute('class', 'material-icons icon');
            icon.textContent = 'keyboard_arrow_right';

            newHorse.setAttribute('class', 'selectionHorse');

            if (i === 0) newHorse.classList.add('firstChild');
            else if (i === horses.length - 1) newHorse.classList.add('lastChild');

            const hammer = new Hammer(newHorse);

            hammer.on('swipeleft', () => {
                newHorse.click();
            });

            newHorse.addEventListener('click', () => {
                const detailedRidingPlan = document.getElementById('detailedRidingPlan');

                goToSpecificScreen(7);
                detailedRidingPlan.childNodes[i].classList.remove('hide');
            });
            
            newHorse.appendChild(name);
            newHorse.appendChild(icon);
            contentWrapper.appendChild(newHorse);
        }
    }

    function printDetailedHorseList(horses, hasWritePermission, children) {
        const contentWrapper = document.getElementById('detailedRidingPlan');

        for (let i = 0; i < horses.length; i++) {
            const horse = horses[i];

            const newDetailedHorse = document.createElement('div');
            
            // create Headline
            const headline = document.createElement('div');
            const horseName = document.createElement('h2');
            horseName.textContent = horse.name;

            headline.appendChild(horseName);
            headline.classList.add('detailedHorseHeadliner');

            newDetailedHorse.appendChild(headline);

            // create Session Selection
            for (let i = 1; i <= 7; i++) {
                const dayRow = document.createElement('div');

                const headlineWrapper = document.createElement('div');
                const day = document.createElement('h3');
                day.textContent = `Tag ${i}:`;
                headlineWrapper.appendChild(day);

                dayRow.appendChild(headlineWrapper);
                
                const sessions = [
                    {from: "08:15", till: "09:00"},
                    {from: "09:00", till: "09:45"},
                    {from: "09:45", till: "10:30"},
                    {from: "10:30", till: "11:15"},
                    {from: "11:15", till: "12:00"},
                    {from: "13:00", till: "13:45"},
                    {from: "13:45", till: "14:30"},
                    {from: "14:30", till: "15:15"},
                    {from: "15:15", till: "16:00"},
                    {from: "16:00", till: "16:45"},
                ];

                for (let j = 0; j < sessions.length; j++) {
                    const session = sessions[j];

                    const sessionWrapper = document.createElement('div');

                    const time = document.createElement('p');
                    time.textContent = `${session.from} - ${session.till} Uhr`;

                    sessionWrapper.appendChild(time);

                    const select = document.createElement('select');

                    for (const child of children) {
                        const option = document.createElement('option');
                        option.textContent = child.name;
                        select.appendChild(option);
                    }

                    const select2 = document.createElement('select');
                    const activities = [
                        "Springen",
                        "Dressur",
                        "Ausritt",
                    ];

                    for (const activity of activities) {
                        const option = document.createElement('option');
                        option.textContent = activity;
                        select2.appendChild(option);
                    }

                    sessionWrapper.classList.add('session')
                    sessionWrapper.appendChild(select);
                    sessionWrapper.appendChild(select2);
                    dayRow.appendChild(sessionWrapper);
                }

                newDetailedHorse.appendChild(dayRow);
            }

            newDetailedHorse.setAttribute('class', 'hide detailedHorsePlan');

            detailedHorseHammer = new Hammer(newDetailedHorse);

            detailedHorseHammer.on('swiperight', () => {
                changeScreen(false);
                newDetailedHorse.classList.add('hide');
            });

            contentWrapper.appendChild(newDetailedHorse);
        }
    }

    function printSendFeedback(children) {
        const contentWrapper = document.getElementById('sendFeedbackScreen');
        const btns = [];

        const headlineWrapper = document.createElement('div');
        

        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            const newChild = document.createElement('div');

            const name = document.createElement('p');
            name.textContent = child.name;

            const sendButton = document.createElement('div');
            sendButton.textContent = 'Senden';
            sendButton.setAttribute('class', 'feedbackButton');

            sendButton.addEventListener('click', () => {
                sendButton.style.opacity = 0.5;
            });

            btns.push(sendButton);

            newChild.setAttribute('class', 'feedbackChild');
            newChild.appendChild(name);
            newChild.appendChild(sendButton);
            contentWrapper.appendChild(newChild);
        }

        const sendAllWrapper = document.createElement('div');
        const sendAllButton = document.createElement('div');
        sendAllButton.textContent = 'Allen Senden';
        sendAllButton.setAttribute('class', 'feedbackButton');

        sendAllButton.addEventListener('click', () => {
            for (const btn of btns) {
                btn.style.opacity = .5;
                sendAllButton.style.opacity = .5;
            }
        });

        sendAllWrapper.setAttribute('class', 'feedbackChild');
        sendAllWrapper.appendChild(sendAllButton);
        contentWrapper.appendChild(sendAllWrapper);
    }

    function changeHeadline(newText) {
        headline.style.opacity = 0;

        setTimeout(() => {
            headline.textContent = newText;
            headline.style.opacity = 1;
        }, 200);
    }

    detailedHammer.on('swiperight', () => {
        changeScreen(false);
    });

    roomPlaningHammer.on('swiperight', () => {
        goToSpecificScreen(1);
        changeHeadline('Kinder');
    });

    roomHammer.on('swiperight', () => {
        changeScreen(false);
        
        setTimeout(() => {
            for (const child of document.getElementById('roomsScreen').childNodes) {
                child.classList.add('hide');
            }
        }, 260);
    });

    horseListHammer.on('swiperight', () => {
        goToSpecificScreen(1);
        changeHeadline('Kinder');
    });

    sendFeedBackHammer.on('swiperight', () => {
        goToSpecificScreen(1);
        changeHeadline('Kinder');
    });
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