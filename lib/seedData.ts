import { subMinutes } from "date-fns";
import { BOB_CHARACTER_ID, BOB_USER_ID } from "@/lib/constants";
import type {
  AdminDirectiveRecord,
  AvatarRecord,
  CharacterRecord,
  ConversationParticipantRecord,
  ConversationRecord,
  DataSnapshot,
  EventRecord,
  MessageRecord,
  RelationshipRecord,
  SystemStateRecord,
  UserRecord,
} from "@/lib/types";

const SYSTEM_STATE_ID = "e4f14833-f419-40f7-bc68-90d0ef88b23d";

const C = {
  bob: BOB_CHARACTER_ID,
  helena: "82d3a621-4306-4bcc-bfdb-637cf73ce4fa",
  mauro: "0dcdb39a-8c49-4736-8e9f-228f08c2ddb4",
  lia: "5793f027-017c-4fca-8a8a-c5f3b4c2c6de",
  caio: "505f4308-7572-44e9-a6a7-c3d25c20c883",
  nina: "a262906b-69ee-4f96-b34e-67c6ef6ff185",
  camille: "5dc2a558-641a-4960-94c0-3c1895ce1d49",
  valentina: "bda27bd9-e3c2-4858-a698-a75f85a8d005",
  sofia: "61fd1494-f6df-4473-bce5-8457e9101c85",
  maya: "30fa3efb-dc39-47eb-b14f-e3ecc09d014c",
  andre: "98d13438-8ef5-40dd-b5c9-f9b0d7d1c2ce",
  ravi: "8ab66026-1ab3-42b1-a5ab-7d0b03768519",
  joana: "6a58c597-5a2d-4664-a8a8-137c0dc3770f",
  diego: "d4ca3f2d-72b7-4d28-a7d9-8b9b431bdf3e",
  zoe: "9c70ccb5-7a7d-4c01-b912-9bc79742d8cb",
} as const;

const V = {
  mother: "a25856c7-2ebc-46bb-bd32-d99db67a0da7",
  father: "34ec7cb2-4f47-4a29-a52a-775b34e4f222",
  sofia: "c5e8ad12-a073-4184-8cf2-2d5b0fcb35c4",
  maya: "60a13e6b-f4ef-4144-90e1-4698cad8f146",
  camille: "6f5fd9ca-212e-4a93-a96c-abf894de2cbf",
  valentina: "3d941e36-7cb9-4749-8170-6e65102d630a",
  andre: "76f71f26-8c04-43aa-b0b0-aa2ff7287a52",
  ravi: "963c17be-a03e-4fe9-b9f7-d98dfa4193b1",
  family: "01996d9d-f9f0-4d85-a1c6-9d5c6763af57",
  college: "3f52e848-88fb-4ae9-a355-bdc8c2e7eb7b",
  friends: "27368bd7-718f-4c65-aac8-c674df1773d4",
} as const;

const avatarUrls = {
  bob: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80",
  helena: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=640&q=80",
  mauro: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=640&q=80",
  lia: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=640&q=80",
  caio: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=640&q=80",
  nina: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=640&q=80",
  camille: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=640&q=80",
  valentina: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80",
  sofia: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=640&q=80",
  maya: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=640&q=80",
  andre: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=640&q=80",
  ravi: "https://images.unsplash.com/photo-1506795660185-6f401f7d2026?auto=format&fit=crop&w=640&q=80",
  joana: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=640&q=80",
  diego: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80&sat=-20",
  zoe: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=640&q=80",
} as const;

function iso(minutesAgo: number) {
  return subMinutes(new Date(), minutesAgo).toISOString();
}

function profile(
  core: string,
  contexts: string[],
  updateFrequency: "low" | "medium" | "high",
) {
  return {
    style: "social_confident",
    core_description: core,
    photo_contexts: contexts,
    update_frequency: updateFrequency,
  };
}

const users: UserRecord[] = [{ id: BOB_USER_ID, name: "Bob", created_at: iso(43200) }];

