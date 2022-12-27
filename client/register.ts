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

function getElement(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (element) return element;

    throw new Error('Element dont exists');
}

const e = {
    '64': 0,
    '86': 0,
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

function register() {
    return requester.post([
        {
            title: inputs.title.value || null,
            downloadUrl: inputs.downloadUrl.value || null,
            imageUrl: inputs.imageUrl.value || null,
            dependences: [],
            architecture: getArchitectureEnum(inputs.architecture.value) || null,
            description: inputs.description.value || null
        }
    ]);
}

function * iterInputs(): Generator<[string, HTMLInputElement | HTMLSelectElement]> {
    const inpts: any = inputs;
    for (const key in inpts)
        yield [key, inpts[key]];
}

function * iterMandatoryInputs(): Generator<[string, HTMLInputElement | HTMLSelectElement]> {
    const inpts: any = inputs;
    for (const key of mandatory)
        if (inpts[key]) yield [key, inpts[key]];
}

function isAnyMandatoryInputEnpity() {
    for (const [key, element] of iterMandatoryInputs())
        if (!element.value) return true;

    return false;
}

function clearInputs() {
    for (const [key, input] of iterInputs()) {
        if (input instanceof HTMLInputElement) {
            input.value = '';
        } else {
            input.value = '64';
        };
    }
}

function showOutputMessage(msg: string, success: boolean) {
    outputs.result.innerText = msg;

    if (success) {
        outputs.result.style.removeProperty('color');
    } else {
        outputs.result.style.setProperty('color', 'var(--failure-color)');
    }
}

function clearOutput() {
    outputs.result.innerText = '';
}

const inputs = {
    title: getInput('title-input'),
    downloadUrl: getInput('downloadUrl-input'),
    imageUrl: getInput('imageUrl-input'),
    dependences: getInput('dependences-input'),
    description: getInput('description-input'),
    architecture: getSelect('architecture-select')
}

const mandatory = ['title', 'downloadUrl', 'imageUrl'];

const confirmBtn = getInput('register-button');

const outputs = {
    result: getElement('result')
}

const requester = createTecsRequester();

confirmBtn.addEventListener('click', async (ev) => {
    clearOutput();
    
    if (isAnyMandatoryInputEnpity()) {
        showOutputMessage('Falha ao registrar: Entradas insuficientes!', false);
        return;
    }

    const { status } = await register();

    if (status < 400) {
        showOutputMessage('Registrado com sucesso!', true);
        clearInputs();
    } else {
        showOutputMessage('Falha ao registrar: Houve algum problema no servidor!', false);
    }
});