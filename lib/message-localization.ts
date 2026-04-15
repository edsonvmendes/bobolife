import { localizeGeneratedContent } from "@/lib/textEngine";
import type { CharacterLanguage, MessageRecord } from "@/lib/types";

type TranslationSet = Record<CharacterLanguage, string>;

const seededTranslations: Record<string, TranslationSet> = {
  "67bb8a0e-0ec1-48f9-89d2-40ffefe788c0": {
    pt: "Bob, deixei comida na geladeira e nao vale fingir que nao viu",
    en: "Bob, i left food in the fridge and you do not get to pretend you missed it",
    es: "Bob, deje comida en la heladera y no vale fingir que no la viste",
    fr: "Bob, j ai laisse de la nourriture au frigo et tu ne peux pas faire semblant de ne pas l avoir vue",
  },
  "5bcb7af4-9ca4-4f0f-8fd9-31ddf8750ee4": {
    pt: "vi sim mae",
    en: "i saw it, mom",
    es: "si la vi, mama",
    fr: "oui je l ai vue, maman",
  },
  "6d51c433-5d12-4b8c-a2b5-06798e91aa7b": {
    pt: "e agua. e fruta. e responde sua tia depois",
    en: "and water. and fruit. and answer your aunt later",
    es: "y agua. y fruta. y respondele a tu tia despues",
    fr: "et de l eau. et des fruits. et reponds a ta tante plus tard",
  },
  "fd7a4dbf-359f-4408-8ec8-54d7cf191df0": {
    pt: "Contato do mecanico: Sergio 11 9xxxx-xxxx",
    en: "Mechanic contact: Sergio 11 9xxxx-xxxx",
    es: "Contacto del mecanico: Sergio 11 9xxxx-xxxx",
    fr: "Contact du mecanicien : Sergio 11 9xxxx-xxxx",
  },
  "bd5f5ab0-a064-4f09-89ea-93935c2c1477": {
    pt: "Preciso dos seus slides do projeto antes das 18:00. Sem drama de ultima hora.",
    en: "Need your project slides sent before 18:00. No last-minute drama.",
    es: "Necesito tus diapositivas del proyecto antes de las 18:00. Sin drama de ultimo minuto.",
    fr: "J ai besoin de tes slides du projet avant 18:00. Pas de panique de derniere minute.",
  },
  "3879c195-e84f-4958-9158-c7b2771df6d6": {
    pt: "mando antes das 17:30",
    en: "i will send it before 17:30",
    es: "lo mando antes de las 17:30",
    fr: "je l envoie avant 17:30",
  },
  "f955c794-f516-4b7c-b6bf-db0f2997be7f": {
    pt: "Essa resposta funciona. Mantem a mesma clareza na apresentacao.",
    en: "That answer works. Keep the same clarity in the presentation.",
    es: "Esa respuesta funciona. Manten la misma claridad en la presentacion.",
    fr: "Cette reponse fonctionne. Garde la meme clarte dans la presentation.",
  },
  "8dc6f8c4-a6bd-4dac-9e06-fb5d5ba69aac": {
    pt: "vc vai sumir da terra a tarde toda mesmo?",
    en: "are you really disappearing off the face of the earth all afternoon?",
    es: "de verdad vas a desaparecer toda la tarde?",
    fr: "tu vas vraiment disparaitre toute l apres-midi ?",
  },
  "243b8a1c-1fb9-4701-bdda-f2ab79af9932": {
    pt: "tenho reuniao com o andre e depois talvez eu passe ai",
    en: "i have a meeting with andre and then maybe i stop by",
    es: "tengo reunion con andre y despues tal vez paso por ahi",
    fr: "j ai une reunion avec andre puis peut-etre que je passe",
  },
  "3ae447a0-c24f-4b28-8c69-3ef85f67c2c7": {
    pt: "talvez me deixa mais ansiosa que um nao",
    en: "maybe that makes me more anxious than a straight no",
    es: "tal vez eso me pone mas ansiosa que un no",
    fr: "peut-etre que cela me rend plus anxieuse qu un non",
  },
  "ca3db31d-f50c-49ed-9117-1be39e1c2daa": {
    pt: "Nao estou tentando reiniciar a historia. So queria saber se aquele livro era meu ou seu.",
    en: "Not trying to restart history. Just checking if that book was yours or mine.",
    es: "No intento reiniciar la historia. Solo queria saber si ese libro era tuyo o mio.",
    fr: "Je n essaie pas de relancer l histoire. Je voulais juste savoir si ce livre etait a toi ou a moi.",
  },
  "c48a0db6-84f2-4b4b-b258-db77810d6572": {
    pt: "Voce sempre chega logo depois da parte interessante.",
    en: "You always arrive right after the interesting part.",
    es: "Siempre llegas justo despues de la parte interesante.",
    fr: "Tu arrives toujours juste apres le moment interessant.",
  },
  "ea1d43d1-c479-46a7-8db7-e6b6f078506f": {
    pt: "entao me da mais uma chance de acertar o timing",
    en: "then give me one more chance to get the timing right",
    es: "entonces dame una oportunidad mas para acertar el timing",
    fr: "alors donne-moi une autre chance de bien tomber",
  },
  "6d95546f-f7be-4647-b264-02c8d9df622f": {
    pt: "Vamos ver. Talvez hoje a noite.",
    en: "We will see. Maybe tonight.",
    es: "Ya veremos. Tal vez esta noche.",
    fr: "On verra. Peut-etre ce soir.",
  },
  "3d10ef40-973f-4abd-8a81-3a337631b7c8": {
    pt: "Bobbbb, me diz que voce ainda esta vivo pro role de hoje",
    en: "Bobbbb, tell me you are still alive for tonight's plan",
    es: "Bobbbb, dime que sigues vivo para lo de hoy",
    fr: "Bobbbb, dis-moi que tu es encore vivant pour ce soir",
  },
  "ec39cb26-d3f6-4e92-88ac-2782c6f90258": {
    pt: "to vivo sim kkk so saindo da escola",
    en: "very alive lol, just leaving school now",
    es: "si sigo vivo jaja, apenas saliendo de la escuela",
    fr: "je suis bien vivant haha, je sors juste de l ecole",
  },
  "31d4f8c0-4c9b-490b-8cb9-972c2b5c4e90": {
    pt: "perfeito. traz uma ideia melhor que a minha e pronto",
    en: "perfect. bring a better idea than mine and we are good",
    es: "perfecto. trae una idea mejor que la mia y ya ganaste",
    fr: "parfait. apporte une meilleure idee que la mienne et c est bon",
  },
  "11c4ec83-cb8f-4caa-8ec8-80a0269c4e06": {
    pt: "e se a Sofia perguntar, eu nao disse nada",
    en: "and if Sofia asks, i did not say anything",
    es: "y si Sofia pregunta, yo no dije nada",
    fr: "et si Sofia demande, je n ai rien dit",
  },
  "2ea0b16b-a304-469b-ad16-dc540603c099": {
    pt: "papo reto, voce ta com plano demais e organizacao de menos",
    en: "real talk, you have too many pending plans and zero organization",
    es: "hablando en serio, tienes demasiados planes pendientes y cero organizacion",
    fr: "soyons francs, tu as trop de plans en attente et zero organisation",
  },
  "1025388f-523b-4b08-aa37-715d39070d0d": {
    pt: "isso parece pior quando vc resume assim",
    en: "that sounds worse when you summarize it like that",
    es: "suena peor cuando lo resumes asi",
    fr: "cela sonne pire quand tu le resumes comme ca",
  },
  "9b4fdc65-6898-4c91-bba5-7ca6be21f301": {
    pt: "porque e. passo um: come. passo dois: escolhe um plano.",
    en: "because it is. step one: eat. step two: choose one plan.",
    es: "porque lo es. paso uno: come. paso dos: elige un plan.",
    fr: "parce que c est le cas. etape un : mange. etape deux : choisis un plan.",
  },
  "a7639b3b-7ad6-4e79-853e-36aeaf5dc1db": {
    pt: "QUEM mexeu na minha jaqueta verde de novo",
    en: "WHO moved my green jacket again",
    es: "QUIEN movio mi chaqueta verde otra vez",
    fr: "QUI a encore deplace ma veste verte",
  },
  "6c6e1d2b-ec1a-4353-a17b-c25716ddf643": {
    pt: "se vc achar no meu quarto vc desaparece primeiro",
    en: "if you find it in my room, you disappear first",
    es: "si la encuentras en mi cuarto, tu desapareces primero",
    fr: "si tu la trouves dans ma chambre, c est toi qui disparais d abord",
  },
  "49929985-c744-4eb6-a9df-918d9177167d": {
    pt: "Nenhum de voces some. Todo mundo janta em casa hoje.",
    en: "None of you are disappearing. Everyone is having dinner at home tonight.",
    es: "Ninguno de ustedes va a desaparecer. Hoy todo el mundo cena en casa.",
    fr: "Personne ne disparait. Tout le monde dine a la maison ce soir.",
  },
  "2ab4c132-9e2c-4b71-a274-7cab0b4b7b14": {
    pt: "ok timeline simples: slides 17h, revisar 17h10, panico 17h12",
    en: "ok simple timeline: slides 5pm, review 5:10pm, panic 5:12pm",
    es: "ok cronograma simple: diapositivas 17h, revisar 17:10, panico 17:12",
    fr: "ok timeline simple : slides 17h, relecture 17h10, panique 17h12",
  },
  "0c32ff5e-f86d-4f05-80ca-f62af83af31b": {
    pt: "O roteiro esta bom. A explicacao so precisa de mais confianca.",
    en: "The outline is good. The explanation just needs more confidence.",
    es: "El esquema esta bien. La explicacion solo necesita mas confianza.",
    fr: "Le plan est bon. L explication a juste besoin de plus d assurance.",
  },
  "7ad55432-a865-4875-ab0f-2ca9c2b2b27f": {
    pt: "genteeee quadra hoje ou vamos seguir fingindo que temos energia pra estudar???",
    en: "peopleeee court tonight or are we going to keep pretending we still have energy to study???",
    es: "genteeee cancha hoy o vamos a seguir fingiendo que tenemos energia para estudiar???",
    fr: "les genssss terrain ce soir ou on continue a faire semblant d avoir encore de l energie pour etudier ?",
  },
  "88fb0d38-4d14-4358-a5a0-aa7eb83ef54e": {
    pt: "eu apoio o caos se outra pessoa reservar a volta pra casa",
    en: "I support chaos if someone else books the ride home.",
    es: "yo apoyo el caos si otra persona pide el viaje de vuelta",
    fr: "je soutiens le chaos si quelqu un d autre reserve le retour",
  },
  "dc74bb0a-1f09-40c8-9dbb-30d4df1f4d13": {
    pt: "eu faco a lista. bob leva algum carisma pq o grupo ta fraco",
    en: "i will make the list. bob, bring some charisma because this group is weak",
    es: "yo hago la lista. bob, trae algo de carisma porque el grupo esta flojo",
    fr: "je fais la liste. bob, apporte un peu de charisme parce que le groupe est faible",
  },
};

