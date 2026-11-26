export const docentes = [
  {id:'arias', nombre:'Elena Arias', materia:'Interacción Humano-Computador', iniciales:'EA'},
  {id:'vega', nombre:'Diego Vega', materia:'Bases de Datos', iniciales:'DV'},
  {id:'leon', nombre:'Andrea León', materia:'Ingeniería de Software', iniciales:'AL'}
]
export const horas = ['09:00','11:00','14:00','16:00']
export const modalidades = ['Virtual','Presencial']
export function fechaLocal(d = new Date()) {
  return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')
}
export function horasOcupadas(fecha, lista, excluirId) {
  if (!fecha) return []
  return lista.filter(x=>x.id!==excluirId && x.estado==='Confirmada' && x.fecha===fecha).map(x=>x.hora)
}
export function validar(r, lista, ahora = new Date()) {
  if (!docentes.some(d=>d.id===r.docente)) return 'Selecciona un docente.'
  if (!modalidades.includes(r.modalidad)) return 'Selecciona una modalidad.'
  const dia = new Date(r.fecha+'T12:00:00')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.fecha) || fechaLocal(dia)!==r.fecha || r.fecha<fechaLocal(ahora)) return 'Elige una fecha válida desde hoy.'
  if (!horas.includes(r.hora)) return 'Selecciona un horario.'
  if (new Date(r.fecha+'T'+r.hora)<=ahora) return 'Elige un horario futuro.'
  if (horasOcupadas(r.fecha, lista, r.id).includes(r.hora)) return 'Ya tienes una tutoría en ese horario. Elige otra hora.'
  return ''
}
