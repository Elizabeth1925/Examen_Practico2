export function almacen(storage, clave) {
  return {
    leer() {
      const datos = JSON.parse(storage.getItem(clave) ?? '[]')
      if (!Array.isArray(datos)) throw Error('Formato de reservas inválido.')
      return datos
    },
    escribir(datos) { storage.setItem(clave, JSON.stringify(datos)) }
  }
}
