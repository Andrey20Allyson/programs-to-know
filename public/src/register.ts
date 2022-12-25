function getInput(id: string) {
    const input = document.getElementById(id);
    if (input instanceof HTMLInputElement) return input;

    throw new Error();
}

const titleInputElement = getInput('title-input');
const downloadUrlInputElement = getInput('downloadUrl-input');
