#!/usr/bin/env node
/**
 * Descarga el binario de tdn para esta plataforma desde los releases públicos.
 *
 * No contiene ninguna lógica de la herramienta: baja un archivo, comprueba que
 * llegó entero y lo deja ejecutable. Se puede correr las veces que haga falta.
 *
 *   node bootstrap.mjs            # ultima version publicada
 *   node bootstrap.mjs v1.0.0     # una version concreta
 */
import { chmodSync, existsSync, mkdirSync, renameSync, rmSync, statSync, createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = process.env.TDN_REPO ?? 'Mario-pereyra/resultar-agent-skills';
const VERSION = process.argv[2] ?? 'latest';
// TDN_BASE permite apuntar a un servidor propio (espejo interno). Sin el, GitHub Releases.
const BASE = process.env.TDN_BASE ?? (VERSION === 'latest'
  ? `https://github.com/${REPO}/releases/latest/download`
  : `https://github.com/${REPO}/releases/download/${VERSION}`);

/** El binario que corresponde a esta plataforma. */
function objetivo() {
  const { platform, arch } = process;
  const tabla = {
    'linux-x64': { archivo: 'tdn-linux-x64', destino: 'tdn' },
    'win32-x64': { archivo: 'tdn-windows-x64.exe', destino: 'tdn.exe' },
    'darwin-arm64': { archivo: 'tdn-macos-arm64', destino: 'tdn' },
    'darwin-x64': { archivo: 'tdn-macos-x64', destino: 'tdn' },
  };
  const elegido = tabla[`${platform}-${arch}`];
  if (!elegido) {
    throw new Error(
      `No hay binario para ${platform}/${arch}. `
      + `Soportadas: ${Object.keys(tabla).join(', ')}.`,
    );
  }
  return elegido;
}

const { archivo, destino } = objetivo();
const carpetaBin = join(AQUI, 'bin');
const rutaDestino = join(carpetaBin, destino);

if (existsSync(rutaDestino) && VERSION === 'latest') {
  console.log(`Ya está instalado: ${rutaDestino}`);
  console.log('Para reinstalar, borralo y volvé a correr este script.');
  process.exit(0);
}

mkdirSync(carpetaBin, { recursive: true });

const url = `${BASE}/${archivo}`;
process.stdout.write(`Bajando ${archivo} (${VERSION})... `);

const respuesta = await fetch(url);
if (!respuesta.ok) {
  process.stdout.write('falló\n\n');
  if (respuesta.status === 404) {
    console.error(
      `No hay binario publicado en:\n  ${url}\n\n`
      + 'El release todavía no existe o no incluye esta plataforma.',
    );
  } else {
    console.error(`El servidor respondió ${respuesta.status}.`);
  }
  process.exit(1);
}

const esperado = Number(respuesta.headers.get('content-length') ?? 0);
const parcial = `${rutaDestino}.parcial`;
await pipeline(Readable.fromWeb(respuesta.body), createWriteStream(parcial));

const escrito = statSync(parcial).size;
if (esperado && escrito !== esperado) {
  rmSync(parcial, { force: true });
  console.error(`\nDescarga incompleta: ${escrito} de ${esperado} bytes. Volvé a intentar.`);
  process.exit(1);
}

renameSync(parcial, rutaDestino);
if (process.platform !== 'win32') chmodSync(rutaDestino, 0o755);
process.stdout.write('listo\n');
console.log(`Instalado en: ${rutaDestino}`);
console.log('Verificalo con: bin/tdn spaces');
