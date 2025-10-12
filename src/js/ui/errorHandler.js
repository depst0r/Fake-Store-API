export function showError(message, options = {}) {
    const {
        position = 'top',
            type = 'error',
            autoHide = false,
            hideTime = 5000,
            container = document.body
    } = options;

    if (!container) {
        console.error('Контейнер для ошибки не найден');
        return null;
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = `error-message error-${type} error-${position}`;

    const icons = {
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-icon">${icons[type]}</span>
            <div class="error-text">
                <h4>${getTitle(type)}</h4>
                <p>${message}</p>
            </div>
            <button class="error-close">&times;</button>
        </div>
    `;

    container.appendChild(errorDiv);

    const closeError = () => {
        errorDiv.classList.add('error-hiding');
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 300);
    };

    errorDiv.querySelector('.error-close').addEventListener('click', closeError);

    if (autoHide) {
        setTimeout(closeError, hideTime);
    }

    return errorDiv;
}

function getTitle(type) {
    const titles = {
        error: 'Ошибка',
        warning: 'Внимание',
        info: 'Информация'
    };
    return titles[type];
}

export function showNetworkError(error) {
    return showError(
        `Проблемы с соединением: ${error.message}`, {
            type: 'error',
            autoHide: true
        }
    );
}

export function showApiError(error) {
    return showError(
        `Ошибка загрузки данных: ${error.message}`, {
            type: 'error',
            autoHide: false
        }
    );
}

export function showWarning(message) {
    return showError(message, {
        type: 'warning',
        autoHide: true
    });
}