# Inspección y reevaluación técnica

La inspección se basa en las pantallas, el código y recorridos automatizados en Edge. Los valores de severidad son estimaciones de diseño. Las sesiones con personas deben aportar sus propios resultados.

**Aporte de integración y validación v2.** Tras integrar las ramas de los cuatro integrantes en `main`, se ejecutaron las 8 pruebas unitarias (`node --test tests/reservas.test.js`, 8/8 aprobadas) y el recorrido automatizado completo en Microsoft Edge con Playwright (`node tests/interfaz.cjs antes` y `node tests/interfaz.cjs despues`, ambos aprobados sin errores). Quedaron verificados en v2 la deshabilitación de horarios ocupados al crear, la conservación de la hora propia al editar (H3) y la fecha legible con valor ISO conservado (H4). En [resultados.csv](resultados.csv) las filas se conservan anonimizadas (`P00`, `P01`, `P02`) y marcadas como `SIMULADO`; no se presentan como mediciones reales con personas.

## Inspección heurística
| Heurística de Nielsen | Observación de la aplicación |
|---|---|
| Visibilidad del estado | Confirmar y cancelar producen mensajes y una tarjeta con el estado textual. |
| Lenguaje familiar | El formulario pide modalidad, fecha y horario. En v1 la fecha aparece como año-mes-día; en v2 se muestra con mes en palabras conservando `AAAA-MM-DD` (H4). |
| Control del usuario | Volver desde el resumen conserva datos. La confirmación de cancelación permite conservar la reserva. |
| Consistencia | Buscar tutoría y Mis reservas están disponibles en todas las vistas. |
| Prevención de errores | En v1 la validación impide el doble registro, aunque el selector aún ofrece la hora ocupada; en v2 las horas ocupadas se deshabilitan y explican al elegir fecha (H3). |
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
| H3 | En v1 las horas ocupadas seguían habilitadas en el selector. En v2, [tests/interfaz.cjs](../tests/interfaz.cjs) y [tests/reservas.test.js](../tests/reservas.test.js) comprueban que tras guardar una reserva a las 14:00 esa hora queda deshabilitada al crear otra en la misma fecha (con aviso en `#aviso-horas`) y que al editar una reserva su propia hora sigue disponible. | 2 | Deshabilitar horarios ocupados y señalar el motivo. Corregido y verificado técnicamente en v2; pendiente contraste con sesiones reales. |
| H4 | En v1 `detalle()` imprimía `AAAA-MM-DD`. En v2, [tests/interfaz.cjs](../tests/interfaz.cjs) comprueba que la tarjeta muestra «6 de mayo de 2099» y conserva `<time datetime="2099-05-06">` y el día exacto al volver al formulario. | 1 | Mostrar la fecha con el mes en palabras y conservar el valor ISO. Corregido y verificado técnicamente en v2; pendiente contraste con sesiones reales. |

H1 y H2 se priorizaron por su impacto en la corrección de errores y en la identificación de controles antes de reservar; H3 y H4 se integraron y verificaron en v2 sobre `main`. Contrastar esta prioridad con observaciones reales de P01/P02 cuando sustituyan a los registros simulados.

**Reevaluación técnica v2.** Sobre `main` integrado se ejecutaron `node --test tests/reservas.test.js` (8/8 aprobadas), `node tests/interfaz.cjs antes` (foco en error: «Revisar reserva») y `node tests/interfaz.cjs despues` (foco en error: «hora», verificación de H3, H4, móvil `390×844`, escritorio `1280×800` y aislamiento del prototipo `/ux/prototipo/`, sin errores de consola). No se atribuyen mejoras ni dificultades a personas reales porque las filas actuales de [resultados.csv](resultados.csv) están marcadas como `SIMULADO`; sustituirlas por sesiones reales anonimizadas antes de concluir la reevaluación con usuarios.