const characters: CharacterRecord[] = [
  { id: C.bob, name: "Bob", primary_language: "pt", secondary_languages: ["en", "es"], relationship_type: "self", personality_profile: { archetype: "quiet observer", traits: ["curious", "romantic", "avoidant"], triggers: ["mixed signals"], soul_threads: ["violao velho de madrugada", "livro emprestado nunca devolvido", "some mas ve stories", "quase trocou de escola", "um canto secreto da cidade", "memoria de infancia em dias de chuva", "arquivo infinito de prints e audios antigos"] }, response_style: { tone: "soft lowercase with irony", pacing: "short bursts", slang_level: "medium", quirks: ["double texts when anxious"] }, visual_profile: profile("Brazilian high school teen in candid city photos, hoodie layers, and relaxed everyday style.", ["mirror", "bus-window", "late-snack"], "high"), created_at: iso(40000) },
  { id: C.helena, name: "Helena", primary_language: "pt", secondary_languages: ["es"], relationship_type: "mother", personality_profile: { archetype: "protective organizer", traits: ["warm", "observant", "dramatic"] }, response_style: { tone: "practical affection", pacing: "steady", slang_level: "low", quirks: ["asks three questions in one message"] }, visual_profile: profile("Elegant Brazilian mother with warm kitchen selfies and home textures.", ["kitchen", "garden", "family-lunch"], "medium"), created_at: iso(39000) },
  { id: C.mauro, name: "Mauro", primary_language: "pt", secondary_languages: ["en"], relationship_type: "father", personality_profile: { archetype: "dry mentor", traits: ["calm", "practical", "loyal"] }, response_style: { tone: "direct and economical", pacing: "slow", slang_level: "low", quirks: ["sends useful links with no intro"] }, visual_profile: profile("Reserved father with workshop lighting, neutral polos, and road-trip snapshots.", ["garage", "barbecue", "road-trip"], "low"), created_at: iso(39000) },
  { id: C.lia, name: "Lia", primary_language: "en", secondary_languages: ["pt"], relationship_type: "sibling", personality_profile: { archetype: "chaotic trend scout", traits: ["witty", "restless", "protective"] }, response_style: { tone: "fast jokes and screenshots", pacing: "bursty", slang_level: "high", quirks: ["capitalizes when excited"] }, visual_profile: profile("Fashion-forward older sister with flash photography, after-school hangouts, and mirror selfies.", ["party", "mirror", "ride-share"], "high"), created_at: iso(38000) },
  { id: C.caio, name: "Caio", primary_language: "pt", secondary_languages: ["en"], relationship_type: "sibling", personality_profile: { archetype: "gym goblin with a heart", traits: ["teasing", "disciplined", "impulsive"] }, response_style: { tone: "playful menace", pacing: "medium", slang_level: "high", quirks: ["sends photos instead of explanations"] }, visual_profile: profile("Athletic younger brother with post-workout photos and sneaker culture energy.", ["gym", "street-ball", "post-workout"], "high"), created_at: iso(38000) },
  { id: C.nina, name: "Nina", primary_language: "es", secondary_languages: ["pt", "fr"], relationship_type: "sibling", personality_profile: { archetype: "art-school satellite", traits: ["sensitive", "sharp", "dreamy"] }, response_style: { tone: "poetic but blunt", pacing: "sporadic", slang_level: "medium", quirks: ["changes language mid-thought"] }, visual_profile: profile("Artsy younger sister with film-camera vibes, sketchbooks, and museum cafe portraits.", ["studio", "museum", "cafe-window"], "medium"), created_at: iso(38000) },
  { id: C.camille, name: "Camille", primary_language: "fr", secondary_languages: ["en", "pt"], relationship_type: "crush", personality_profile: { archetype: "composed flirt", traits: ["elegant", "playful", "unreadable"] }, response_style: { tone: "short lines with a hidden smile", pacing: "slow-burn", slang_level: "low", quirks: ["uses ellipses with intent"] }, visual_profile: profile("French exchange student with polished cafe portraits and monochrome travel photos.", ["travel", "museum", "night-walk"], "high"), created_at: iso(36000) },
  { id: C.valentina, name: "Valentina", primary_language: "es", secondary_languages: ["pt", "en"], relationship_type: "crush", personality_profile: { archetype: "spark-plug extrovert", traits: ["magnetic", "competitive", "curious"] }, response_style: { tone: "bright and teasing", pacing: "bursty", slang_level: "high", quirks: ["uses all-caps for punchlines"] }, visual_profile: profile("Charismatic exchange student with bright school-trip photos and confident social snapshots.", ["party", "travel", "sunset-roof"], "high"), created_at: iso(36000) },
  { id: C.sofia, name: "Sofia", primary_language: "pt", secondary_languages: ["en"], relationship_type: "girlfriend", personality_profile: { archetype: "intense planner", traits: ["loyal", "romantic", "sharp-tongued when hurt"] }, response_style: { tone: "clear and affectionate until upset", pacing: "measured bursts", slang_level: "medium", quirks: ["uses names when serious"] }, visual_profile: profile("Confident teen student with neat casual looks, school-day mirror selfies, and after-class cafe photos.", ["mirror", "after-class", "study-cafe"], "high"), created_at: iso(37000) },
  { id: C.maya, name: "Maya", primary_language: "en", secondary_languages: ["pt"], relationship_type: "ex", personality_profile: { archetype: "cool-headed ghost from before", traits: ["smart", "guarded", "observant"] }, response_style: { tone: "controlled and very intentional", pacing: "slow", slang_level: "low", quirks: ["starts with disclaimers"] }, visual_profile: profile("Thoughtful ex with quiet city portraits, tailored layers, and rain-reflective light.", ["travel", "bookstore", "late-train"], "medium"), created_at: iso(37000) },
  { id: C.andre, name: "Prof. Andre", primary_language: "en", secondary_languages: ["pt", "fr"], relationship_type: "teacher", personality_profile: { archetype: "charismatic deadline dealer", traits: ["demanding", "fair", "energetic"] }, response_style: { tone: "crisp and motivating", pacing: "scheduled", slang_level: "low", quirks: ["always includes the next step"] }, visual_profile: profile("Young teacher with classroom energy, rolled sleeves, and school corridor portraits.", ["school", "classroom", "teacher-room"], "medium"), created_at: iso(45000) },
  { id: C.ravi, name: "Ravi", primary_language: "en", secondary_languages: ["pt", "es"], relationship_type: "friend", personality_profile: { archetype: "fixer friend", traits: ["funny", "reliable", "nosy"] }, response_style: { tone: "friendly pressure", pacing: "quick", slang_level: "medium", quirks: ["starts serious advice with real talk"] }, visual_profile: profile("Easygoing friend with snack-run snapshots, bright travel candids, and school-break energy.", ["travel", "campus", "coffee-run"], "medium"), created_at: iso(35000) },
  { id: C.joana, name: "Joana", primary_language: "pt", secondary_languages: ["en", "es"], relationship_type: "friend", personality_profile: { archetype: "group chat producer", traits: ["organized", "funny", "bossy"] }, response_style: { tone: "energetic logistics", pacing: "fast", slang_level: "medium", quirks: ["announces times like a producer"] }, visual_profile: profile("Confident friend with weekend snack photos and clean school-gate backdrops.", ["brunch", "campus", "concert-line"], "high"), created_at: iso(35000) },
  { id: C.diego, name: "Diego", primary_language: "es", secondary_languages: ["pt", "en"], relationship_type: "friend", personality_profile: { archetype: "chaotic optimist", traits: ["spontaneous", "loyal", "loud"] }, response_style: { tone: "all gas no brakes", pacing: "bursty", slang_level: "high", quirks: ["spams punctuation"] }, visual_profile: profile("Hyper-social friend with football energy and weekend-trip motion blur.", ["party", "street-ball", "weekend-trip"], "high"), created_at: iso(34000) },
  { id: C.zoe, name: "Zoe", primary_language: "en", secondary_languages: ["fr", "pt"], relationship_type: "friend", personality_profile: { archetype: "cool-headed creative", traits: ["perceptive", "dry", "articulate"] }, response_style: { tone: "dry humor and full sentences", pacing: "calm", slang_level: "low", quirks: ["reacts late but well"] }, visual_profile: profile("Creative friend with editorial selfies, muted palettes, and gallery-night atmosphere.", ["gallery", "train-window", "late-dinner"], "medium"), created_at: iso(34000) },
];

