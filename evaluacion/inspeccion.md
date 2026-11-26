# Inspección y reevaluación técnica

La inspección se basa en las pantallas, el código y recorridos automatizados en Edge. Los valores de severidad son estimaciones de diseño. Las sesiones con personas deben aportar sus propios resultados.

**Aporte de Persona 4.** Se amplió `tests/interfaz.cjs` con aserciones para la hora ocupada al crear una reserva, la disponibilidad de la hora propia al editar y la fecha legible con valor ISO conservado. `node --check` confirmó la sintaxis del script. La ejecución completa de interfaz queda pendiente de integrar el PR #2 (`Veronica_Jaque`) y repetir el recorrido con Edge/Playwright. En el `resultados.csv` actualmente publicado en `Sebastian_Vaca`, las observaciones están marcadas `SIMULADO`; no se usan como resultados reales de P00, P01 o P02.

## Inspección heurística
| Heurística de Nielsen | Observación de la aplicación |
|---|---|
| Visibilidad del estado | Confirmar y cancelar producen mensajes y una tarjeta con el estado textual. |
| Lenguaje familiar | El formulario pide modalidad, fecha y horario. En v1 la fecha aparece como año-mes-día; PR #2 propone mostrarla en formato legible y conservar el valor ISO (H4). |
| Control del usuario | Volver desde el resumen conserva datos. La confirmación de cancelación permite conservar la reserva. |
| Consistencia | Buscar tutoría y Mis reservas están disponibles en todas las vistas. |
| Prevención de errores | En v1 la validación impide el doble registro, aunque el selector aún ofrece la hora ocupada; PR #2 añade su indicación en el selector (H3). |
| Reconocimiento | En v1 los botones de docentes repiten el mismo texto (H2). |
| Eficiencia | El filtro admite parte del nombre o materia y tolera tildes. |
| Diseño minimalista | La tarjeta presenta el docente y la asignatura antes de abrir el formulario. |
| Recuperación | El mensaje identifica la falta de horario. El foco en v1 permanece en el botón de revisión (H1). |
| Ayuda | El buscador incluye un ejemplo y comunica qué hacer si la consulta queda vacía de resultados. |

Referencia: [Heurísticas de Nielsen](https://www.nngroup.com/articles/ten-usability-heuristics/).

## Recorrido cognitivo
Se inspeccionaron cuatro preguntas por paso: ¿el estudiante tendrá el objetivo adecuado?, ¿verá la acción?, ¿asociará la acción con el objetivo?, ¿reconocerá el resultado? Las respuestas son predicciones de inspección.

| Paso | Objetivo | Acción visible | Asociación | Resultado reconocible |
|---|---|---|---|---|
| Buscar materia | Encontrar apoyo concreto | Campo con ejemplo | La etiqueta acepta docente o asignatura | Conteo y tarjetas filtradas |
| Elegir docente | Abrir su agenda | Botón en cada tarjeta | En v1 «Elegir docente» requiere volver a leer la tarjeta; v2 incorpora el nombre | El formulario repite asignatura y docente |
| Completar datos | Llegar al resumen | Revisar reserva | La acción indica revisión previa | Un error conserva lo escrito; v2 enfoca el campo |
| Mover una hora | Cambiar la reserva existente | Modificar en tarjeta confirmada | Los datos precargados muestran qué se está editando | Mis reservas conserva una tarjeta con la nueva hora |
| Cancelar | Retirar la sesión correcta | Cancelar en la tarjeta | El resumen permite reconocer la cita | Confirmación o retorno a la reserva activa |

## Revisión parcial de accesibilidad
| Criterio de WCAG 2.2 | Comprobación | Resultado o alcance |
|---|---|---|
| 1.3.1 Información y relaciones | Inspección de HTML | Encabezados, navegación y etiquetas envuelven controles nativos |
| 2.1.1 Teclado | Inspección de los controles | Botones, campo de búsqueda, fecha y listas son nativos; comprobar la secuencia completa con el teclado del participante |
| 2.4.7 Foco visible | Inspección de CSS y captura de error | Regla focus-visible con contorno; v2 destaca además el campo inválido |
| 3.3.1 Identificación de errores | Omitir horario al revisar | Ambas versiones indican el dato que falta; v2 vincula mensaje y campo |
| 4.1.3 Mensajes de estado | Inspección de la interfaz | Conteo y confirmaciones usan role=status, errores usan role=alert. Pendiente escucha con lector de pantalla |

Referencia: [Criterios WCAG 2.2](https://www.w3.org/TR/WCAG22/). Esta revisión cubre los elementos de la tabla.

## Hallazgos y backlog
Escala de severidad: 0 sin problema, 1 cosmético, 2 menor, 3 mayor, 4 bloqueante.

| ID | Evidencia y forma de reproducir | Severidad estimada | Recomendación y estado |
|---|---|---:|---|
| H1 | Dejar horario vacío y pulsar Revisar. El foco en v1 continúa en el botón. Ver [antes](../evidencias/antes/error-horario.png) y [después](../evidencias/despues/error-horario.png). | 3 | Llevar el foco al campo inválido y asociar el mensaje. Corregido y verificado en v2. |
| H2 | Los tres botones de selección comparten etiqueta en [v1](../evidencias/antes/seleccion.png); esto dificulta distinguirlos al recorrer solo botones. | 2 | Incluir el nombre del docente. Implementado en [v2](../evidencias/despues/seleccion.png). |
| H3 | `tests/interfaz.cjs` ahora comprueba en el recorrido posterior que, tras guardar una reserva a las 14:00, esa hora queda deshabilitada al iniciar otra para la misma fecha; al editar la primera, la hora propia de las 09:00 permanece disponible. La ejecución depende de integrar PR #2. | 2 | Cambio propuesto en PR #2: deshabilitar horarios ocupados y explicar el motivo. Pendiente ejecutar la prueba sobre la versión integrada y contrastar con sesiones reales. |
| H4 | `tests/interfaz.cjs` ahora comprueba que la tarjeta muestra «6 de mayo de 2099» y conserva `datetime="2099-05-06"`. La ejecución depende de integrar PR #2. | 1 | Cambio propuesto en PR #2: mostrar la fecha con el mes en palabras y conservar el valor ISO. Pendiente ejecutar la prueba sobre la versión integrada y contrastar con sesiones reales. |

H1 y H2 se priorizaron por su impacto en la corrección de errores y en la identificación de controles antes de reservar. H3 cuenta con validación y recuperación. Contrastar esta prioridad con observaciones reales de P01/P02 cuando estén publicadas.

**Reevaluación técnica v2.** El script de Persona 4 contiene aserciones para la disponibilidad de horarios y el formato de fecha descritos en H3 y H4. La sintaxis pasó `node --check`; la ejecución de extremo a extremo queda pendiente hasta integrar PR #2 y correr las pruebas con Edge/Playwright. No se atribuyen mejoras ni dificultades a participantes: las filas disponibles de `Sebastian_Vaca` están marcadas `SIMULADO`. Completar la comparación v1/v2 con notas anonimizadas de las sesiones reales y repetir las tareas en v2.
