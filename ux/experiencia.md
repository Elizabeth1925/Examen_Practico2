# El recorrido de reserva

**Perfil de diseño.** Estudiante que organiza una tutoría entre clases, a menudo desde un teléfono. Necesita reconocer su asignatura, elegir una sesión compatible con su agenda y comprobar después qué reservó. Este perfil y sus emociones son hipótesis de diseño.

| Contacto | Pregunta del estudiante | Emoción prevista (1–5) | Oportunidad y razón |
|---|---|---|---|
| Buscar asignatura | ¿Ofrecen apoyo para mi materia? | 3 · expectación | Admitir nombre o asignatura y mostrar el conteo de resultados |
| Elegir docente | ¿Quién imparte esta tutoría? | 4 · confianza | Mantener materia y docente juntos para facilitar el reconocimiento |
| Elegir fecha y hora | ¿Puedo asistir a esa hora? | 2 · incertidumbre | Momento crítico. Conservar selecciones al corregir un horario reduce el trabajo repetido |
| Confirmar | ¿Quedó registrada? | 4 · alivio | Momento crítico. Mostrar un resumen antes y el estado después permite detectar equivocaciones |
| Consultar y gestionar | ¿Puedo cambiarla si hay un cruce? | 5 · control | Agrupar modificación y cancelación con la reserva correspondiente |

**Curva emocional prevista** (de izquierda a derecha, en el orden de la tabla)

```text
5 |                         ●
4 |       ●           ●
3 | ●
2 |             ●
1 |
    Buscar Elegir Horario Confirmar Consultar
```

Durante P01 y P02, anotar en qué paso hubo dudas o retrocesos. Preguntar al finalizar qué paso generó mayor incertidumbre y contrastar las respuestas con la curva.

## Contraste entre hipótesis, verificación técnica y sesiones

> **Distinción metodológica:** las filas actuales de [resultados.csv](../evaluacion/resultados.csv) y [evidencias-simuladas.md](../evaluacion/evidencias-simuladas.md) están marcadas como `SIMULADO`, por lo que **no validan empíricamente la curva con personas reales**. A continuación se separa explícitamente lo que sigue siendo hipótesis de diseño, lo verificado técnicamente en v2 y las dudas previstas para contrastar con P01 y P02 reales.

| Contacto | Hipótesis inicial (emoción) | Verificación técnica v1 → v2 | Contraste provisional y foco para sesiones reales |
|---|---|---|---|
| Buscar asignatura | 3 · expectación | Filtro sin tildes y conteo con `role="status"` comprobados en `tests/interfaz.cjs` (`bases` → 1 resultado). | Sin fricción técnica; validar con P01/P02 si el ejemplo del buscador basta para iniciar T1. |
| Elegir docente | 4 · confianza | **H2 corregido:** los botones pasaron de texto repetido (*Elegir docente*) a incluir el nombre del docente (*Elegir a Diego Vega*). | Hipótesis ajustada: en v1 la ambigüedad de botones reducía el reconocimiento al recorrer solo acciones. |
| Elegir fecha y hora *(momento crítico 1)* | 2 · incertidumbre | **H1 y H3 corregidos:** foco automático con `aria-invalid` al faltar hora y deshabilitación de horas ocupadas (`(Ocupado)` + aviso `#aviso-horas`), manteniendo libre la hora propia al editar. | En la simulación (SIM-P01/SIM-P02) este contacto concentró errores por omisión de horario; comprobar con personas reales si H1 y H3 reducen la incertidumbre. |
| Confirmar *(momento crítico 2)* | 4 · alivio | **H4 corregido:** el resumen y las tarjetas muestran la fecha con mes en palabras (`6 de mayo de 2099`) conservando `AAAA-MM-DD` al volver a editar y en almacenamiento. | Verificar con P01/P02 que el paso previo de revisión evita errores de fecha sin alargar innecesariamente la tarea. |
| Consultar y gestionar | 5 · control | Edición sin duplicados y confirmación antes de cancelar verificadas en `tests/reservas.test.js` y `tests/interfaz.cjs`. | En la simulación de v1 se anticipó confusión al interpretar «mover» como nueva reserva (T2); validar en sesiones reales si las acciones *Modificar* y *Cancelar* son descubiertas sin ayuda. |

**Oportunidades de mejora justificadas:** los dos momentos críticos (*Elegir fecha y hora* y *Confirmar*) concentran el mayor riesgo de error y pérdida de tiempo entre clases; por ello se priorizaron la recuperación sin pérdida de borrador con foco visible (H1), la prevención de cruces antes de enviar (H3) y la legibilidad de fechas en revisión y tarjetas (H4). El contraste definitivo de la curva queda abierto a las notas reales anonimizadas de P01 y P02.