const conversations: ConversationRecord[] = [
  { id: V.mother, type: "direct", title: null, created_at: iso(640) },
  { id: V.father, type: "direct", title: null, created_at: iso(900) },
  { id: V.sofia, type: "direct", title: null, created_at: iso(160) },
  { id: V.maya, type: "direct", title: null, created_at: iso(520) },
  { id: V.camille, type: "direct", title: null, created_at: iso(280) },
  { id: V.valentina, type: "direct", title: null, created_at: iso(210) },
  { id: V.andre, type: "direct", title: null, created_at: iso(420) },
  { id: V.ravi, type: "direct", title: null, created_at: iso(125) },
  { id: V.family, type: "group", title: "Casa Bob", created_at: iso(720) },
  { id: V.college, type: "group", title: "Sala 2B", created_at: iso(510) },
  { id: V.friends, type: "group", title: "Depois da Aula", created_at: iso(150) },
];

const conversationParticipants: ConversationParticipantRecord[] = [
  { id: "79839346-f853-4bd4-83b9-b7efc03d4339", conversation_id: V.mother, character_id: C.bob }, { id: "9554ef05-6844-4569-9a0f-c23e4062eb5c", conversation_id: V.mother, character_id: C.helena },
  { id: "c8c04c69-80a7-46bc-b03b-703f054d29df", conversation_id: V.father, character_id: C.bob }, { id: "a1d5dc6c-f320-4ad4-9f85-d859588f5bc7", conversation_id: V.father, character_id: C.mauro },
  { id: "1323d7dc-2d96-415e-a855-d1a15cf54d68", conversation_id: V.sofia, character_id: C.bob }, { id: "aeb2654f-91d1-48f5-b9b5-f59e2f0fd7d8", conversation_id: V.sofia, character_id: C.sofia },
  { id: "0c1aef68-97e6-4416-b31f-9018997c20eb", conversation_id: V.maya, character_id: C.bob }, { id: "9d94c17c-b9c6-42e4-bdf7-1f92afcef5bf", conversation_id: V.maya, character_id: C.maya },
  { id: "690695ca-4c11-45db-bc44-d0ecbe9d2766", conversation_id: V.camille, character_id: C.bob }, { id: "bcb19a70-0a11-4e5c-b6ea-f3a19fcc4850", conversation_id: V.camille, character_id: C.camille },
  { id: "6fa1a8cc-4604-4584-896c-168c047513b8", conversation_id: V.valentina, character_id: C.bob }, { id: "7010d46f-68cd-4b1f-89d0-cd4781c3ac37", conversation_id: V.valentina, character_id: C.valentina },
  { id: "bb047dbd-6d7c-4f7d-a404-5b028af829d5", conversation_id: V.andre, character_id: C.bob }, { id: "d3bc1f80-c8e8-416d-a73d-366f84f95b49", conversation_id: V.andre, character_id: C.andre },
  { id: "615f4b6b-a806-4030-9d0f-ca94d0c576fd", conversation_id: V.ravi, character_id: C.bob }, { id: "4a87580b-95d0-4d85-9d24-21557f0150b4", conversation_id: V.ravi, character_id: C.ravi },
  { id: "016aa28a-fdda-49c9-bd68-672a01942e9c", conversation_id: V.family, character_id: C.bob }, { id: "887c561f-6dc1-474d-a357-8a33594caf9f", conversation_id: V.family, character_id: C.helena }, { id: "0e57d224-41ff-43c1-aa1d-cfbc7f5af6ce", conversation_id: V.family, character_id: C.mauro }, { id: "7095fab9-097c-4e7a-8744-9725fb9a2b03", conversation_id: V.family, character_id: C.lia }, { id: "5cf1c8da-3ad8-4ad5-96aa-c6e5ea8dc251", conversation_id: V.family, character_id: C.caio }, { id: "b1be8d6f-1824-46c3-a35e-a1e71e84aa6b", conversation_id: V.family, character_id: C.nina },
  { id: "0f80c98a-f427-44ba-9d80-a94a8f9e8b6f", conversation_id: V.college, character_id: C.bob }, { id: "229d5606-d746-48c0-b18d-ab2d57c1ff0e", conversation_id: V.college, character_id: C.andre }, { id: "c05c6b13-8662-442c-9837-c99af15e2085", conversation_id: V.college, character_id: C.ravi }, { id: "6a1279c1-84c5-43d0-af0d-b7f2b3c75f02", conversation_id: V.college, character_id: C.joana }, { id: "58ea545a-1e1e-4a1c-9fe0-4c8089a08d2c", conversation_id: V.college, character_id: C.valentina }, { id: "95807a4e-e54d-49d2-87d1-557663d7ce4d", conversation_id: V.college, character_id: C.camille },
  { id: "41b51dfa-0804-4f33-bd37-f45a46ee1258", conversation_id: V.friends, character_id: C.bob }, { id: "50f7b0ba-32de-4b89-a678-8946347d64e7", conversation_id: V.friends, character_id: C.ravi }, { id: "fd7ea9c9-abf9-42d5-aecd-c09a4dd4e247", conversation_id: V.friends, character_id: C.joana }, { id: "eb401da3-c9bf-4175-b465-d4692dc0c892", conversation_id: V.friends, character_id: C.diego }, { id: "41ad74d7-42cd-487c-ba26-6ff5c7d70483", conversation_id: V.friends, character_id: C.zoe }, { id: "f2f34ecb-f493-42a9-9228-a675381e7af2", conversation_id: V.friends, character_id: C.caio },
];

