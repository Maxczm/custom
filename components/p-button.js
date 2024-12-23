class MyButton extends HTMLElement {
    constructor() {
        super();
        const button = document.createElement('button');

        // 添加loading图标
        const icon = document.createElement('span');
        icon.className = 'icon';
        icon.style.cssText = `
                width:16px;
                height:16px;
                font-size: 14px; /* 图标和文字同大小 */
                display: ${this.hasAttribute('loading') ? 'inline-block' : 'none'};
                background-image: url(${this.getAttribute('icon') || 'default-icon.png'});
                `
        if (this.hasAttribute('loading')) {
            icon.classList.add('rotate');
        }
        button.appendChild(icon); // 将图标添加到按钮中
        this.icon  = icon
        //添加文字
        const label = document.createElement('span')
        label.textContent = this.getAttribute('label') || '';
        label.style.cssText = `
                flex-grow: 1; /* 文字占据剩余空间 */
                display: ${this.getAttribute('label') != '' ? 'inline-block' : 'none'};
                text-align: center; /* 文字居中（如果按钮宽度较大时） */
                font-weight: bold;
                margin-left: 5px;
                `
        button.appendChild(label)
        // 添加徽章
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = this.getAttribute('badge') || '';
        badge.style.cssText = `
                margin-left: 10px; /* 徽章和文字之间的间距 */
                padding: 3px 6px;
                border-radius: 50%;
                background-color: red;
                color: white;
                font-size: 12px; /* 徽章字体稍小一些 */
                `
        badge.style.display = this.hasAttribute('badge') ? 'inline-block' : 'none';
        button.appendChild(badge); // 将徽章添加到按钮中
        button.style.cssText = `
                box-sizing: border-box;
                display: flex;
                align-items: center; /* 垂直居中对齐 */
                justify-content: center; /* 水平居中对齐（可选） */
                padding: 10.5px 17.5px;
                font-size: 14px; /* 设置字体大小为14px */
                border: none;
                border-radius: 6px;
                border-color:${this.getAttribute('bg-color') || 'skyblue'};
                background-color: ${this.getAttribute('bg-color') || 'skyblue'};
                color: ${this.getAttribute('color') || 'white'};
                cursor: pointer;
                white-space: nowrap; /* 防止内容换行 */
                `;

        // 添加旋转动画样式
        const style = document.createElement('style');
        style.textContent = `
            .rotate {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        `;
        this.appendChild(style);

        this.appendChild(button);
        // 监听属性变化
        this.observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'loading') {
                    if (this.hasAttribute('loading')) {
                        this.startLoading();
                    } else {
                        this.stopLoading();
                    }
                }
            }
        });

        this.observer.observe(this, { attributes: true });
    }
     startLoading() {
        this.icon.style.display = 'inline-block';
        this.icon.classList.add('rotate');
    }
     stopLoading() {
        this.icon.style.display = 'none';
        this.icon.classList.remove('rotate');
    }
     disconnectedCallback() {
        this.observer.disconnect();
    }
}

customElements.define('my-button', MyButton);