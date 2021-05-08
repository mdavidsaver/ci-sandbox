const child_process = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const process = require('process');

function getInput(name) {
    return process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`];
}

function spawnSync(cmd, args, opts) {
    console.log(`exec ${cmd} ${args.join(' ')}`);
    const ret = child_process.spawnSync(cmd, args, opts);
    console.log(`done ${cmd} ${args.join(' ')} -> ${ret.status}`);
    if(ret.status) {
        process.exit(ret.status);
    }
}

const cwd = process.cwd();

const image = process.env['DOCKER_IMAGE'];

const script_file = crypto.randomBytes(16).toString('hex') + '.sh';

fs.writeFileSync(script_file, getInput('sh') || '');

const execopts = {
    stdio: ['ignore', 'inherit', 'inherit'],
};

const timeout = getInput('timeout');
if(timeout) {
    execopts['timeout'] = timeout;
}

if(image) {
    spawnSync('docker', [
        'run', '--pull', 'missing', '-v', cwd+':/io', '-w', '/io', image, 'sh', script_file,
    ], execopts);

} else {
    spawnSync('sh', [script_file], execopts);
}