const messages: MessageRecord[] = [
  { id: "67bb8a0e-0ec1-48f9-89d2-40ffefe788c0", conversation_id: V.mother, sender_id: C.helena, content: "Bob, deixei comida na geladeira e nao vale fingir que nao viu", language: "pt", message_type: "text", created_at: iso(54) },
  { id: "5bcb7af4-9ca4-4f0f-8fd9-31ddf8750ee4", conversation_id: V.mother, sender_id: C.bob, content: "vi sim mae", language: "pt", message_type: "text", created_at: iso(53) },
  { id: "6d51c433-5d12-4b8c-a2b5-06798e91aa7b", conversation_id: V.mother, sender_id: C.helena, content: "e agua. e fruta. e responde sua tia depois", language: "pt", message_type: "text", created_at: iso(51) },
  { id: "fd7a4dbf-359f-4408-8ec8-54d7cf191df0", conversation_id: V.father, sender_id: C.mauro, content: "Contato do mecanico: Sergio 11 9xxxx-xxxx", language: "pt", message_type: "text", created_at: iso(146) },
  { id: "bd5f5ab0-a064-4f09-89ea-93935c2c1477", conversation_id: V.andre, sender_id: C.andre, content: "Need your project slides sent before 18:00. No last-minute drama.", language: "en", message_type: "text", created_at: iso(81) },
  { id: "3879c195-e84f-4958-9158-c7b2771df6d6", conversation_id: V.andre, sender_id: C.bob, content: "mando antes das 17:30", language: "pt", message_type: "text", created_at: iso(78) },
  { id: "f955c794-f516-4b7c-b6bf-db0f2997be7f", conversation_id: V.andre, sender_id: C.andre, content: "That answer works. Keep the same clarity in the presentation.", language: "en", message_type: "text", created_at: iso(74) },
  { id: "8dc6f8c4-a6bd-4dac-9e06-fb5d5ba69aac", conversation_id: V.sofia, sender_id: C.sofia, content: "vc vai sumir da terra a tarde toda mesmo?", language: "pt", message_type: "text", created_at: iso(41) },
  { id: "243b8a1c-1fb9-4701-bdda-f2ab79af9932", conversation_id: V.sofia, sender_id: C.bob, content: "tenho reuniao com o andre e depois talvez eu passe ai", language: "pt", message_type: "text", created_at: iso(38) },
  { id: "3ae447a0-c24f-4b28-8c69-3ef85f67c2c7", conversation_id: V.sofia, sender_id: C.sofia, content: "talvez me deixa mais ansiosa que um nao", language: "pt", message_type: "text", created_at: iso(35) },
  { id: "ca3db31d-f50c-49ed-9117-1be39e1c2daa", conversation_id: V.maya, sender_id: C.maya, content: "Not trying to restart history. Just checking if that book was yours or mine.", language: "en", message_type: "text", created_at: iso(204) },
  { id: "c48a0db6-84f2-4b4b-b258-db77810d6572", conversation_id: V.camille, sender_id: C.camille, content: "Tu arrives toujours juste apres le moment interessant.", language: "fr", message_type: "text", created_at: iso(77) },
  { id: "ea1d43d1-c479-46a7-8db7-e6b6f078506f", conversation_id: V.camille, sender_id: C.bob, content: "entao me da mais uma chance de acertar o timing", language: "pt", message_type: "text", created_at: iso(72) },
  { id: "6d95546f-f7be-4647-b264-02c8d9df622f", conversation_id: V.camille, sender_id: C.camille, content: "On verra. Peut-etre ce soir.", language: "fr", message_type: "text", created_at: iso(68) },
  { id: "3d10ef40-973f-4abd-8a81-3a337631b7c8", conversation_id: V.valentina, sender_id: C.valentina, content: "Bobbbb, dime que sigues vivo para lo de hoy", language: "es", message_type: "text", created_at: iso(26) },
  { id: "ec39cb26-d3f6-4e92-88ac-2782c6f90258", conversation_id: V.valentina, sender_id: C.bob, content: "to vivo sim kkk so saindo da escola", language: "pt", message_type: "text", created_at: iso(24) },
  { id: "31d4f8c0-4c9b-490b-8cb9-972c2b5c4e90", conversation_id: V.valentina, sender_id: C.valentina, content: "perfecto. trae una idea mejor que la mia y ya ganaste", language: "es", message_type: "text", created_at: iso(21) },
  { id: "11c4ec83-cb8f-4caa-8ec8-80a0269c4e06", conversation_id: V.valentina, sender_id: C.valentina, content: "y si Sofia pregunta, yo no dije nada", language: "es", message_type: "text", created_at: iso(19) },
  { id: "2ea0b16b-a304-469b-ad16-dc540603c099", conversation_id: V.ravi, sender_id: C.ravi, content: "real talk, you have too many pending plans and zero organization", language: "en", message_type: "text", created_at: iso(18) },
  { id: "1025388f-523b-4b08-aa37-715d39070d0d", conversation_id: V.ravi, sender_id: C.bob, content: "isso parece pior quando vc resume assim", language: "pt", message_type: "text", created_at: iso(16) },
  { id: "9b4fdc65-6898-4c91-bba5-7ca6be21f301", conversation_id: V.ravi, sender_id: C.ravi, content: "because it is. step one: eat. step two: choose one plan.", language: "en", message_type: "text", created_at: iso(13) },
  { id: "a7639b3b-7ad6-4e79-853e-36aeaf5dc1db", conversation_id: V.family, sender_id: C.lia, content: "WHO moved my green jacket again", language: "en", message_type: "text", created_at: iso(88) },
  { id: "6c6e1d2b-ec1a-4353-a17b-c25716ddf643", conversation_id: V.family, sender_id: C.caio, content: "se vc achar no meu quarto vc some primeiro", language: "pt", message_type: "text", created_at: iso(85) },
  { id: "49929985-c744-4eb6-a9df-918d9177167d", conversation_id: V.family, sender_id: C.helena, content: "Nenhum de voces some. Todo mundo janta em casa hoje.", language: "pt", message_type: "text", created_at: iso(82) },
  { id: "2ab4c132-9e2c-4b71-a274-7cab0b4b7b14", conversation_id: V.college, sender_id: C.joana, content: "ok timeline simples: slides 17h, revisar 17h10, panico 17h12", language: "pt", message_type: "text", created_at: iso(59) },
  { id: "0c32ff5e-f86d-4f05-80ca-f62af83af31b", conversation_id: V.college, sender_id: C.camille, content: "The outline is good. The explanation just needs more confidence.", language: "fr", message_type: "text", created_at: iso(56) },
  { id: "7ad55432-a865-4875-ab0f-2ca9c2b2b27f", conversation_id: V.friends, sender_id: C.diego, content: "genteeee quadra hoje ou vamos seguir fingindo que temos energia pra estudar???", language: "es", message_type: "text", created_at: iso(23) },
  { id: "88fb0d38-4d14-4358-a5a0-aa7eb83ef54e", conversation_id: V.friends, sender_id: C.zoe, content: "I support chaos if someone else books the ride home.", language: "en", message_type: "text", created_at: iso(22) },
  { id: "dc74bb0a-1f09-40c8-9dbb-30d4df1f4d13", conversation_id: V.friends, sender_id: C.joana, content: "eu faco a lista. bob leva algum carisma pq o grupo ta fraco", language: "pt", message_type: "text", created_at: iso(20) },
];

