# Inspección y reevaluación técnica

La inspección se basa en las pantallas, el código y recorridos automatizados en Edge. Los valores de severidad son estimaciones de diseño. Las sesiones con personas deben aportar sus propios resultados.

## Inspección heurística
| Heurística de Nielsen | Observación de la aplicación |
|---|---|
| Visibilidad del estado | Confirmar y cancelar producen mensajes y una tarjeta con el estado textual. |
| Lenguaje familiar | El formulario pide modalidad, fecha y horario. El resumen escribe la fecha en formato año-mes-día (H4). |
| Control del usuario | Volver desde el resumen conserva datos. La confirmación de cancelación permite conservar la reserva. |
| Consistencia | Buscar tutoría y Mis reservas están disponibles en todas las vistas. |
| Prevención de errores | La validación impide el doble registro en la misma hora, pero el selector todavía ofrece esa hora (H3). |
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
| H3 | En el formulario la lista se construye desde las cuatro horas fijas. Tras reservar, la hora ocupada sigue en el selector y el conflicto se detecta al revisar. Ver opciones y validar en el código. | 2 | Pendiente. Deshabilitar horas ocupadas al elegir fecha y señalar el motivo. Prueba de aceptación: hora ocupada indisponible y hora actual editable al modificar. |
| H4 | La función detalle imprime la fecha almacenada como año-mes-día en resumen y tarjeta. | 1 | Pendiente. Mostrar fecha con mes en palabras para facilitar su lectura. Verificar que el valor guardado conserve su formato. |

H1 y H2 se priorizaron por su impacto en la corrección de errores y en la identificación de controles antes de reservar. H3 cuenta con validación y recuperación. Contrastar esta prioridad con observaciones del equipo y de P01/P02.

**Reevaluación técnica v2.** Se repitió la misma secuencia en ambas versiones. En v1 el foco tras el error fue «Revisar reserva» y en v2 fue el campo «hora». Las capturas muestran los cambios de etiqueta. El recorrido completo de registro, edición y cancelación terminó en ambas versiones. Incorporar al informe final los resultados con personas por separado.
