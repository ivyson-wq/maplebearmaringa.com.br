// Liga a proteção por login da Vercel nos endereços .vercel.app do projeto
// (domínio próprio fica de fora). Só configuração do projeto; não publica nada.
import fs from 'node:fs';
import os from 'node:os';

let TOKEN;
for (const p of [
  process.env.APPDATA + '/xdg.data/com.vercel.cli/auth.json',
  process.env.APPDATA + '/com.vercel.cli/auth.json',
  process.env.LOCALAPPDATA + '/com.vercel.cli/auth.json',
  os.homedir() + '/AppData/Roaming/com.vercel.cli/Data/auth.json',
]) { try { TOKEN = JSON.parse(fs.readFileSync(p)).token; if (TOKEN) break; } catch {} }

const r = await fetch('https://api.vercel.com/v9/projects/maplebearmaringa?teamId=ivyson-wqs-projects', {
  method: 'PATCH',
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ ssoProtection: { deploymentType: process.argv[2] || 'all' } }),
});
const j = await r.json();
console.log(r.status, JSON.stringify(j.ssoProtection || j.error));
