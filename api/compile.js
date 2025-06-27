// api/compile.js (Node.js Serverless Function)
export default async function handler(req, res) {
if (req.method !== 'POST') {
res.status(405).send('Method Not Allowed');
return;
}

const { code, stdin } = req.body;
if (!code) {
res.status(400).json({ stderr: 'No code provided.' });
return;
}

try {
const response = await fetch('https://emkc.org/api/v2/piston/execute', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
language: 'cpp',
version: '10.2.0',
files: [{ name: 'main.cpp', content: code }],
stdin
})
});
const result = await response.json();
res.status(200).json({ stdout: result.run.stdout, stderr: result.run.stderr });
} catch (err) {
res.status(500).json({ stderr: 'Execution error: ' + err.message });
}
}