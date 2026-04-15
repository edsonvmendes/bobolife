import type { CharacterLanguage, RelationshipType } from "@/lib/types";
import { pickOne } from "@/lib/utils";

export const BOB_SOUL_TOPICS = [
  "midnight_guitar",
  "overdue_book",
  "silent_story_watcher",
  "almost_changed_course",
  "secret_spot",
  "rainy_childhood_memory",
  "old_print_archive",
] as const;

export type BobSoulTopic = (typeof BOB_SOUL_TOPICS)[number];

export const BOB_SOUL_FACTS: Record<
  BobSoulTopic,
  {
    label: string;
    description: string;
    triggers: RelationshipType[];
  }
> = {
  midnight_guitar: {
    label: "Violao da madrugada",
    description:
      "Bob toca um violao velho de madrugada quando esta ansioso, mesmo com uma corda meio ruim.",
    triggers: ["girlfriend", "crush", "ex", "friend", "sibling"],
  },
  overdue_book: {
    label: "Livro emprestado",
    description:
      "Bob esta devendo um livro ha meses, e isso volta como piada, cobranca ou desculpa de reencontro.",
    triggers: ["friend", "teacher", "ex", "crush"],
  },
  silent_story_watcher: {
    label: "Some mas ve stories",
    description:
      "Quando fica mal, Bob some do chat, mas continua assistindo os stories de todo mundo.",
    triggers: ["girlfriend", "crush", "friend", "sibling", "ex"],
  },
  almost_changed_course: {
    label: "Quase mudou de curso",
    description:
      "Bob quase largou ou trocou de curso uma vez, mas nunca teve coragem de contar direito para os pais.",
    triggers: ["mother", "father", "teacher", "friend"],
  },
  secret_spot: {
    label: "Lugar dele na cidade",
    description:
      "Existe um lugar pequeno da cidade onde Bob sempre reaparece quando precisa respirar ou pensar.",
    triggers: ["friend", "crush", "girlfriend", "sibling"],
  },
  rainy_childhood_memory: {
    label: "Memoria de chuva",
    description:
      "Certos cheiros e dias de chuva puxam uma memoria de infancia que mexe com o humor dele.",
    triggers: ["mother", "father", "sibling", "ex"],
  },
  old_print_archive: {
    label: "Arquivo de prints",
    description:
      "Bob guarda prints, audios e fotos antigas que nunca apaga, inclusive de coisas que ja acabaram.",
    triggers: ["girlfriend", "crush", "ex", "friend"],
  },
};

