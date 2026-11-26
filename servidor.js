import http from 'node:http'
import {readFile} from 'node:fs/promises'
import {resolve,sep,extname} from 'node:path'
import {fileURLToPath} from 'node:url'
const raiz=fileURLToPath(new URL('.',import.meta.url))
const tipos={'.html':'text/html','.css':'text/css','.js':'text/javascript','.md':'text/plain','.svg':'image/svg+xml'}
http.createServer(async(req,res)=>{
  try {
    const ruta=decodeURIComponent(new URL(req.url,'http://localhost').pathname)
    const archivo=resolve(raiz,'.'+ruta+(ruta.endsWith('/')?'index.html':''))
    if (!archivo.startsWith(resolve(raiz)+sep)) {res.writeHead(403).end();return}
    const datos=await readFile(archivo)
    res.writeHead(200,{'Content-Type':(tipos[extname(archivo)] || 'application/octet-stream')+'; charset=utf-8'}).end(datos)
  } catch {res.writeHead(404).end('Recurso no disponible')}
}).listen(4173,'127.0.0.1',()=>console.log('Tutoría UX en http://127.0.0.1:4173'))
