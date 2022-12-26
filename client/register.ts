import { createTecsRequester, ArchitectureEnum } from './api/requester.js';

function getInput(id: string) {
    const input = document.getElementById(id);
    if (input instanceof HTMLInputElement) return input;

    throw new Error('Element isn\'t a HTMLInputElement');
}

function getSelect(id: string) {
    const select = document.getElementById(id);
    if (select instanceof HTMLSelectElement) return select;

    throw new Error('Element isn\'t a HTMLSelectElement');
}

function getArchitectureEnum(value: string): ArchitectureEnum | null {
    switch (value) {
        case '64':
            return value;
        case '86':
            return value;
        default:
            return null;
    }
}

const inputs = {
    title: getInput('title-input'),
    downloadUrl: getInput('downloadUrl-input'),
    imageUrl: getInput('imageUrl-input'),
    dependences: getInput('dependences-input'),
    description: getInput('description-input'),
    architecture: getSelect('architecture-select'),
    confirmBtn: getInput('register-button')
}

const requester = createTecsRequester();

inputs.confirmBtn.addEventListener('click', () => {
    requester.post([
        {
            title: inputs.title.value || null,
            downloadUrl: inputs.downloadUrl.value || null,
            imageUrl: inputs.imageUrl.value || null,
            dependences: [],
            architecture: getArchitectureEnum(inputs.architecture.value) || null,
            description: inputs.description.value || null
        }
    ]);
});