export const BOB_SOUL_BANKS = {
  pt: {
    midnight_guitar: [
      "ele tava no violao de novo ontem de madrugada",
      "quando o Bob pega aquele violao velho tarde da noite eu ja sei que tem coisa pegando",
      "o violao capenga dele sempre aparece quando ele nao consegue desligar a cabeca",
    ],
    overdue_book: [
      "inclusive o livro que o Bob prometeu devolver ainda esta desaparecido",
      "esse papo me lembra que o Bob segue devendo aquele livro ha seculos",
      "algum dia alguem vai recuperar o livro emprestado pro Bob e eu quero estar presente",
    ],
    silent_story_watcher: [
      "ele some do chat mas continua vendo os stories de todo mundo",
      "o Bob faz aquele truque classico de desaparecer e seguir online pelos stories",
      "nao adianta se esconder, ele pode sumir daqui mas os stories entregam tudo",
    ],
    almost_changed_course: [
      "as vezes eu acho que o Bob ainda pensa em trocar de curso e nao admite",
      "tem dia que ele fica com a mesma cara de quando quase largou o curso",
      "o assunto curso sempre pega nele mais do que ele deixa parecer",
    ],
    secret_spot: [
      "aposto que o Bob foi parar naquele canto dele na cidade de novo",
      "se ele sumiu pra pensar, daqui a pouco reaparece naquele lugar de sempre",
      "tem um ponto da cidade que sempre puxa o Bob quando a cabeca dele pesa",
    ],
    rainy_childhood_memory: [
      "dia de chuva deixa o Bob estranho num nivel muito especifico",
      "sempre que chove ele fica com cara de memoria antiga batendo",
      "tem alguma lembranca de infancia que a chuva puxa nele toda vez",
    ],
    old_print_archive: [
      "o Bob nunca apaga print nenhum, isso ainda vai render problema",
      "ele guarda audio e print velho como se fosse arquivo historico",
      "se mexer no celular do Bob vai cair um museu inteiro de conversas antigas",
    ],
  },
  en: {
    midnight_guitar: [
      "he was on that guitar again last night",
      "when Bob picks up that old guitar late at night I already know something is off",
      "that half-broken guitar always comes out when he cannot quiet his head",
    ],
    overdue_book: [
      "also, the book Bob promised to return is still missing in action",
      "this whole conversation reminds me that Bob still owes someone that book",
      "one day someone will recover the book Bob borrowed and I want to witness it",
    ],
    silent_story_watcher: [
      "he disappears from chat but still watches everyone's stories",
      "Bob does that classic move where he vanishes here and keeps lurking through stories",
      "hiding does not work when the stories tab keeps exposing you",
    ],
    almost_changed_course: [
      "sometimes I think Bob still wants to change majors and will not admit it",
      "some days he gets the exact same face he had when he almost quit the course",
      "the course topic still hits him harder than he lets on",
    ],
    secret_spot: [
      "I bet Bob ended up at that little spot of his in the city again",
      "if he vanished to think, he will probably reappear at his usual place",
      "there is a corner of the city that always pulls Bob back when his head gets loud",
    ],
    rainy_childhood_memory: [
      "rainy days make Bob weird in a very specific way",
      "every time it rains he looks like an old memory just grabbed him",
      "there is some childhood memory that the rain drags back every single time",
    ],
    old_print_archive: [
      "Bob never deletes screenshots and that will become a problem someday",
      "he keeps old voice notes and screenshots like historical records",
      "if you open Bob's phone you will find a museum of old conversations",
    ],
  },
  es: {
    midnight_guitar: [
      "anoche estaba otra vez con esa guitarra",
      "cuando Bob agarra esa guitarra vieja de madrugada ya se que algo le pesa",
      "esa guitarra medio rota siempre aparece cuando no logra apagar la cabeza",
    ],
    overdue_book: [
      "por cierto, el libro que Bob prometio devolver sigue desaparecido",
      "esta conversacion me recuerda que Bob todavia debe ese libro",
      "algun dia alguien recuperara el libro prestado a Bob y quiero verlo",
    ],
    silent_story_watcher: [
      "desaparece del chat pero sigue viendo los stories de todo el mundo",
      "Bob hace ese truco clasico de borrarse aqui y seguir presente por los stories",
      "no sirve esconderse cuando los stories te delatan",
    ],
    almost_changed_course: [
      "a veces creo que Bob todavia quiere cambiar de carrera y no lo admite",
      "hay dias en que pone la misma cara de cuando casi dejo la carrera",
      "el tema de la carrera le pega mas de lo que deja ver",
    ],
    secret_spot: [
      "apuesto a que Bob termino otra vez en ese rincon suyo de la ciudad",
      "si desaparecio para pensar, en un rato reaparece en su lugar de siempre",
      "hay un punto de la ciudad que siempre arrastra a Bob cuando la cabeza le pesa",
    ],
    rainy_childhood_memory: [
      "los dias de lluvia ponen raro a Bob de una manera demasiado especifica",
      "cada vez que llueve se le nota una memoria vieja encima",
      "hay algun recuerdo de infancia que la lluvia le despierta siempre",
    ],
    old_print_archive: [
      "Bob nunca borra capturas y eso algun dia va a dar problemas",
      "guarda audios y capturas viejas como si fueran archivo historico",
      "si revisas el telefono de Bob encuentras un museo entero de conversaciones viejas",
    ],
  },
  fr: {
    midnight_guitar: [
      "il etait encore avec cette guitare hier soir",
      "quand Bob prend cette vieille guitare tard dans la nuit je sais deja que quelque chose ne va pas",
      "cette guitare presque casse sort toujours quand il n arrive pas a calmer sa tete",
    ],
    overdue_book: [
      "au fait, le livre que Bob devait rendre est toujours porte disparu",
      "cette conversation me rappelle que Bob doit encore ce livre a quelqu un",
      "un jour quelqu un recuperera le livre prete a Bob et je veux voir ca",
    ],
    silent_story_watcher: [
      "il disparait du chat mais continue de regarder les stories de tout le monde",
      "Bob fait ce truc classique ou il s efface ici mais reste present dans les stories",
      "cela ne sert a rien de se cacher quand les stories te trahissent",
    ],
    almost_changed_course: [
      "parfois je crois que Bob veut encore changer de filiere sans l admettre",
      "certains jours il reprend exactement le visage qu il avait quand il a failli quitter le cursus",
      "le sujet des etudes le touche plus qu il ne le montre",
    ],
    secret_spot: [
      "je parie que Bob a encore fini dans ce petit endroit a lui en ville",
      "s il a disparu pour reflechir il va reapparaitre a son endroit habituel",
      "il y a un coin de la ville qui rappelle toujours Bob quand sa tete devient trop bruyante",
    ],
    rainy_childhood_memory: [
      "les jours de pluie rendent Bob etrange d une facon tres precise",
      "chaque fois qu il pleut on dirait qu un vieux souvenir lui tombe dessus",
      "il y a un souvenir d enfance que la pluie ramene a chaque fois",
    ],
    old_print_archive: [
      "Bob n efface jamais ses captures et cela finira mal un jour",
      "il garde de vieux audios et captures comme des archives historiques",
      "si tu ouvres le telephone de Bob tu trouves un musee entier de vieilles conversations",
    ],
  },
} as const satisfies Record<CharacterLanguage, Record<BobSoulTopic, string[]>>;

export function pickSoulTopic(
  relationshipTypes: RelationshipType[],
  seed: number,
): BobSoulTopic {
  const weighted = Object.entries(BOB_SOUL_FACTS).flatMap(([topic, value]) => {
    const matches = relationshipTypes.some((type) => value.triggers.includes(type));
    return Array.from({ length: matches ? 3 : 1 }, () => topic as BobSoulTopic);
  });

  return pickOne(weighted, seed);
}
