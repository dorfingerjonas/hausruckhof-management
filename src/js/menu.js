window.addEventListener('load', () => {

    const menu = document.getElementById('menu');
    const nav = document.getElementById('nav');

    menu.addEventListener('click', () => {
        const bars = [
            document.getElementById('barOne'),
            document.getElementById('barTwo'),
            document.getElementById('barThree')
        ];

        if (bars[0].className.includes('turn') && bars[2].className.includes('turn')) {
            // deactivate nav
            bars[0].classList.toggle('turnLeft');
            bars[2].classList.toggle('turnRight');
            
            setTimeout(() => {
                for (const bar of bars) {
                    bar.classList.toggle('goToMiddle');
                }

                bars[1].classList.toggle('hide');
            }, 310);

            nav.style.top = '-110vh';
        } else {
            // activate nav
            nav.style.top = 0;
            for (const bar of bars) {
                bar.classList.toggle('goToMiddle');
            }

            setTimeout(() => {
                bars[0].classList.toggle('turnLeft');
                bars[1].classList.toggle('hide');
                bars[2].classList.toggle('turnRight');
            }, 310);
        }
    }); 
});