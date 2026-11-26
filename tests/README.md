# Verificación funcional

Ejecuta `node --test tests/reservas.test.js` desde la raíz. Se comprobaron seis casos de registro y lectura persistente, edición sin duplicados, conflicto con conservación de datos, cancelación, validación de campos y validación de hora pasada. Resultado observado: seis aprobados.

Para repetir las comprobaciones adicionales de interfaz en un equipo Windows con Microsoft Edge, inicia el servidor y ejecuta en otra terminal:
```sh
npm install --no-save --package-lock=false playwright-core
node tests/interfaz.cjs antes
node tests/interfaz.cjs despues
```
El script recorre v1 y v2 respectivamente con un perfil temporal. Busca por materia, provoca un error de horario, vuelve desde el resumen, confirma, recarga, edita y cancela. Comprueba que el prototipo esté aislado y guarda capturas en la carpeta de evidencias correspondiente. Las capturas de 390 × 844 simulan una ventana móvil y la vista de escritorio usa 1280 × 800. La prueba automatizada usa la fecha ficticia 2099-05-06. Estas ejecuciones son verificaciones técnicas.
