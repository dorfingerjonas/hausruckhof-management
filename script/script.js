window.addEventListener('load', () => {
    const detailedHammer = new Hammer(document.getElementById('detailedChildrenScreen'));
    const roomPlaningHammer = new Hammer(document.getElementById('roomPlaningScreen'));
    const roomHammer = new Hammer(document.getElementById('roomsScreen'));
    const signInBtn = document.getElementById('logInBtn');
    const signOut = document.getElementById('signOut');
    const menu = document.getElementById('menu');
    let loggedIn = localStorage.getItem('loggedIn');
    let currentScreen = 0;
    // Nav
    const childrenNav = document.getElementById('childrenNav');
    const roomPlaning = document.getElementById('roomPlaningNav');

    roomPlaning.addEventListener('click', () => {
        goToSpecificScreen(4);
        menu.click();
    });

    childrenNav.addEventListener('click', () => {
        goToSpecificScreen(1);
        menu.click();
    });

    const children = [
        {
            parentsEmail: 'mustereltern@mail.com', street: 'Musterstraße 1', plzAndPlace: '4040, Linz', phonenumbers: [{owner: 'Mutter', number: '01234/12345678'}, {owner: 'Vater', number: '09876/98765432'}], 
            name: 'Max Mustermann', birthdate: '01.01.2000', gender: 'männlich', groupNumber: 4, packageNumber: 4, svnr: '5839-030206', extraLessonsAllowed: true, maxExtraLessons: 3, poolAllowed: false, roomNumber: -1,
            picture: true, picturePayed: false, allergen: 'Laktose, Nuss', vegetarian: false, vegan: false, extraDay: false, foRiding: true, afRiding: true, jumping: true, dressur: false, note: 'könnte auch reiterpass reiten'
        },

        {
            parentsEmail: 'mustereltern@mail.com', street: 'Musterstraße 1', plzAndPlace: '4040, Linz', phonenumbers: [{owner: 'Mutter', number: '01234/12345678'}, {owner: 'Vater', number: '09876/98765432'}], 
            name: 'Martina Musterfrau', birthdate: '02.01.2000', gender: 'weiblich', groupNumber: 4, packageNumber: 3, svnr: '5839-030602', extraLessonsAllowed: true, maxExtraLessons: 3, poolAllowed: false, roomNumber: -1,
            picture: true, picturePayed: false, allergen: 'Soja, Gluten', vegetarian: true, vegan: true, extraDay: false, foRiding: true, afRiding: true, jumping: true, dressur: false, note: 'könnte auch reiterpass reiten'
        },

        {
            parentsEmail: 'mustereltern@mail.com', street: 'Musterstraße 1', plzAndPlace: '4040, Linz', phonenumbers: [{owner: 'Mutter', number: '01234/12345678'}, {owner: 'Vater', number: '09876/98765432'}], 
            name: 'Roman Mählich', birthdate: '03.01.2000', gender: 'männlich', groupNumber: 4, packageNumber: 2, svnr: '5839-030601', extraLessonsAllowed: true, maxExtraLessons: 3, poolAllowed: false, roomNumber: -1,
            picture: true, picturePayed: false, allergen: 'Eiweiß', vegetarian: true, vegan: false, extraDay: false, foRiding: true, afRiding: true, jumping: true, dressur: false, note: 'könnte auch reiterpass reiten'
        },

        {
            parentsEmail: 'mustereltern@mail.com', street: 'Musterstraße 1', plzAndPlace: '4040, Linz', phonenumbers: [{owner: 'Mutter', number: '01234/12345678'}, {owner: 'Vater', number: '09876/98765432'}], 
            name: 'Martin Fischer', birthdate: '04.01.2000', gender: 'männlich', groupNumber: 4, packageNumber: 1, svnr: '5839-030600', extraLessonsAllowed: true, maxExtraLessons: 3, poolAllowed: false, roomNumber: -1,
            picture: true, picturePayed: false, allergen: 'Laktose', vegetarian: false, vegan: true, extraDay: false, foRiding: true, afRiding: true, jumping: true, dressur: false, note: 'könnte auch reiterpass reiten'
        },
    ];

    const rooms = [
        {number: 1, capacity: 6, unusedBeds: 6, children: []},
        {number: 2, capacity: 2, unusedBeds: 2, children: []},
        {number: 3, capacity: 4, unusedBeds: 4, children: []},
        {number: 4, capacity: 4, unusedBeds: 4, children: []},
        {number: 5, capacity: 4, unusedBeds: 4, children: []},
        {number: 6, capacity: 4, unusedBeds: 4, children: []},
        {number: 7, capacity: 2, unusedBeds: 2, children: []},
        {number: 8, capacity: 2, unusedBeds: 2, children: []},
        {number: 9, capacity: 2, unusedBeds: 2, children: []},
        {number: 10, capacity: 6, unusedBeds: 6, children: []},
        {number: 11, capacity: 4, unusedBeds: 4, children: []},
    ];

    printChildrenList(children);
    printRoomList(rooms);
    printDetailedRoomList(rooms, true, children);

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
            }, 1250);
            
            error.innerHTML = '&nbsp;';
            localStorage.setItem('loggedIn', true);
        }
    });

    signOut.addEventListener('click', () => {
        menu.click();
        goToSpecificScreen(0);

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

        document.getElementById('contentWrapper').scrollTo({
            top: 0,
            left: 0,
        });

        if (next) {
            currentScreen++;
        } else {
            currentScreen--;
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

        document.getElementById('contentWrapper').scrollTo({
            top: 0,
            left: 0,
        });

        if (screenIndex > contentWrapper.childNodes.length) screenIndex = contentWrapper.childNodes.length

        currentScreen = screenIndex;

        contentWrapper.style.left = `${(currentScreen * 100 * (-1))}vw`;
        
        if (currentScreen >= 1) {
            setTimeout(() => {
                menu.style.top = '1.5vh';
            }, 200);
        } else {
            menu.style.top = '-9vh';
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
                edit.setAttribute('class', 'fas fa-edit edit');

                edit.addEventListener('click', () => {
                    if (edit.className.includes('fa-edit')) {
                        edit.style.opacity = 0;
                        
                        setTimeout(() => {
                            edit.classList.remove('fa-edit');
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
                            edit.classList.add('fa-edit');
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

            appendLinkToAnotherScreen(infos);

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
                    
                    newRow.appendChild(text);
                    newRow.appendChild(icon);
                    newChild.appendChild(newRow);
                }
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

                iconWrapper.appendChild(add);
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

                iconWrapper.appendChild(remove);
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

    detailedHammer.on('swiperight', () => {
        changeScreen(false);
    });

    roomPlaningHammer.on('swiperight', () => {
        goToSpecificScreen(1);
    });

    roomHammer.on('swiperight', () => {
        changeScreen(false);
        
        setTimeout(() => {
            for (const child of document.getElementById('roomsScreen').childNodes) {
                child.classList.add('hide');
            }
        }, 260);
    });
});