const relationships: RelationshipRecord[] = [
  { id: "ed6a1856-b2e6-4b4c-9871-f0fa208df537", character_a: C.bob, character_b: C.sofia, affinity: 84, trust: 71, jealousy: 38, status: "unstable", updated_at: iso(34) },
  { id: "5afd4071-9efa-4c5f-bf42-f69cc2e34c92", character_a: C.bob, character_b: C.valentina, affinity: 76, trust: 52, jealousy: 47, status: "active", updated_at: iso(19) },
  { id: "63a5d317-6b61-4cb9-a8e5-796ea9f5a35c", character_a: C.bob, character_b: C.camille, affinity: 72, trust: 46, jealousy: 31, status: "active", updated_at: iso(67) },
  { id: "376877c9-6398-49d2-b0e3-5149aa2e1475", character_a: C.bob, character_b: C.maya, affinity: 48, trust: 42, jealousy: 28, status: "unstable", updated_at: iso(194) },
  { id: "51c92eb7-97d2-49ec-bf19-e564edaf3e01", character_a: C.bob, character_b: C.ravi, affinity: 87, trust: 82, jealousy: 4, status: "active", updated_at: iso(13) },
  { id: "8f97437a-2da5-4e09-9058-eb88c59f1152", character_a: C.bob, character_b: C.helena, affinity: 92, trust: 94, jealousy: 6, status: "active", updated_at: iso(51) },
  { id: "c03d8dca-7df8-4559-b68e-8169a2554bd4", character_a: C.bob, character_b: C.mauro, affinity: 77, trust: 79, jealousy: 5, status: "active", updated_at: iso(144) },
  { id: "87336b34-ce0e-44c7-818d-885cf7d44cd6", character_a: C.sofia, character_b: C.valentina, affinity: 18, trust: 21, jealousy: 72, status: "unstable", updated_at: iso(20) },
  { id: "483fa816-c712-483e-8a43-2fa3468048bc", character_a: C.sofia, character_b: C.maya, affinity: 12, trust: 16, jealousy: 69, status: "unstable", updated_at: iso(190) },
  { id: "8181b0e3-7a72-4634-856f-59c1c39c4de1", character_a: C.valentina, character_b: C.camille, affinity: 55, trust: 41, jealousy: 44, status: "active", updated_at: iso(56) },
];

