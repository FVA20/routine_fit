import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';

function EjercicioAnimado({ imagenes }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [frameActual, setFrameActual] = useState(0);

  useEffect(() => {
    const ciclo = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setFrameActual(f => (f === 0 ? 1 : 0));
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    };
    const intervalo = setInterval(ciclo, 900);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <View style={styles.gifContainer}>
      <Animated.Image
        source={imagenes[frameActual]}
        style={[styles.gif, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
}

const ejerciciosPorGrupo = {
  'Cuádriceps': [
    {
      nombre: 'Sentadilla en Máquina Smith',
      descripcion:
        'Para un mayor control en técnica, es bueno para hipertrofiar y hacer que el músculo se estimule mejor. Tener en cuenta la postura y la distancia de los pies, para que se pueda sentir el músculo de una manera efectiva.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y progresivas',
      imagenes: [
        require('../assets/logosentadilla1.png'),
        require('../assets/logosentadilla2.png'),
      ],
    },
    {
      nombre: 'Sentadilla con Barra Libre',
      descripcion:
        'Para mayor fuerza y resistencia. Para personas que ya tienen técnica y control al bajar. No apto para personas que recién empiezan a entrenar. No es recomendada para hipertrofia, por lo que no hay ningún soporte y puede causar lesiones.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
      imagenes: [
        require('../assets/logosentadilla3.png'),
        require('../assets/logosentadilla4.png'),
      ],
    },
    {
      nombre: 'Máquina Hack',
      descripcion:
        'Para una estimulación completa y mejor crecimiento muscular. La realización del ejercicio es como la de una sentadilla, pero de manera vertical, haciendo que el músculo tenga un rango de mayor profundidad. Tener en cuenta la posición al bajar y la distancia de los pies.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
      imagenes: [
        require('../assets/ejerciciohack1.png'),
        require('../assets/ejerciciohack2.png'),
      ],
    },
    {
      nombre: 'Máquina Prensa',
      descripcion:
        'Mayor crecimiento muscular, mayor fuerza y resistencia. La realización de este ejercicio es eficaz para el crecimiento muscular del cuádricep. Se tiene que mantener cuidado al realizarlo por la postura de las piernas al bajar, siempre se tiene que mantener una pequeña intersección con la rodilla, es decir no estirarla por completo para evitar lesiones o desgarros de tendones.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
      imagenes: [
        require('../assets/ejercicioprensa1.png'),
        require('../assets/ejercicioprensa2.png'),
      ],
    },
    {
      nombre: 'Zancadas',
      descripcion:
        'Ejercicio con un gran rango y resistencia. Para la realización del ejercicio se puede hacer con peso o sin peso, dependiendo de la experiencia de la persona. Al hacerlo sin peso son para personas que recién empiezan a entrenar, mayor facilidad al realizarlo, mejor control y estimulación perfecta. Para personas con experiencia o avanzadas, lo más recomendado es realizarlo con mancuerna para una mejor estabilidad, una mejor estimulación y teniendo un rango de bajada que será eficaz al crecimiento muscular.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
      imagenes: [
        require('../assets/ejerciciozancadas1.png'),
        require('../assets/ejerciciozancadas2.png'),
      ],
    },
    {
      nombre: 'Sentadilla Goblet',
      descripcion:
        'Ejercicio con una gran eficacia al llevar al fallo muscular. La realización del ejercicio se debe tener en cuenta la posición de los pies y el rango de bajada. Lo más recomendable es pisando con el talón un disco, para que al realizarlo sea más fácil la postura. Al subir siempre tiene que tener una intersección con la rodilla, para que solo el músculo indicado sea estimulado y no haya ningún otro músculo involucrado.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso único',
      imagenes: [
        require('../assets/ejerciciogooblet1.png'),
        require('../assets/ejerciciogooblet2.png'),
      ],
    },
    {
      nombre: 'Extensiones en Máquina',
      descripcion:
        'Uno de los mejores ejercicios para obtener un crecimiento de la cabeza larga del cuádriceps. La realización del ejercicio se debe hacer de manera controlada para que tenga una mejor estimulación. Se debe tener en cuenta que la bajada tiene que ser controlada para evitar lesiones. Al subir, apretar por 2 segundos para obtener un mejor estímulo y poder llegar al fallo muscular.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
      imagenes: [
        require('../assets/extension1.png'),
        require('../assets/extension2.png'),
      ],
    },
  ],
  'Femorales': [
    {
      nombre: 'Curl Femoral Acostado',
      descripcion:
        'Uno de los mejores ejercicios para el trabajo de femoral con mejor rango y amplitud. El ejercicio se debe desarrollar de una manera que no involucre la espalda ni la lumbar. Se debe acostar por completo, con la espalda recta y con el glúteo parado. Tiene que tener en cuenta que el ejercicio se tiene que hacer de manera controlada para un mayor estímulo al músculo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
      imagenes: [
        require('../assets/femoralechado1.png'),
        require('../assets/femoralechado2.png'),
      ],
    },
    {
      nombre: 'Curl Femoral Sentado',
      descripcion:
        'Ejercicio más controlado y con buena estimulación al músculo. Al realizar el ejercicio se tiene que tener en cuenta que al bajar tiene que aguantar 2 segundos para que se estimule bien el músculo. La subida se tiene que hacer de manera controlada, para no involucrar otro músculo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
      imagenes: [
        require('../assets/femoralsentado1.png'),
        require('../assets/femoralsentado2.png'),
      ],
    },
    {
      nombre: 'Peso Muerto Rumano',
      descripcion:
        'Ejercicio con un gran rango de estimulación. Al realizar este ejercicio se tiene que tener en cuenta el rango de bajada. Para las personas que recién empiezan en el gym es recomendable realizarlo con mancuernas para que tengan mejor equilibrio. En cambio las personas que ya son avanzadas o con experiencia es recomendable con barra. El rango de bajada se tiene que hacer sin doblar mucho la parte de la rodilla y manteniendo una postura sacando glúteos para que se pueda sentir el estímulo. Al subir se tiene que apretar el glúteo para que no involucre la lumbar, pero toda la estimulación se va a sentir en el femoral.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso único',
      imagenes: [
        require('../assets/pesorumano1.png'),
        require('../assets/pesorumano2.png'),
      ],
    },
  ],
  'Glúteos': [
    {
      nombre: 'Búlgaras',
      descripcion:
        'Uno de los ejercicios con buena estimulación. Al realizar el ejercicio se tiene que tener en cuenta la distancia de las piernas. Lo más recomendable para personas que recién comienzan en el gym es hacerlo sin peso o con mancuernas de poco peso, para que tengan un mejor control. En cambio para las personas con experiencia o con mayor control se recomienda hacerlo en una máquina Smith para un mejor rango y mejor fatiga muscular. Tener en cuenta el rango del ejercicio para evitar lesiones con la lumbar.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso único',
      imagenes: [
        require('../assets/bulgara1.png'),
        require('../assets/bulgara2.png'),
      ],
    },
    {
      nombre: 'Hip Thrust',
      descripcion:
        'Uno de los mejores ejercicios para una gran estimulación. Al realizar este ejercicio tener en cuenta la posición y la distancia de las piernas. El ejercicio se realiza con barra. Para las personas que recién comienzan es más factible hacerlo sin peso, para que aprendan la técnica. Para las personas con experiencia o avanzadas pueden realizarlo con un peso que controlen de manera controlada. Si no controlan la bajada pueden causar lesiones a la lumbar.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
      imagenes: [
        require('../assets/hiptrust1.png'),
        require('../assets/hiptrust2.png'),
      ],
    },
    {
      nombre: 'Patada en Polea',
      descripcion:
        'Uno de los mejores ejercicios para llegar a la fatiga muscular. Al realizar el ejercicio tener en cuenta la posición y el rango de la polea. Se recomienda que el jalón de la polea esté en tu cintura, para que al realizar la patada tengas un mayor estímulo y de una manera controlada. Siempre apoyándose a la polea y estirar toda la pierna apretando el glúteo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso único',
      imagenes: [
        require('../assets/patada1.png'),
        require('../assets/patada2.png'),
      ],
    },
  ],
  'Pantorrillas': [
    {
      nombre: 'Elevación de Pantorrillas de Pie en Máquina Smith',
      descripcion:
        'Uno de los ejercicios para estimulamiento de gemelos. Al realizar el ejercicio se tiene que hacer de manera controlada.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso único',
      imagenes: [
        require('../assets/pantorilla1.png'),
        require('../assets/pantorilla2.png'),
      ],
    },
    {
      nombre: 'Extensión de Gemelos en Máquina',
      descripcion:
        'Uno de los mejores ejercicios con más rango de bajada. Al realizar el ejercicio se tiene que tener en cuenta el peso. Se tiene que realizar de una manera controlada para que se llegue a una fatiga muscular.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso único',
      imagenes: [
        require('../assets/pantorilla3.png'),
        require('../assets/pantorilla4.png'),
      ],
    },
  ],
  'Aductores': [
    {
      nombre: 'Máquina de Aductores',
      descripcion:
        'Uno de los mejores ejercicios con excelente estimulación para la parte de aducción de la pierna. Al realizarse el ejercicio se tiene que tener en cuenta la apertura de las piernas, por el mismo motivo de que no haya desgarros ni lesiones.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
      imagenes: [
        require('../assets/aductor1.png'),
        require('../assets/aductor2.png'),
      ],
    },
  ],
  'Abductores': [
    {
      nombre: 'Máquina de Abductores',
      descripcion:
        'Uno de los mejores ejercicios para abducción. Al realizar este ejercicio se tiene que tener en cuenta el estímulo que generan, hacerlo de manera controlada y con un rango que se estimule correctamente.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
      imagenes: [
        require('../assets/abductor1.png'),
        require('../assets/abductor2.png'),
      ],
    },
  ],
  'Pecho': [
    {
      nombre: 'Press Inclinado',
      descripcion:
        'Ejercicio enfocado en la parte superior del pecho. Se puede realizar con barra o mancuernas. Al realizarlo se tiene que tener en cuenta el ángulo del banco, lo más recomendable es entre 30° y 45°. La bajada tiene que ser controlada hasta que la barra o mancuerna quede a la altura del pecho, apretando el músculo al subir para una mayor estimulación. Para personas que recién comienzan se recomienda con mancuernas de poco peso para aprender la técnica.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
    },
    {
      nombre: 'Press Plano',
      descripcion:
        'Ejercicio básico y fundamental para el desarrollo del pecho. Se puede realizar con barra o mancuernas. Con barra se trabaja más fuerza y volumen, con mancuernas se obtiene mayor rango de movimiento y mejor estimulación. La bajada tiene que ser controlada hasta el pecho, sin rebotar. Al subir, apretar el pecho para una mayor contracción muscular. Tener en cuenta la posición de los codos para no involucrar demasiado los hombros.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
    },
    {
      nombre: 'Apertura en Polea',
      descripcion:
        'Ejercicio de aislamiento que trabaja el pecho con tensión constante en todo el rango de movimiento. Se realiza con las poleas en posición alta, media o baja según la parte del pecho que se quiera estimular. Al realizar el ejercicio se tiene que mantener una ligera flexión en los codos durante todo el movimiento. Juntar las manos al frente apretando el pecho por 2 segundos para maximizar la contracción. La vuelta tiene que ser controlada para sentir el estiramiento del músculo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Apertura en Máquina',
      descripcion:
        'Ejercicio de aislamiento con mayor control y estabilidad que la polea. Al realizarlo se tiene que mantener la espalda pegada al respaldo y los codos ligeramente flexionados durante todo el movimiento. Al cerrar los brazos apretar el pecho por 2 segundos para una mayor contracción. La apertura tiene que ser controlada para sentir el estiramiento completo del músculo. Es ideal para congestionar el pecho al final del entrenamiento.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Fondos',
      descripcion:
        'Ejercicio compuesto con el propio peso corporal que trabaja principalmente el pecho inferior, tríceps y hombros. Para enfocarlo más en el pecho se inclina el torso levemente hacia adelante durante la bajada. La bajada tiene que ser controlada hasta sentir el estiramiento del pecho, sin bajar en exceso para evitar lesiones en el hombro. Al subir, apretar el pecho y los tríceps. Para personas principiantes se puede usar una máquina de fondos asistida hasta ganar fuerza suficiente.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso corporal',
    },
    {
      nombre: 'Planchas',
      descripcion:
        'Ejercicio con el propio peso corporal que trabaja el pecho, tríceps, hombros y core. Las manos deben estar ligeramente más anchas que los hombros. La bajada tiene que ser controlada hasta que el pecho casi toque el suelo, manteniendo el cuerpo recto en todo momento sin hundir la cadera ni elevar los glúteos. Al subir, apretar el pecho y los tríceps. Para personas principiantes se puede hacer con las rodillas apoyadas en el suelo. Para mayor dificultad se pueden hacer con los pies elevados.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso corporal',
    },
    {
      nombre: 'Máquina Hammer para Pecho',
      descripcion:
        'Ejercicio de aislamiento con excelente control y tensión constante sobre el pecho. La máquina Hammer permite trabajar de manera unilateral o bilateral, lo que ayuda a corregir desbalances entre ambos lados. Al realizar el ejercicio se tiene que mantener la espalda completamente pegada al respaldo y los pies apoyados en el suelo. El empuje tiene que ser controlado, apretando el pecho al extender los brazos por 2 segundos para maximizar la contracción. La vuelta tiene que ser lenta para sentir el estiramiento completo del músculo y aprovechar la fase excéntrica.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
  ],
  'Espalda': [
    {
      nombre: 'Jalón al Pecho',
      descripcion:
        'Ejercicio fundamental para el desarrollo del dorsal ancho. Se realiza en la máquina de jalón con agarre prono y más ancho que los hombros. Al bajar la barra se tiene que llevar hacia el pecho superior manteniendo el torso ligeramente inclinado hacia atrás. Es importante no usar el peso del cuerpo para jalar, sino concentrar el movimiento en los dorsales. Al subir se controla la vuelta para sentir el estiramiento completo de la espalda.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Remo en Máquina',
      descripcion:
        'Ejercicio con excelente control y estabilidad para trabajar el grosor de la espalda. Al realizarlo se tiene que mantener la espalda recta y el pecho apoyado en el soporte de la máquina. El tirón tiene que ser hacia la cadera, apretando los omóplatos al finalizar el movimiento por 2 segundos para una mayor contracción. La vuelta se hace de manera controlada para aprovechar la fase excéntrica y sentir el estiramiento de la espalda.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Remo en Polea',
      descripcion:
        'Ejercicio de tracción horizontal que trabaja el grosor de la espalda con tensión constante. Se realiza sentado frente a la polea baja. Al tirar se tiene que mantener la espalda recta, llevar los codos hacia atrás y apretar los omóplatos al finalizar. No se debe inclinar el torso hacia adelante y hacia atrás para generar impulso, ya que esto reduce la efectividad del ejercicio. La vuelta tiene que ser controlada estirando bien la espalda.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Pullover en Polea',
      descripcion:
        'Ejercicio de aislamiento para el dorsal ancho con tensión constante en todo el rango de movimiento. Se realiza de pie frente a la polea alta, tomando la barra o cuerda con ambas manos. Con los brazos casi extendidos y una ligera flexión en los codos, se jala hacia abajo y atrás llevando los brazos hasta la altura de las caderas. Al llegar abajo se aprieta el dorsal por 2 segundos para maximizar la contracción. La vuelta tiene que ser lenta y controlada para sentir el estiramiento completo del músculo. Es importante no doblar demasiado los codos durante el movimiento para mantener el enfoque en el dorsal.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Remo en T',
      descripcion:
        'Ejercicio compuesto que trabaja el grosor de la espalda media con gran efectividad. Al realizarlo se tiene que mantener la espalda recta y el torso inclinado entre 45° y 60°. El tirón se hace hacia el abdomen llevando los codos hacia atrás y apretando los omóplatos al final del movimiento. Las rodillas deben estar ligeramente flexionadas para proteger la lumbar. La bajada tiene que ser controlada para sentir el estiramiento completo de la espalda.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Remo en Smith',
      descripcion:
        'Variante del remo con barra pero con mayor control al usar la máquina Smith. Al realizarlo se tiene que inclinar el torso a unos 45° con la espalda recta. El tirón se hace llevando la barra hacia el abdomen y apretando los omóplatos al finalizar. La máquina Smith permite enfocarse completamente en la contracción de la espalda sin preocuparse por el equilibrio. La bajada tiene que ser lenta y controlada para aprovechar la fase excéntrica.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Jalón al Pecho Agarre Supino',
      descripcion:
        'Variante del jalón al pecho con las palmas mirando hacia ti. Este agarre permite una mayor activación del dorsal ancho y del bíceps, facilitando una contracción más intensa. Al bajar la barra se lleva al pecho superior con el torso ligeramente inclinado hacia atrás. Es ideal para personas que buscan mayor énfasis en el dorsal y mayor reclutamiento muscular. La vuelta tiene que ser controlada para sentir el estiramiento completo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Peso Muerto para Lumbar',
      descripcion:
        'Ejercicio fundamental para fortalecer la zona lumbar, glúteos e isquiotibiales. Al realizarlo se tiene que mantener la espalda recta en todo momento, nunca redondear la lumbar. La bajada se hace controlada doblando las caderas hacia atrás mientras se mantiene la barra cerca del cuerpo. Al subir se aprieta el glúteo y se extiende la cadera completamente. Para personas principiantes se recomienda comenzar con peso ligero para dominar la técnica antes de aumentar la carga.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Jalón al Pecho Agarre Cerrado',
      descripcion:
        'Variante del jalón con agarre neutro y más estrecho que activa de manera diferente el dorsal ancho y los músculos del centro de la espalda. Al bajar la barra o el triángulo se lleva hacia el pecho apretando los omóplatos al finalizar. Este agarre reduce la tensión en los hombros y permite una mayor contracción del dorsal. Es una excelente opción para añadir variedad al entrenamiento de jalón y trabajar fibras musculares distintas.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Dominadas',
      descripcion:
        'Ejercicio con el propio peso corporal considerado uno de los mejores para desarrollar el dorsal ancho y la fuerza de la espalda. El agarre es prono con las manos más anchas que los hombros. Al subir se llevan los codos hacia abajo y atrás apretando los dorsales. Es importante no usar impulso del cuerpo sino la fuerza de la espalda. Para personas principiantes se puede usar una banda de resistencia o la máquina de dominadas asistida. Para mayor dificultad se puede agregar peso con un cinturón.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso corporal',
    },
    {
      nombre: 'Remo en Polea Agarre Cerrado',
      descripcion:
        'Variante del remo en polea con agarre neutro y estrecho usando el triángulo. Este agarre activa con mayor énfasis la espalda media y los romboides. Al tirar se llevan los codos bien hacia atrás apretando los omóplatos con fuerza al finalizar. Se debe mantener el torso erguido y estático durante todo el movimiento. La vuelta tiene que ser lenta y controlada estirando bien la espalda para aprovechar el rango completo de movimiento.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Remo en Polea Agarre Abierto',
      descripcion:
        'Variante del remo en polea con agarre prono y ancho que trabaja con mayor énfasis la parte superior de la espalda, trapecio medio y deltoides posterior. Al tirar se llevan los codos hacia afuera y atrás, apretando la espalda alta al finalizar el movimiento. Se debe mantener la espalda recta y el torso estable durante todo el ejercicio. Es un excelente complemento al remo agarre cerrado para trabajar la espalda desde distintos ángulos.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
  ],
  'Hombros': [
    {
      nombre: 'Vuelos Laterales',
      descripcion:
        'Ejercicio de aislamiento fundamental para el desarrollo del deltoides lateral. Se realiza de pie o sentado con una mancuerna en cada mano. Los brazos se elevan hacia los lados hasta la altura de los hombros con una ligera flexión en los codos. Es importante no subir por encima de los hombros para evitar comprimir el manguito rotador. La bajada tiene que ser lenta y controlada para aprovechar la fase excéntrica. No se debe usar impulso del cuerpo ni balancear el torso para generar inercia.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Vuelos Frontales',
      descripcion:
        'Ejercicio de aislamiento para el deltoides anterior. Se realiza de pie con una mancuerna en cada mano o con barra. Los brazos se elevan hacia el frente hasta la altura de los hombros manteniendo una ligera flexión en los codos. Se puede realizar alternando un brazo a la vez o con ambos al mismo tiempo. La bajada tiene que ser controlada para sentir el trabajo del músculo en todo el rango. Es importante mantener el torso estático y no generar impulso con el cuerpo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Press Militar en Smith',
      descripcion:
        'Ejercicio compuesto para el desarrollo general del hombro con mayor control al usar la máquina Smith. Se puede realizar de pie o sentado. La barra baja hasta la altura de la barbilla o el pecho superior y se empuja hacia arriba extendiendo los brazos sin bloquear los codos al llegar arriba. La máquina Smith guía el movimiento permitiendo enfocarse en la contracción del deltoides. Es importante mantener el core activo y la espalda recta durante todo el ejercicio.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Press Militar con Mancuerna',
      descripcion:
        'Variante del press militar que permite mayor rango de movimiento y trabaja la estabilidad de cada hombro de forma independiente. Se realiza sentado o de pie con una mancuerna en cada mano a la altura de los hombros. Al empujar hacia arriba se acercan ligeramente las mancuernas en la parte superior sin chocarlas. La bajada tiene que ser controlada hasta que los brazos queden en ángulo recto. Al trabajar de forma bilateral se corrigen desbalances entre ambos lados del cuerpo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Press Militar en Máquina Hammer',
      descripcion:
        'Ejercicio compuesto con agarre neutro que reduce la tensión sobre las articulaciones del hombro comparado con el press tradicional. La máquina Hammer guía el movimiento de manera natural permitiendo una mayor activación del deltoides con menor riesgo de lesión. Al empujar hacia arriba se aprieta el hombro al extender los brazos y la bajada se hace de manera controlada. Es ideal para personas con molestias en el hombro o para congestionar el músculo al final del entrenamiento.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Tras Nuca en Smith',
      descripcion:
        'Variante del press militar donde la barra baja por detrás de la cabeza hasta la altura de la nuca. Trabaja con mayor énfasis el deltoides lateral y posterior. Al realizarlo se tiene que tener especial cuidado con la posición del cuello y no bajar la barra en exceso para evitar lesiones en el manguito rotador. Se recomienda solo para personas con buena movilidad en los hombros y experiencia previa en el press militar convencional. La bajada tiene que ser controlada y el movimiento fluido.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Posteriores en Máquina',
      descripcion:
        'Ejercicio de aislamiento enfocado en el deltoides posterior. Se realiza en la máquina de vuelos inversos con el pecho apoyado en el soporte. Los brazos se abren hacia los lados llevando los codos hacia atrás y apretando el deltoides posterior al finalizar el movimiento. Es importante no usar el trapecio para generar el movimiento sino concentrarlo en la parte trasera del hombro. La vuelta tiene que ser lenta y controlada. Este músculo suele estar poco desarrollado por lo que es clave incluirlo en el entrenamiento.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Vuelos Laterales en Máquina',
      descripcion:
        'Variante de los vuelos laterales en máquina con tensión constante en todo el rango de movimiento. Al realizarlo se tiene que ajustar bien la altura de los brazos para que el eje de la máquina quede alineado con la articulación del hombro. Los brazos se elevan hasta la altura de los hombros apretando el deltoides lateral al llegar arriba por 2 segundos. La bajada tiene que ser lenta y controlada para no perder la tensión muscular. Es ideal para llegar a la fatiga muscular al final del entrenamiento de hombros.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
  ],
  'Bíceps': [
    {
      nombre: 'Curl de Bíceps con Barra Z',
      descripcion:
        'Ejercicio básico y muy efectivo para el desarrollo del bíceps. La barra Z o EZ permite un agarre más natural que reduce la tensión sobre las muñecas y los codos comparado con la barra recta. Se realiza de pie con los codos pegados al cuerpo. La subida se hace contrayendo el bíceps y la bajada tiene que ser lenta y controlada para aprovechar la fase excéntrica. Es importante no balancear el torso ni usar el cuerpo para generar impulso, todo el movimiento debe concentrarse en el bíceps.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Curl de Bíceps con Barra',
      descripcion:
        'Ejercicio clásico para el desarrollo del bíceps con barra recta. El agarre prono con la barra recta genera mayor tensión en el bíceps y el antebrazo. Se realiza de pie con los codos pegados al cuerpo. Al subir se contrae el bíceps completamente llevando la barra hasta los hombros y la bajada se hace de forma lenta y controlada. No se debe bloquear los codos al extender completamente los brazos para mantener la tensión muscular en todo momento.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Curl de Bíceps con Mancuerna',
      descripcion:
        'Ejercicio de aislamiento que permite trabajar cada brazo de manera independiente corrigiendo desbalances musculares. Se puede realizar de pie o sentado, alternando un brazo a la vez o ambos simultáneamente. Al subir se puede supinar la muñeca girándola hacia afuera para una mayor contracción del bíceps. Los codos deben permanecer fijos a los costados del cuerpo durante todo el movimiento. La bajada tiene que ser lenta y controlada para aprovechar el estiramiento completo del músculo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Curls de Bíceps en Polea',
      descripcion:
        'Ejercicio de aislamiento con tensión constante en todo el rango de movimiento gracias a la polea. Se realiza de pie frente a la polea baja con agarre supino. Los codos se mantienen fijos a los costados del cuerpo mientras se sube la barra o cuerda contrayendo el bíceps. Al llegar arriba se aprieta el músculo por 2 segundos para maximizar la contracción. La bajada tiene que ser lenta y controlada sin dejar caer el peso. La tensión constante de la polea lo hace muy efectivo para la congestión muscular.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Curls de Bíceps en Máquina',
      descripcion:
        'Ejercicio de aislamiento con excelente control que elimina la posibilidad de hacer trampa con el cuerpo. La máquina fija los codos en una posición estable obligando al bíceps a realizar todo el trabajo. Al subir se contrae completamente el músculo apretándolo al llegar arriba y la bajada se hace de forma lenta para aprovechar la fase excéntrica. Es ideal para personas que buscan congestionar el bíceps al máximo o que tienen dificultad para aislar el músculo con ejercicios de peso libre.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Curl Martillo con Mancuerna',
      descripcion:
        'Variante del curl con agarre neutro que trabaja el bíceps braquial, el braquial y el braquiorradial del antebrazo. Se realiza de pie o sentado con las manos en posición neutral, como si se sostuviera un martillo. Los codos se mantienen fijos a los costados mientras se sube la mancuerna. Al llegar arriba se aprieta el músculo y la bajada se hace de forma controlada. Este ejercicio es muy efectivo para desarrollar el grosor del brazo y dar más volumen al bíceps visto de frente.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Curls de Bíceps con Banco Inclinado',
      descripcion:
        'Variante avanzada del curl con mancuerna que maximiza el estiramiento del bíceps gracias al ángulo del banco inclinado. Al recostarse en el banco inclinado entre 45° y 60° los brazos quedan por detrás del cuerpo generando un mayor rango de movimiento y un estiramiento más profundo del músculo. La subida se hace contrayendo el bíceps completamente y la bajada tiene que ser muy lenta para aprovechar al máximo la fase excéntrica. Es uno de los ejercicios más efectivos para desarrollar el pico del bíceps.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
  ],
  'Tríceps': [
    {
      nombre: 'Jalón en Polea con Cuerda',
      descripcion:
        'Ejercicio de aislamiento muy efectivo para el tríceps con tensión constante gracias a la polea. Se realiza de pie frente a la polea alta tomando la cuerda con ambas manos. Los codos se mantienen fijos a los costados del cuerpo mientras se empuja hacia abajo extendiendo los brazos completamente. Al llegar abajo se separan ligeramente los extremos de la cuerda hacia afuera para maximizar la contracción del tríceps. La vuelta tiene que ser lenta y controlada sin dejar que los codos se separen del cuerpo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Jalón en Polea con Barra',
      descripcion:
        'Variante del jalón de tríceps usando barra recta o barra Z. Los codos se mantienen fijos y pegados al cuerpo durante todo el movimiento. Al empujar hacia abajo se extienden los brazos completamente apretando el tríceps al llegar al punto final. La barra Z reduce la tensión sobre las muñecas y es más cómoda para muchas personas. La vuelta tiene que ser controlada sin dejar que los codos suban por encima de la cintura para mantener el aislamiento del músculo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Press Francés',
      descripcion:
        'Ejercicio compuesto que trabaja las tres cabezas del tríceps con gran efectividad. Se realiza acostado en un banco plano con barra Z o barra recta. Los codos apuntan hacia el techo y permanecen fijos mientras se baja la barra hacia la frente o por detrás de la cabeza. La bajada tiene que ser controlada para no golpear la frente y al subir se extienden los brazos completamente apretando el tríceps. Es importante mantener los codos estables y no abrirlos hacia los lados durante el movimiento.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Extensión Tras Nuca con Mancuerna',
      descripcion:
        'Ejercicio de aislamiento que trabaja principalmente la cabeza larga del tríceps con gran rango de movimiento. Se realiza sentado o de pie sosteniendo una mancuerna con ambas manos por encima de la cabeza. Los codos apuntan hacia arriba y permanecen fijos mientras se baja la mancuerna por detrás de la cabeza hasta sentir el estiramiento completo del tríceps. Al subir se extienden los brazos completamente apretando el músculo. Es fundamental mantener los codos cerca de la cabeza durante todo el movimiento.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Extensión Tras Nuca en Polea',
      descripcion:
        'Variante de la extensión tras nuca usando la polea baja que proporciona tensión constante en todo el rango de movimiento. Se realiza de pie de espaldas a la polea tomando la cuerda o barra por encima de la cabeza. Los codos apuntan hacia el techo y permanecen fijos mientras se extienden los brazos hacia arriba. Al llegar arriba se aprieta el tríceps por 2 segundos. La bajada tiene que ser lenta para sentir el estiramiento completo de la cabeza larga del músculo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Patada de Tríceps con Mancuerna',
      descripcion:
        'Ejercicio de aislamiento que trabaja el tríceps en su posición más contraída. Se realiza inclinado hacia adelante apoyando una mano y una rodilla en el banco. El codo se lleva hacia atrás a la altura de la cadera y desde ahí se extiende el brazo completamente hacia atrás apretando el tríceps al final del movimiento. La vuelta tiene que ser controlada. Es importante mantener el codo fijo y no balancearlo durante el ejercicio para un mejor aislamiento del músculo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Patada de Tríceps en Polea',
      descripcion:
        'Variante de la patada de tríceps usando la polea que ofrece tensión constante durante todo el rango de movimiento. Se realiza inclinado hacia adelante de espaldas a la polea baja. El codo se lleva hacia atrás a la altura de la cadera y desde ahí se extiende el brazo hacia atrás apretando el tríceps al llegar al punto final. Al mantener la tensión de la polea el músculo trabaja tanto en la fase concéntrica como en la excéntrica, lo que lo hace más efectivo que la versión con mancuerna.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Cruce de Poleas',
      descripcion:
        'Ejercicio de aislamiento para el tríceps que se realiza con las dos poleas altas simultáneamente. Se toman las cuerdas o agarres de cada polea y con los codos fijos a los costados se empuja hacia abajo y al frente extendiendo ambos brazos al mismo tiempo. Al llegar abajo se aprietan los tríceps por 2 segundos para maximizar la contracción. La vuelta tiene que ser lenta y simétrica. Este ejercicio es excelente para congestionar el tríceps al final del entrenamiento y trabajar ambos brazos con la misma carga simultáneamente.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
  ],
  'Antebrazos': [
    {
      nombre: 'Curl de Muñeca con Mancuerna Sentado',
      descripcion:
        'Ejercicio de aislamiento para el flexor del antebrazo. Se realiza sentado con el antebrazo apoyado sobre el muslo y la muñeca saliendo por el borde de la rodilla. Se toma la mancuerna con agarre supino y se flexiona la muñeca hacia arriba apretando el antebrazo al llegar arriba. La bajada tiene que ser lenta y controlada dejando bajar la muñeca lo más posible para aprovechar el rango completo de movimiento. Se puede realizar con ambos brazos al mismo tiempo o de forma alterna.',
      series: 4,
      repeticiones: 15,
      tipo: 'Series efectivas, peso ligero',
    },
    {
      nombre: 'Curl Invertido con Barra de Pie',
      descripcion:
        'Ejercicio que trabaja el extensor del antebrazo y el braquiorradial con agarre prono. Se realiza de pie tomando la barra con las palmas hacia abajo y los codos pegados al cuerpo. Se sube la barra flexionando las muñecas y los codos contrayendo el antebrazo y el bíceps braquial. La bajada tiene que ser controlada. Este ejercicio complementa muy bien el curl tradicional ya que trabaja el lado opuesto del antebrazo y ayuda a desarrollar el equilibrio muscular del brazo, reduciendo el riesgo de lesiones en muñecas y codos.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
    },
    {
      nombre: 'Curl de Antebrazo con Barra 1 Mano',
      descripcion:
        'Ejercicio de aislamiento unilateral para el flexor del antebrazo que permite trabajar cada brazo de forma independiente. Se realiza sentado con el antebrazo apoyado sobre el muslo y la muñeca saliendo por el borde de la rodilla tomando una barra corta con una sola mano en agarre supino. La flexión de la muñeca se hace de manera controlada llevándola hacia arriba y apretando el antebrazo al finalizar. La bajada tiene que ser lenta para aprovechar el estiramiento completo. Trabajar un brazo a la vez permite corregir desbalances y concentrarse mejor en la contracción del músculo.',
      series: 4,
      repeticiones: 15,
      tipo: 'Series efectivas, peso ligero',
    },
  ],
};

function TrackerSeries({ totalSeries, repeticiones }) {
  const [completadas, setCompletadas] = useState([]);

  const toggleSerie = (index) => {
    setCompletadas(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const resetear = () => setCompletadas([]);
  const todasCompletas = completadas.length === totalSeries;

  return (
    <View style={styles.trackerContainer}>
      <View style={styles.trackerHeader}>
        <Text style={styles.trackerTitulo}>
          Series completadas{' '}
          <Text style={todasCompletas ? styles.trackerContadorFin : styles.trackerContador}>
            {completadas.length}/{totalSeries}
          </Text>
        </Text>
        {completadas.length > 0 && (
          <TouchableOpacity onPress={resetear}>
            <Text style={styles.trackerReset}>Reiniciar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.trackerFilas}>
        {Array.from({ length: totalSeries }).map((_, i) => {
          const hecha = completadas.includes(i);
          return (
            <TouchableOpacity
              key={i}
              style={[styles.serieBotón, hecha && styles.serieBotónHecho]}
              onPress={() => toggleSerie(i)}
              activeOpacity={0.7}
            >
              <Text style={[styles.serieNumero, hecha && styles.serieNumeroHecho]}>
                {hecha ? '✓' : i + 1}
              </Text>
              <Text style={[styles.serieReps, hecha && styles.serieRepsHecho]}>
                {repeticiones} reps
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {todasCompletas && (
        <View style={styles.trackerFeliz}>
          <Text style={styles.trackerFelizTexto}>¡Series completadas! 💪</Text>
        </View>
      )}
    </View>
  );
}

export default function EjerciciosScreen({ navigation, route }) {
  const { grupo } = route.params;
  const ejercicios = ejerciciosPorGrupo[grupo] || [];
  const [seleccionado, setSeleccionado] = useState(null);

  // Vista detalle
  if (seleccionado !== null) {
    const ej = ejercicios[seleccionado];
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.back} onPress={() => setSeleccionado(null)}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>{ej.nombre}</Text>

        {/* Animación entre imágenes */}
        {ej.imagenes && ej.imagenes.length === 2 && (
          <EjercicioAnimado imagenes={ej.imagenes} />
        )}

        {/* Series y Repeticiones */}
        {ej.series && (
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumero}>{ej.series}</Text>
              <Text style={styles.statLabel}>Series</Text>
            </View>
            <View style={styles.separador} />
            <View style={styles.statBox}>
              <Text style={styles.statNumero}>{ej.repeticiones}</Text>
              <Text style={styles.statLabel}>Repeticiones</Text>
            </View>
            <View style={styles.separador} />
            <View style={styles.statBox}>
              <Text style={styles.statTipo}>{ej.tipo}</Text>
            </View>
          </View>
        )}

        {/* Tracker de series */}
        {ej.series && (
          <TrackerSeries totalSeries={ej.series} repeticiones={ej.repeticiones} />
        )}

        {/* Descripción */}
        {ej.descripcion ? (
          <View style={styles.descripcionBox}>
            <Text style={styles.descripcionTitulo}>Descripción</Text>
            <Text style={styles.descripcionTexto}>{ej.descripcion}</Text>
          </View>
        ) : (
          <Text style={styles.vacio}>Información próximamente...</Text>
        )}
      </ScrollView>
    );
  }

  // Vista lista
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>{grupo}</Text>
      <Text style={styles.subtitulo}>{ejercicios.length} ejercicio(s)</Text>

      {ejercicios.length === 0 ? (
        <Text style={styles.vacio}>Próximamente...</Text>
      ) : (
        ejercicios.map((ej, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemCard}
            onPress={() => setSeleccionado(index)}
          >
            <Text style={styles.itemNombre}>{ej.nombre}</Text>
            <Text style={styles.itemArrow}>→</Text>
          </TouchableOpacity>
        ))
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  back: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  titulo: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  vacio: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 60,
  },

  // Lista
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemNombre: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  itemArrow: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },

  // Detalle — GIF
  gifContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 16,
  },
  gif: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumero: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
  statTipo: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  separador: {
    width: 1,
    height: 40,
    backgroundColor: '#333',
  },

  // Tracker de series
  trackerContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  trackerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  trackerTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  trackerContador: {
    color: '#000',
  },
  trackerContadorFin: {
    color: '#22c55e',
  },
  trackerReset: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  trackerFilas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serieBotón: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  serieBotónHecho: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  serieNumero: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
  },
  serieNumeroHecho: {
    color: '#fff',
  },
  serieReps: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  serieRepsHecho: {
    color: '#aaa',
  },
  trackerFeliz: {
    marginTop: 14,
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  trackerFelizTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // Descripción
  descripcionBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  descripcionTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  descripcionTexto: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
});
