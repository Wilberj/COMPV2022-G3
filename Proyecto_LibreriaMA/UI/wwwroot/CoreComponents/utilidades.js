let listelements = document.querySelectorAll('.list__button--click');
listelements.forEach(listelements => {
    listelements.addEventListener('click', () => {
        listelements.classList.toggle('arrow');
        let height = 0;
        let menu = listelements.nextElementSibling;
        console.log(menu)
        if (menu.clientHeight == "0") {
            height = menu.scrollHeight;
        }
        menu.style.height = `${height}px`;

    })
})