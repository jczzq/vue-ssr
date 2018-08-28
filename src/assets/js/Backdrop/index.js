import './style.scss';

export default class {
    show({ ele, click } = {}) {
        const id = `backdrop-${Math.random()
            .toString(36)
            .substring(3, 6)}`;
        const div = document.createElement('div');
        div.id = id;
        div.classList.add('backdrop', 'show');
        if (click) {
            div.addEventListener('click', () => {
                click();
            });
        }
        document.body.style.overflowY = 'hidden';
        ele ? ele.parentNode.insertBefore(div, ele) : document.body.appendChild(div);
        return id;
    }

    hide(id) {
        const list = document.querySelectorAll('.backdrop');
        if (list.length) {
            const backdrop = id ? document.getElementById(id) : list[0];
            backdrop.classList.add('hide');
            backdrop.classList.remove('show');
            document.body.style.overflowY = 'auto';
            setTimeout(() => {
                if (backdrop) {
                    backdrop.parentNode.removeChild(backdrop);
                }
            }, 200);
        }
    }
}
