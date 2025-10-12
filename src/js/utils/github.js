document.addEventListener('DOMContentLoaded', github);

function github() {
    try {
        const block = document.getElementById('github');

        block.innerHTML = `
        <span>
            GitHub - 
                    <a href="https://github.com/depst0r/Fake-Store-API.git">
                    https://github.com/depst0r/Fake-Store-API.git
                </a>
            </span>
    `
    } catch (error) {
        console.error('error', error)
    }

};