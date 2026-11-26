import test from 'node:test'
import assert from 'node:assert/strict'
import {agenda} from '../src/application/agenda.js'
import {almacen} from '../src/infrastructure/almacen.js'
import {validar,horasOcupadas} from '../src/domain/reservas.js'
const base={docente:'vega',modalidad:'Virtual',fecha:'2099-05-06',hora:'09:00'}
function entorno(){
  const mapa=new Map()
  const repo=almacen({getItem:k=>mapa.get(k),setItem:(k,v)=>mapa.set(k,v)},'agenda')
  return {app:agenda(repo),repo}
}
test('registrar y recuperar desde otra instancia',()=>{const {app,repo}=entorno();const r=app.guardar(base);assert.deepEqual(agenda(repo).listar(),[r])})
test('editar conserva identidad y evita duplicados',()=>{const {app}=entorno();const r=app.guardar(base);app.guardar({...r,hora:'14:00'});assert.equal(app.listar().length,1);assert.equal(app.listar()[0].id,r.id);assert.equal(app.listar()[0].hora,'14:00')})
test('un conflicto conserva la reserva anterior',()=>{const {app}=entorno();app.guardar(base);const r=app.guardar({...base,hora:'16:00'});assert.throws(()=>app.guardar({...r,hora:base.hora}),/Ya tienes/);assert.deepEqual(app.listar()[1],r)})
test('cancelar libera el horario e impide editar la cancelada',()=>{const {app}=entorno();const r=app.guardar(base);app.cancelar(r.id);assert.equal(app.listar()[0].estado,'Cancelada');assert.throws(()=>app.guardar(r));assert.doesNotThrow(()=>app.guardar(base))})
test('rechazar campos inválidos y fechas pasadas',()=>{for(const cambio of [{modalidad:''},{fecha:''},{fecha:'2099-02-31'},{fecha:'2000-01-01'},{hora:''},{docente:'otro'}]) assert.ok(validar({...base,...cambio},[]))})
test('rechazar hora pasada del día actual',()=>assert.match(validar(base,[],new Date('2099-05-06T10:00:00')),/futuro/))
test('horasOcupadas reporta confirmadas y excluye la propia reserva al editar',()=>{const {app}=entorno();const r1=app.guardar(base);const r2=app.guardar({...base,hora:'14:00'});assert.deepEqual(horasOcupadas(base.fecha,app.listar()),['09:00','14:00']);assert.deepEqual(horasOcupadas(base.fecha,app.listar(),r1.id),['14:00']);assert.deepEqual(horasOcupadas(base.fecha,app.listar(),r2.id),['09:00'])})
test('horasOcupadas ignora reservas canceladas y fecha vacía',()=>{const {app}=entorno();const r=app.guardar(base);app.cancelar(r.id);assert.deepEqual(horasOcupadas(base.fecha,app.listar()),[]);assert.deepEqual(horasOcupadas('',app.listar()),[])})
