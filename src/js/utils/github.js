document.addEventListener('DOMContentLoaded', github);

function github() {
    const block = document.getElementById('github');

    block.innerHTML = `
        <span>
            GitHub - 
                    <a href="https://github.com/depst0r/Fake-Store-API.git">
                    https://github.com/depst0r/Fake-Store-API.git
                </a>
            </span>
    `
};