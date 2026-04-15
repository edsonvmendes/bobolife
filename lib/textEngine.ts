import { EVENT_TYPES } from "@/lib/constants";
import { BOB_SOUL_BANKS, BOB_SOUL_TOPICS, type BobSoulTopic } from "@/lib/bobSoul";
import { pickOne } from "@/lib/utils";
import type {
  CharacterLanguage,
  CharacterRecord,
  EventType,
  RelationshipRecord,
} from "@/lib/types";

interface MessageGenerationContext {
  sender: CharacterRecord;
  recipient?: CharacterRecord;
  relationship?: RelationshipRecord;
  eventType: EventType;
  dramaLevel: number;
  beatIndex: number;
  soulTopic?: BobSoulTopic;
}

export const TEXT_BANKS = {
  pt: {
    romance: [
      "to tentando agir normal mas voce apareceu e complicou tudo",
      "se voce for, guarda lugar pra mim?",
      "eu tava quieto ate lembrar do teu sorriso ontem",
    ],
    conflict: [
      "nao foi isso que a gente combinou",
      "voce some e eu fico sem entender nada",
      "eu consigo relevar muita coisa, sumico sem explicacao nao",
    ],
    group_event: [
      "alguem decide isso antes do sinal tocar",
      "eu topo se a gente parar de enrolar",
      "mandem horario que eu apareco",
    ],
    new_contact: [
      "oi, me passaram teu contato pra falar disso",
      "cheguei sem contexto mas com boa vontade",
    ],
    check_in: [
      "passando pra ver se voce ta bem",
      "comeu? dormiu? sobreviveu ao dia?",
      "se quiser uma desculpa pra sair fora eu invento",
    ],
    academic: [
      "teu trabalho ta indo bem, mas ainda da pra melhorar",
      "me manda a versao final sem deixar pra ultima hora",
      "faz sentido, so falta deixar mais claro",
    ],
  },
  es: {
    romance: [
      "estoy intentando actuar normal pero apareciste y lo complicaste todo",
      "si vas, me guardas un lugar?",
      "yo estaba tranquilo hasta acordarme de tu sonrisa de ayer",
    ],
    conflict: [
      "no fue eso lo que habiamos quedado",
      "desapareces y yo me quedo sin entender nada",
      "puedo dejar pasar muchas cosas, desaparecer sin explicacion no",
    ],
    group_event: [
      "alguien decida esto antes de que suene el timbre",
      "yo voy si dejamos de dar vueltas",
      "manden la hora y aparezco",
    ],
    new_contact: [
      "hola, me pasaron tu contacto para hablar de esto",
      "llegue sin contexto pero con buena voluntad",
    ],
    check_in: [
      "paso para ver si estas bien",
      "comiste? dormiste? sobreviviste al dia?",
      "si quieres una excusa para salir de ahi, te la invento",
    ],
    academic: [
      "tu trabajo va bien, pero todavia se puede mejorar",
      "mandame la version final sin dejarlo para ultimo momento",
      "tiene sentido, solo falta dejarlo mas claro",
    ],
  },
  en: {
    romance: [
      "i was trying to act normal until you made that impossible",
      "if you go, save me a seat?",
      "i was fine until i remembered your smile from yesterday",
    ],
    conflict: [
      "that is not what we agreed on",
      "you disappear and i am left trying to guess what happened",
      "i can let a lot slide, but not disappearing without saying anything",
    ],
    group_event: [
      "someone decide this before the bell rings",
      "i am in if we stop dragging this out",
      "send me the time and i will show up",
    ],
    new_contact: [
      "hey, someone passed me your number to talk about this",
      "i showed up with no context but good intentions",
    ],
    check_in: [
      "checking in to make sure you are okay",
      "did you eat? sleep? survive the day?",
      "if you need an excuse to leave, i can invent one",
    ],
    academic: [
      "your project is going well, but it can still get cleaner",
      "send me the final version before it turns into last-minute panic",
      "it makes sense, it just needs to be clearer",
    ],
  },
  fr: {
    romance: [
      "j essayais d agir normalement jusqu a ce que tu compliques tout",
      "si tu y vas, tu me gardes une place ?",
      "j etais calme jusqu a me rappeler ton sourire d hier",
    ],
    conflict: [
      "ce n est pas ce qu on avait convenu",
      "tu disparais et je reste sans comprendre ce qu il se passe",
      "je peux laisser passer beaucoup de choses, pas disparaitre sans un mot",
    ],
    group_event: [
      "quelqu un decide avant que la sonnerie tombe",
      "je viens si on arrete de tourner autour du pot",
      "envoyez l heure et j arrive",
    ],
    new_contact: [
      "salut, on m a donne ton contact pour parler de ca",
      "j arrive sans contexte mais avec de bonnes intentions",
    ],
    check_in: [
      "je passe juste verifier que tu vas bien",
      "tu as mange ? dormi ? survecu a la journee ?",
      "si tu veux une excuse pour filer, je peux l inventer",
    ],
    academic: [
      "ton projet avance bien, mais il peut etre plus propre",
      "envoie la version finale avant que cela devienne une panique de derniere minute",
      "cela tient debout, il faut juste rendre cela plus clair",
    ],
  },
} as const satisfies Record<CharacterLanguage, Record<EventType, string[]>>;

function lookupBankTranslation(
  content: string,
  targetLanguage: CharacterLanguage,
  bank: Record<CharacterLanguage, Record<string, string[]>>,
  keys: readonly string[],
) {
  for (const key of keys) {
    for (const [sourceLanguage, values] of Object.entries(bank) as Array<
      [CharacterLanguage, Record<string, string[]>]
    >) {
      const lines = values[key];
      const exactIndex = lines.findIndex((entry) => entry === content);
      if (exactIndex >= 0) {
        return bank[targetLanguage][key][exactIndex];
      }

      if (content.endsWith("!")) {
        const base = content.slice(0, -1);
        const baseIndex = lines.findIndex((entry) => entry === base);
        if (baseIndex >= 0) {
          return `${bank[targetLanguage][key][baseIndex]}!`;
        }
      }

      if (sourceLanguage) {
        continue;
      }
    }
  }

  return null;
}

export function localizeGeneratedContent(
  content: string,
  targetLanguage: CharacterLanguage,
) {
  return (
    lookupBankTranslation(content, targetLanguage, TEXT_BANKS, EVENT_TYPES) ??
    lookupBankTranslation(content, targetLanguage, BOB_SOUL_BANKS, BOB_SOUL_TOPICS)
  );
}

export const TextEngine = {
  generateMessage(context: MessageGenerationContext) {
    const sourceBank = context.soulTopic
      ? BOB_SOUL_BANKS.pt[context.soulTopic]
      : TEXT_BANKS.pt[context.eventType];
    const trust = context.relationship?.trust ?? 50;
    const jealousy = context.relationship?.jealousy ?? 0;
    const seed =
      context.beatIndex +
      trust +
      jealousy +
      Math.round(context.dramaLevel * 3) +
      context.sender.name.length +
      (context.recipient?.name.length ?? 0);

    const chosen = pickOne([...sourceBank], seed);
    return context.dramaLevel >= 2 ? `${chosen}!` : chosen;
  },
};
