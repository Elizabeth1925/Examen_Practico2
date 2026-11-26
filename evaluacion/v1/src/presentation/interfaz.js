import {docentes,horas,modalidades,fechaLocal,validar} from '../domain/reservas.js'
import {agenda} from '../application/agenda.js'
import {almacen} from '../infrastructure/almacen.js'

const demo = document.body.dataset.demo === 'si'
const app = agenda(almacen(demo ? sessionStorage : localStorage, demo ? 'tutoria-evaluacion-v1' : 'tutoria-agenda'))
const main = document.querySelector('main')
const $ = s => main.querySelector(s)
let borrador
let consulta = ''
const escapar = v => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const boton = (accion,titulo,clase='') => '<button type="button" data-accion="'+accion+'" class="'+clase+'">'+titulo+'</button>'
function vista(titulo,contenido) {
  main.innerHTML = (demo ? '<p>Versión inicial · Datos de esta sesión</p>' : '')+'<h1>'+titulo+'</h1>'+contenido
  main.focus()
}
function docente(id) { return docentes.find(d=>d.id===id) }
function tarjetas() {
  const normal = s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
  const candidatos = docentes.filter(d=>normal(d.nombre+' '+d.materia).includes(normal(consulta.trim())))
  $('#tarjetas').innerHTML = candidatos.map(d=>'<article><span class="avatar" aria-hidden="true">'+d.iniciales+'</span><h2>'+d.nombre+'</h2><p>'+d.materia+'</p>'+boton('elegir/'+d.id,'Elegir docente')+'</article>').join('')
  $('#cuenta').textContent = candidatos.length ? candidatos.length+' docentes disponibles' : 'Sin resultados. Prueba otra asignatura o apellido.'
}
function buscar() {
  vista('Buscar tutoría','<p>Encuentra una asignatura y elige con quién reunirte.</p><label>Docente o asignatura<input id="buscar" type="search" placeholder="Ej. Bases de Datos"></label><p id="cuenta" role="status"></p><section id="tarjetas" class="grid" aria-label="Docentes"></section>')
  $('#buscar').value = consulta
  $('#buscar').oninput = e=>{consulta=e.target.value;tarjetas()}
  tarjetas()
}
function opciones(lista,actual) {
  return '<option value="">Selecciona una opción</option>'+lista.map(x=>'<option '+(x===actual?'selected':'')+'>'+x+'</option>').join('')
}
function formulario() {
  const d = docente(borrador.docente)
  vista(borrador.id?'Modificar reserva':'Reservar tutoría','<section class="panel"><h2>'+d.materia+'</h2><p>'+d.nombre+'</p><form novalidate><label>Modalidad<select name="modalidad">'+opciones(modalidades,borrador.modalidad)+'</select></label><label>Fecha<input type="date" name="fecha" min="'+fechaLocal()+'" value="'+escapar(borrador.fecha)+'"></label><label>Horario<select name="hora">'+opciones(horas,borrador.hora)+'</select></label><p class="error" role="alert"></p><div class="acciones"><button>Revisar reserva</button>'+boton('buscar','Volver a docentes','sec')+'</div></form></section>')
  const form=$('form')
  const actualizar=()=>Object.assign(borrador,Object.fromEntries(new FormData(form)))
  form.oninput=actualizar
  form.onsubmit=e=>{
    e.preventDefault()
    actualizar()
    try {
      const mensaje=validar(borrador,app.listar())
      if (mensaje) { $('.error').textContent=mensaje; return }
      revisar()
    } catch { $('.error').textContent='No se pudieron leer las reservas del navegador.' }
  }
}
function detalle(r) {
  const d=docente(r.docente)
  return '<h2>'+d.materia+'</h2><p>'+d.nombre+'</p><p>'+escapar(r.fecha)+' · '+escapar(r.hora)+'<br>'+escapar(r.modalidad)+'</p>'
}
function revisar() {
  vista('Revisa tu reserva','<section class="panel">'+detalle(borrador)+'<p class="error" role="alert"></p><div class="acciones">'+boton('guardar',borrador.id?'Guardar cambios':'Confirmar reserva')+boton('volver','Volver a editar','sec')+'</div></section>')
}
function reservas(mensaje='') {
  const lista=app.listar().slice().reverse()
  vista('Mis reservas',(mensaje?'<p class="mensaje" role="status">'+mensaje+'</p>':'')+(lista.length?'<section class="grid">'+lista.map(r=>'<article><strong>'+escapar(r.estado)+'</strong>'+detalle(r)+(r.estado==='Confirmada'?'<div class="acciones">'+boton('editar/'+r.id,'Modificar','sec')+boton('preguntar/'+r.id,'Cancelar','sec')+'</div>':'')+'</article>').join('')+'</section>':'<p>Aún no tienes reservas.</p>'+boton('buscar','Buscar tutoría')))
}
function actuar(accion,id) {
  if (accion==='buscar') return buscar()
  if (accion==='mis') return reservas()
  if (accion==='elegir') {
    if (!borrador || borrador.docente!==id || borrador.id) borrador={docente:id,modalidad:'',fecha:'',hora:''}
    return formulario()
  }
  if (accion==='volver') return formulario()
  if (accion==='guardar') {
    const edicion=Boolean(borrador.id)
    app.guardar(borrador)
    borrador=null
    return reservas(edicion?'Cambios guardados.':'Reserva confirmada.')
  }
  const r=app.listar().find(x=>x.id===id)
  if (!r) return reservas('La reserva ya no está disponible.')
  if (accion==='editar') { borrador={...r}; return formulario() }
  if (accion==='preguntar') return vista('¿Cancelar esta tutoría?','<section class="panel">'+detalle(r)+'<div class="acciones">'+boton('mis','Conservar reserva','sec')+boton('cancelar/'+id,'Confirmar cancelación','danger')+'</div></section>')
  if (accion==='cancelar') {app.cancelar(id);return reservas('Reserva cancelada.')}
}
function ejecutar(accion,id) {
  try { actuar(accion,id) } catch(e) {
    let error=$('.error')
    if (!error) {error=document.createElement('p');error.className='error';error.setAttribute('role','alert');main.prepend(error)}
    error.textContent=e.name==='Error'?e.message:'No se pudo acceder al almacenamiento. Revisa los permisos del navegador.'
  }
}
main.onclick=e=>{const b=e.target.closest('[data-accion]');if(b) ejecutar(...b.dataset.accion.split('/'))}
document.querySelector('#explorar').onclick=buscar
document.querySelector('#mis').onclick=()=>ejecutar('mis')
buscar()

