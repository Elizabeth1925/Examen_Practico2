# Tutoría UX
Aplicación de gestión de tutorías para la práctica integradora de Interacción Humano-Computador. Permite buscar docentes y asignaturas, escoger modalidad, fecha y horario, revisar, reservar, modificar y cancelar. Implementación de referencia preparada con asistencia de IA. Los datos del catálogo son ficticios.

## Ejecutar
1. Descomprime el proyecto en una carpeta. Usa Node.js 22 o posterior; verificado con Node 24. No requiere instalar paquetes para la aplicación ni para las seis pruebas funcionales.
2. Abre una terminal en la carpeta que contiene este README y ejecuta `node servidor.js`. Mantén esa terminal abierta.
3. Abre [la aplicación](http://127.0.0.1:4173/), el [prototipo navegable](http://127.0.0.1:4173/ux/prototipo/) o la [versión inicial para evaluación](http://127.0.0.1:4173/evaluacion/v1/). Detén el servidor con Ctrl+C.
4. En otra terminal ejecuta `node --test tests/reservas.test.js`. Para repetir el recorrido de navegador, consulta [las pruebas](tests/README.md).

## Diseño y arquitectura
- [Perfil, necesidades, cinco contactos y curva emocional](ux/experiencia.md)
- [Requisitos R1–R6, mapa, flujo, trazabilidad y arquitectura](docs/diseno.md)
- [Tres wireframes](ux/wireframes.html) · [Prototipo en HTML](ux/prototipo/index.html)
- [Presentación](src/presentation/) · [Aplicación](src/application/) · [Dominio](src/domain/) · [Infraestructura](src/infrastructure/)

La aplicación guarda reservas en el navegador y conserva el borrador durante la corrección. Se rechazan fechas pasadas y choques de horario. Cancelar requiere confirmación y conserva la tarjeta histórica. El prototipo interactivo comparte los componentes de la versión final y usa almacenamiento de sesión independiente.

## Evaluación y evidencias
- [Plan, piloto, consignas, criterios y métricas](evaluacion/plan.md)
- [Consentimiento](evaluacion/consentimiento.md) · [Registro por tarea](evaluacion/resultados.csv)
- [Heurísticas, recorrido cognitivo, accesibilidad, cuatro hallazgos y backlog](evaluacion/inspeccion.md)
- [Capturas antes](evidencias/antes/) · [Capturas después](evidencias/despues/) · [Vista de escritorio](evidencias/despues/escritorio.png)

**Estado de entrega.** Están ejecutadas las pruebas funcionales y la reevaluación técnica. El equipo debe realizar el piloto P00, registrar los ajustes efectivos, realizar P01 y P02, registrar métricas, contrastar los hallazgos con las sesiones y documentar la reevaluación con personas. Las filas del CSV están preparadas para esa recogida.

## Limitaciones
El catálogo y los turnos son de demostración. La agenda representa un solo estudiante en un navegador. Carece de autenticación, sincronización entre dispositivos y calendario institucional. El borrador vive en memoria y se pierde al recargar. La persistencia de la app depende de que el navegador permita almacenamiento local. Para las sesiones, usa un perfil limpio o una ventana privada independiente por participante.

## Guía de trabajo de los cuatro integrantes

El integrante 1 publica la base común. Cada persona trabaja desde su propia cuenta, en su propia copia del repositorio y en una rama identificable. Los mensajes de commit de esta guía son ejemplos para usar después de realizar el cambio descrito. El ejercicio de conflicto es una práctica de Git propuesta por el equipo.

### 1. Publicar la base común · integrante 1

1. Crea un repositorio vacío en GitHub. Invita a los integrantes 2, 3 y 4 como colaboradores. Cada uno debe aceptar la invitación.
2. Desde una terminal en una carpeta de trabajo propia, clona el repositorio. En todos los ejemplos sustituye `URL_DEL_REPOSITORIO` por su dirección real.

   ```sh
   git clone URL_DEL_REPOSITORIO tutoria-equipo
   cd tutoria-equipo
   ```

3. Copia **el contenido** de la carpeta descomprimida `TutoriaUX` dentro de `tutoria-equipo`, incluido `.gitignore`. Comprueba que `README.md`, `src/` y `tests/` estén en la raíz.
4. Configura tu autoría en esta copia usando tu nombre y un correo asociado a tu cuenta de GitHub. Puedes usar el correo privado que GitHub ofrece en los ajustes de tu cuenta.

   ```sh
   git config user.name "Tu nombre"
   git config user.email "tu-correo-asociado-a-GitHub"
   git add .
   git diff --cached --stat
   git commit -m "Incorpora la base inicial de Tutoría UX"
   git branch -M main
   git push -u origin main
   ```

### 2. Preparar las cuatro ramas

Una vez publicada la base, los integrantes 2, 3 y 4 ejecutan `git clone URL_DEL_REPOSITORIO tutoria-equipo`, entran con `cd tutoria-equipo` y configuran su propia autoría con los dos comandos `git config` anteriores. El integrante 1 continúa en su copia. Usen carpetas de trabajo independientes, especialmente si comparten OneDrive.

Cada integrante ejecuta **solo el comando de su fila**, partiendo de la misma base, antes de integrar cambios.

| Integrante | Comando | Archivos principales |
|---|---|---|
| 1 · UX y requisitos | `git switch -c ux-requisitos origin/main` | `ux/experiencia.md`, `ux/wireframes.html`, `docs/diseno.md` |
| 2 · Aplicación | `git switch -c aplicacion origin/main` | `src/`, `index.html`, `ux/prototipo/` |
| 3 · Evaluación | `git switch -c evaluacion-usuarios origin/main` | `evaluacion/plan.md`, `evaluacion/resultados.csv` |
| 4 · Validación | `git switch -c pruebas-validacion origin/main` | `tests/`, `evaluacion/inspeccion.md`, `evidencias/`, `README.md` |

### 3. Trabajo y commits de cada integrante

**Integrante 1 · UX y requisitos**

1. Abre los wireframes y recorre el prototipo. Representa en el boceto qué campo se marca cuando falta el horario y qué datos se conservan. Commit sugerido: `Representa la recuperación de errores en el wireframe de reserva`.
2. Revisa los requisitos R1–R6 con la aplicación abierta. Añade a la matriz de trazabilidad una comprobación concreta por requisito y enlaza la prueba o evidencia disponible. Commit: `Vincula requisitos con sus comprobaciones`.
3. Cuando el integrante 3 tenga resultados, contrasta la curva emocional inicial con las dudas y comentarios observados. Distingue hipótesis y observaciones. Commit: `Contrasta la curva emocional con las sesiones de usuarios`.

**Integrante 2 · Aplicación y prototipo**

1. Reproduce H3 de la inspección. Reserva un horario y vuelve a abrir el formulario para la misma fecha. Implementa la indicación de horarios ocupados al elegir la fecha. Comprueba que al editar siga disponible la hora de la propia reserva. Commit: `Indica horarios ocupados al crear y editar reservas`.
2. Reproduce H4 y mejora la lectura de la fecha en el resumen y en Mis reservas. Verifica que al volver al formulario permanezca el día correcto. Commit: `Muestra fechas legibles en el resumen y las reservas`.
3. Comprueba el prototipo y la aplicación en ventana móvil y de escritorio. Pasa al integrante 4 los pasos de verificación y el identificador de tu commit. Conserva `evaluacion/v1/` para poder repetir la medición inicial. Si el equipo prioriza otros hallazgos de las sesiones, adapta los cambios y sus mensajes.

**Integrante 3 · Piloto y sesiones**

1. Sigue [el plan](evaluacion/plan.md), obtiene el consentimiento y ejecuta P00. Anota la dificultad observada y el ajuste que aplicaste al guion. Commit: `Documenta el piloto P00 y ajusta las consignas`.
2. Ejecuta T1, T2 y T3 en v1 con P01 y P02, dos personas distintas ajenas al desarrollo. Completa las filas correspondientes con tiempos, éxito, errores, ayudas, SEQ y observaciones reales. Puedes hacer un commit tras cada sesión: `Registra la sesión P01 en v1` y `Registra la sesión P02 en v1`.
3. Coordina con el integrante 4 la repetición en v2 y registra las filas de esa versión. Commit: `Registra la reevaluación de las tareas en v2`. Conserva consentimientos identificables en privado y comparte únicamente evidencias anonimizadas autorizadas.

**Integrante 4 · Pruebas, hallazgos y entrega**

1. Con el integrante 2, elige un caso que distinga la versión anterior de la corregida. Por ejemplo, comprueba en la interfaz que un horario ocupado esté deshabilitado al crear y que la hora propia siga disponible al editar. Añade la prueba en `tests/` y ejecútala sobre la versión corregida. Commit: `Comprueba la disponibilidad de horarios al crear y editar`.
2. Con las notas del integrante 3, actualiza los hallazgos. Indica tarea, evidencia, severidad 0–4 y recomendación. Compara los resultados v1/v2 de las tareas repetidas e indica si persiste alguna dificultad. Commit: `Relaciona los hallazgos con las evidencias de v1 y v2`.
3. Actualiza el estado de entrega del README, enlaza evidencias y registra las limitaciones observadas. Commit: `Actualiza la documentación con los resultados de validación`.

### 4. Subir cada aporte a GitHub

Al terminar una unidad de trabajo, ejecuta `git status`, selecciona los archivos de ese cambio y revisa el contenido antes de confirmar. Este ejemplo corresponde al piloto del integrante 3:

```sh
git add evaluacion/plan.md
git diff --cached
git commit -m "Documenta el piloto P00 y ajusta las consignas"
git push -u origin HEAD
```

Los demás integrantes sustituyen el archivo y el mensaje por los de su tarea. En los siguientes commits de la misma rama basta con `git push` para subirlos. Cada persona abre en GitHub un *pull request* de su rama hacia `main`, resume qué cambió e indica cómo lo comprobó. Usen **Create a merge commit** si quieren conservar los commits individuales en el historial de la rama principal.

### 5. Ejercicio para provocar y resolver un conflicto

**Participan los integrantes 1 y 2.** Los integrantes 3 y 4 pueden seguir con su trabajo. Háganlo justo después de crear las cuatro ramas y antes de incorporar otros cambios. La línea de control que se debe editar está aquí:

**Revisión del equipo:** UX a cargo del integrante 1.

1. **Integrante 1**, en `ux-requisitos`: sustituye únicamente la línea anterior por `**Revisión del equipo:** UX a cargo del integrante 1.`. Guarda, ejecuta `git add README.md`, haz el commit `Asigna la revisión de UX` y sube la rama con `git push -u origin HEAD`.
2. **Integrante 2**, en `aplicacion`: desde la misma base original, sustituye esa misma línea por `**Revisión del equipo:** aplicación a cargo del integrante 2.`. Guarda, ejecuta `git add README.md`, haz el commit `Asigna la revisión de la aplicación` y sube tu rama. Ambos cambios deben estar confirmados por separado **antes** de actualizar cualquiera de las dos ramas.
3. **Integrante 1:** abre el PR de `ux-requisitos` hacia `main` e intégralo primero. Para seguir trabajando después en la misma rama, déjala disponible.
4. **Integrante 2:** con tu rama activa y tus cambios ya confirmados, incorpora la nueva versión de `main`:

   ```sh
   git switch aplicacion
   git fetch origin
   git merge origin/main
   git status
   ```

5. Git indicará un conflicto en `README.md`. Abre el archivo y busca el bloque delimitado por `<<<<<<< HEAD`, `=======` y `>>>>>>> origin/main`. Sustituye **todo ese bloque**, incluidos los marcadores, por esta línea que conserva ambos aportes:

   ```markdown
   **Revisión del equipo:** UX a cargo del integrante 1 y aplicación a cargo del integrante 2.
   ```

6. Guarda el archivo y termina la fusión:

   ```sh
   git add README.md
   git diff --cached --check
   git diff --cached
   git commit -m "Resuelve el conflicto del README y conserva ambas responsabilidades"
   git push
   ```

7. **Integrante 2:** abre o actualiza el PR de `aplicacion` hacia `main`. **Integrantes 3 y 4:** revisen que la línea final mencione a ambos responsables. Integren el PR y comprueben el resultado en GitHub. Para los siguientes aportes, sin cambios locales pendientes, cada integrante actualiza su rama con `git fetch origin` y `git merge origin/main`. Si un PR ya fue integrado, abran otro para los nuevos commits.

### 6. Verificación y entrega en Moodle

Cuando todos los PR de trabajo estén integrados, el integrante 4 ejecuta en una copia con el trabajo guardado:

```sh
git switch main
git pull --ff-only origin main
node --test tests/reservas.test.js
git shortlog -sn HEAD
git log --graph --oneline -20
git rev-parse HEAD
```

Comprueben también las pruebas de interfaz según [el instructivo](tests/README.md), los enlaces a evidencias y el acceso del docente. En Moodle entreguen la URL del repositorio y el identificador completo que devuelve el último comando.
