import {validar} from '../domain/reservas.js'
export function agenda(repo) {
  return {
    listar: () => repo.leer(),
    guardar(datos) {
      const lista = repo.leer()
      if (datos.id && !lista.some(x=>x.id===datos.id && x.estado==='Confirmada')) throw Error('La reserva ya no está activa.')
      const error = validar(datos,lista)
      if (error) throw Error(error)
      const reserva = {...datos,id:datos.id || crypto.randomUUID(),estado:'Confirmada'}
      repo.escribir(datos.id ? lista.map(x=>x.id===datos.id ? reserva : x) : [...lista,reserva])
      return reserva
    },
    cancelar(id) {
      const lista = repo.leer()
      if (!lista.some(x=>x.id===id && x.estado==='Confirmada')) throw Error('La reserva ya no está activa.')
      repo.escribir(lista.map(x=>x.id===id ? {...x,estado:'Cancelada'} : x))
    }
  }
}