const avatars: AvatarRecord[] = characters.map((character, index) => {
  const key = Object.keys(avatarUrls)[index] as keyof typeof avatarUrls;
  const contexts = character.visual_profile.photo_contexts as string[];
  return {
    id: `5c416fc9-8cf1-46b6-b11a-${String(index + 1).padStart(12, "0")}`.slice(0, 36),
    character_id: character.id,
    image_url: avatarUrls[key],
    prompt_used: `${character.visual_profile.core_description} Context: ${contexts[0]}.`,
    context_tag: contexts[0],
    created_at: iso(500 - index * 5),
    is_active: true,
  };
});

const events: EventRecord[] = [
  { id: "87c9d63b-80ca-412c-98fd-44d591d3839a", type: "romance", payload: { conversation_id: V.valentina, summary: "Valentina puxou Bob para combinar o role depois da aula." }, created_at: iso(22) },
  { id: "47d1d21b-2f53-47b7-811c-c02a10d33b5f", type: "group_event", payload: { conversation_id: V.friends, summary: "O grupo voltou a debater quadra, lanche e quem vai topar sair." }, created_at: iso(21) },
];

const systemState: SystemStateRecord = { id: SYSTEM_STATE_ID, drama_level: 1, last_simulation_tick: iso(12) };
const adminDirectives: AdminDirectiveRecord[] = [];

export function createSeedSnapshot(): DataSnapshot {
  return {
    users: structuredClone(users),
    characters: structuredClone(characters),
    conversations: structuredClone(conversations),
    conversationParticipants: structuredClone(conversationParticipants),
    messages: structuredClone(messages),
    events: structuredClone(events),
    relationships: structuredClone(relationships),
    avatars: structuredClone(avatars),
    systemState: structuredClone(systemState),
    adminDirectives: structuredClone(adminDirectives),
  };
}

export const seedIds = { characters: C, conversations: V, systemState: SYSTEM_STATE_ID };