const adminDirectiveTemplates = {
  whisper: {
    pt: (title: string, prompt: string) =>
      `alguma coisa ficou martelando na cabeca do Bob: ${title}. ${prompt}`,
    en: (title: string, prompt: string) =>
      `something has been echoing in Bob's head: ${title}. ${prompt}`,
    es: (title: string, prompt: string) =>
      `hay algo rondando la cabeza de Bob: ${title}. ${prompt}`,
    fr: (title: string, prompt: string) =>
      `quelque chose tourne dans la tete de Bob : ${title}. ${prompt}`,
  },
  theme: {
    pt: (title: string, prompt: string) =>
      `do nada a conversa encostou em ${title}. ${prompt}`,
    en: (title: string, prompt: string) =>
      `out of nowhere the conversation drifted toward ${title}. ${prompt}`,
    es: (title: string, prompt: string) =>
      `de la nada la conversacion cayo en ${title}. ${prompt}`,
    fr: (title: string, prompt: string) =>
      `sans prevenir la conversation a glisse vers ${title}. ${prompt}`,
  },
} as const;

function localizeAdminDirective(
  content: string,
  targetLanguage: CharacterLanguage,
) {
  const match = content.match(/^\[\[admin:(whisper|theme)\]\](.+?)\|\|(.+)$/);
  if (!match) {
    return null;
  }

  const [, type, title, prompt] = match;
  return adminDirectiveTemplates[type as keyof typeof adminDirectiveTemplates][
    targetLanguage
  ](title.trim(), prompt.trim());
}

export function localizeMessageContent(
  message: MessageRecord | Pick<MessageRecord, "id" | "content">,
  targetLanguage: CharacterLanguage,
) {
  const localizedDirective = localizeAdminDirective(message.content, targetLanguage);
  if (localizedDirective) {
    return localizedDirective;
  }

  const seeded = seededTranslations[message.id];
  if (seeded) {
    return seeded[targetLanguage];
  }

  const generated = localizeGeneratedContent(message.content, targetLanguage);
  if (generated) {
    return generated;
  }

  return message.content;
}
