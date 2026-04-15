delete from public.messages;
delete from public.conversation_participants;
delete from public.conversations;
delete from public.avatars;
delete from public.events;
delete from public.relationships;
delete from public.characters;
delete from public.users;
delete from public.system_state;
delete from public.admin_directives;

insert into public.users (id, name, created_at) values
  ('4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', 'Bob', now() - interval '30 days');

insert into public.characters (id, name, primary_language, secondary_languages, relationship_type, personality_profile, response_style, visual_profile, created_at) values
  ('4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', 'Bob', 'pt', array['en','es'], 'self', '{"archetype":"quiet observer","traits":["curious","romantic","avoidant"],"soul_threads":["violao velho de madrugada","livro emprestado nunca devolvido","some mas ve stories","quase trocou de escola","um canto secreto da cidade","memoria de infancia em dias de chuva","arquivo infinito de prints e audios antigos"]}', '{"tone":"soft lowercase with irony","pacing":"short bursts","slang_level":"medium"}', '{"style":"social_confident","core_description":"Brazilian high school teen in candid city photos, hoodie layers, and relaxed everyday style.","photo_contexts":["mirror","bus-window","late-snack"],"update_frequency":"high"}', now() - interval '28 days'),
  ('82d3a621-4306-4bcc-bfdb-637cf73ce4fa', 'Helena', 'pt', array['es'], 'mother', '{"archetype":"protective organizer","traits":["warm","observant","dramatic"]}', '{"tone":"practical affection","pacing":"steady","slang_level":"low"}', '{"style":"social_confident","core_description":"Elegant Brazilian mother with warm kitchen selfies and home textures.","photo_contexts":["kitchen","garden","family-lunch"],"update_frequency":"medium"}', now() - interval '28 days'),
  ('0dcdb39a-8c49-4736-8e9f-228f08c2ddb4', 'Mauro', 'pt', array['en'], 'father', '{"archetype":"dry mentor","traits":["calm","practical","loyal"]}', '{"tone":"direct and economical","pacing":"slow","slang_level":"low"}', '{"style":"social_confident","core_description":"Reserved father with workshop lighting, neutral polos, and road-trip snapshots.","photo_contexts":["garage","barbecue","road-trip"],"update_frequency":"low"}', now() - interval '28 days'),
  ('5793f027-017c-4fca-8a8a-c5f3b4c2c6de', 'Lia', 'en', array['pt'], 'sibling', '{"archetype":"chaotic trend scout","traits":["witty","restless","protective"]}', '{"tone":"fast jokes and screenshots","pacing":"bursty","slang_level":"high"}', '{"style":"social_confident","core_description":"Fashion-forward older sister with flash photography, after-school hangouts, and mirror selfies.","photo_contexts":["party","mirror","ride-share"],"update_frequency":"high"}', now() - interval '27 days'),
  ('505f4308-7572-44e9-a6a7-c3d25c20c883', 'Caio', 'pt', array['en'], 'sibling', '{"archetype":"gym goblin with a heart","traits":["teasing","disciplined","impulsive"]}', '{"tone":"playful menace","pacing":"medium","slang_level":"high"}', '{"style":"social_confident","core_description":"Athletic younger brother with post-workout photos and sneaker culture energy.","photo_contexts":["gym","street-ball","post-workout"],"update_frequency":"high"}', now() - interval '27 days'),
  ('a262906b-69ee-4f96-b34e-67c6ef6ff185', 'Nina', 'es', array['pt','fr'], 'sibling', '{"archetype":"art-school satellite","traits":["sensitive","sharp","dreamy"]}', '{"tone":"poetic but blunt","pacing":"sporadic","slang_level":"medium"}', '{"style":"social_confident","core_description":"Artsy younger sister with film-camera vibes, sketchbooks, and museum cafe portraits.","photo_contexts":["studio","museum","cafe-window"],"update_frequency":"medium"}', now() - interval '27 days'),
  ('5dc2a558-641a-4960-94c0-3c1895ce1d49', 'Camille', 'fr', array['en','pt'], 'crush', '{"archetype":"composed flirt","traits":["elegant","playful","unreadable"]}', '{"tone":"short lines with a hidden smile","pacing":"slow-burn","slang_level":"low"}', '{"style":"social_confident","core_description":"French exchange student with polished cafe portraits and monochrome travel photos.","photo_contexts":["travel","museum","night-walk"],"update_frequency":"high"}', now() - interval '24 days'),
  ('bda27bd9-e3c2-4858-a698-a75f85a8d005', 'Valentina', 'es', array['pt','en'], 'crush', '{"archetype":"spark-plug extrovert","traits":["magnetic","competitive","curious"]}', '{"tone":"bright and teasing","pacing":"bursty","slang_level":"high"}', '{"style":"social_confident","core_description":"Charismatic exchange student with bright school-trip photos and confident social snapshots.","photo_contexts":["party","travel","sunset-roof"],"update_frequency":"high"}', now() - interval '24 days'),
  ('61fd1494-f6df-4473-bce5-8457e9101c85', 'Sofia', 'pt', array['en'], 'girlfriend', '{"archetype":"intense planner","traits":["loyal","romantic","sharp-tongued when hurt"]}', '{"tone":"clear and affectionate until upset","pacing":"measured bursts","slang_level":"medium"}', '{"style":"social_confident","core_description":"Confident teen student with neat casual looks, school-day mirror selfies, and after-class cafe photos.","photo_contexts":["mirror","after-class","study-cafe"],"update_frequency":"high"}', now() - interval '25 days'),
  ('30fa3efb-dc39-47eb-b14f-e3ecc09d014c', 'Maya', 'en', array['pt'], 'ex', '{"archetype":"cool-headed ghost from before","traits":["smart","guarded","observant"]}', '{"tone":"controlled and intentional","pacing":"slow","slang_level":"low"}', '{"style":"social_confident","core_description":"Thoughtful ex with quiet city portraits, tailored layers, and rain-reflective light.","photo_contexts":["travel","bookstore","late-train"],"update_frequency":"medium"}', now() - interval '25 days'),
  ('98d13438-8ef5-40dd-b5c9-f9b0d7d1c2ce', 'Prof. Andre', 'en', array['pt','fr'], 'teacher', '{"archetype":"charismatic deadline dealer","traits":["demanding","fair","energetic"]}', '{"tone":"crisp and motivating","pacing":"scheduled","slang_level":"low"}', '{"style":"social_confident","core_description":"Young teacher with classroom energy, rolled sleeves, and school corridor portraits.","photo_contexts":["school","classroom","teacher-room"],"update_frequency":"medium"}', now() - interval '40 days'),
  ('8ab66026-1ab3-42b1-a5ab-7d0b03768519', 'Ravi', 'en', array['pt','es'], 'friend', '{"archetype":"fixer friend","traits":["funny","reliable","nosy"]}', '{"tone":"friendly pressure","pacing":"quick","slang_level":"medium"}', '{"style":"social_confident","core_description":"Easygoing friend with snack-run snapshots, bright travel candids, and school-break energy.","photo_contexts":["travel","campus","coffee-run"],"update_frequency":"medium"}', now() - interval '23 days'),
  ('6a58c597-5a2d-4664-a8a8-137c0dc3770f', 'Joana', 'pt', array['en','es'], 'friend', '{"archetype":"group chat producer","traits":["organized","funny","bossy"]}', '{"tone":"energetic logistics","pacing":"fast","slang_level":"medium"}', '{"style":"social_confident","core_description":"Confident friend with weekend snack photos and clean school-gate backdrops.","photo_contexts":["brunch","campus","concert-line"],"update_frequency":"high"}', now() - interval '23 days'),
  ('d4ca3f2d-72b7-4d28-a7d9-8b9b431bdf3e', 'Diego', 'es', array['pt','en'], 'friend', '{"archetype":"chaotic optimist","traits":["spontaneous","loyal","loud"]}', '{"tone":"all gas no brakes","pacing":"bursty","slang_level":"high"}', '{"style":"social_confident","core_description":"Hyper-social friend with football energy and weekend-trip motion blur.","photo_contexts":["party","street-ball","weekend-trip"],"update_frequency":"high"}', now() - interval '22 days'),
  ('9c70ccb5-7a7d-4c01-b912-9bc79742d8cb', 'Zoe', 'en', array['fr','pt'], 'friend', '{"archetype":"cool-headed creative","traits":["perceptive","dry","articulate"]}', '{"tone":"dry humor and full sentences","pacing":"calm","slang_level":"low"}', '{"style":"social_confident","core_description":"Creative friend with editorial selfies, muted palettes, and gallery-night atmosphere.","photo_contexts":["gallery","train-window","late-dinner"],"update_frequency":"medium"}', now() - interval '22 days');

insert into public.conversations (id, type, title, created_at) values
  ('a25856c7-2ebc-46bb-bd32-d99db67a0da7', 'direct', null, now() - interval '640 minutes'),
  ('34ec7cb2-4f47-4a29-a52a-775b34e4f222', 'direct', null, now() - interval '900 minutes'),
  ('c5e8ad12-a073-4184-8cf2-2d5b0fcb35c4', 'direct', null, now() - interval '160 minutes'),
  ('60a13e6b-f4ef-4144-90e1-4698cad8f146', 'direct', null, now() - interval '520 minutes'),
  ('6f5fd9ca-212e-4a93-a96c-abf894de2cbf', 'direct', null, now() - interval '280 minutes'),
  ('3d941e36-7cb9-4749-8170-6e65102d630a', 'direct', null, now() - interval '210 minutes'),
  ('76f71f26-8c04-43aa-b0b0-aa2ff7287a52', 'direct', null, now() - interval '420 minutes'),
  ('963c17be-a03e-4fe9-b9f7-d98dfa4193b1', 'direct', null, now() - interval '125 minutes'),
  ('01996d9d-f9f0-4d85-a1c6-9d5c6763af57', 'group', 'Casa Bob', now() - interval '720 minutes'),
  ('3f52e848-88fb-4ae9-a355-bdc8c2e7eb7b', 'group', 'Sala 2B', now() - interval '510 minutes'),
  ('27368bd7-718f-4c65-aac8-c674df1773d4', 'group', 'Depois da Aula', now() - interval '150 minutes');

insert into public.conversation_participants (id, conversation_id, character_id) values
  ('79839346-f853-4bd4-83b9-b7efc03d4339', 'a25856c7-2ebc-46bb-bd32-d99db67a0da7', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1'),
  ('9554ef05-6844-4569-9a0f-c23e4062eb5c', 'a25856c7-2ebc-46bb-bd32-d99db67a0da7', '82d3a621-4306-4bcc-bfdb-637cf73ce4fa'),
  ('c8c04c69-80a7-46bc-b03b-703f054d29df', '34ec7cb2-4f47-4a29-a52a-775b34e4f222', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1'),
  ('a1d5dc6c-f320-4ad4-9f85-d859588f5bc7', '34ec7cb2-4f47-4a29-a52a-775b34e4f222', '0dcdb39a-8c49-4736-8e9f-228f08c2ddb4'),
  ('1323d7dc-2d96-415e-a855-d1a15cf54d68', 'c5e8ad12-a073-4184-8cf2-2d5b0fcb35c4', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1'),
  ('aeb2654f-91d1-48f5-b9b5-f59e2f0fd7d8', 'c5e8ad12-a073-4184-8cf2-2d5b0fcb35c4', '61fd1494-f6df-4473-bce5-8457e9101c85'),
  ('0c1aef68-97e6-4416-b31f-9018997c20eb', '60a13e6b-f4ef-4144-90e1-4698cad8f146', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1'),
  ('9d94c17c-b9c6-42e4-bdf7-1f92afcef5bf', '60a13e6b-f4ef-4144-90e1-4698cad8f146', '30fa3efb-dc39-47eb-b14f-e3ecc09d014c'),
  ('690695ca-4c11-45db-bc44-d0ecbe9d2766', '6f5fd9ca-212e-4a93-a96c-abf894de2cbf', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1'),
  ('bcb19a70-0a11-4e5c-b6ea-f3a19fcc4850', '6f5fd9ca-212e-4a93-a96c-abf894de2cbf', '5dc2a558-641a-4960-94c0-3c1895ce1d49'),
  ('6fa1a8cc-4604-4584-896c-168c047513b8', '3d941e36-7cb9-4749-8170-6e65102d630a', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1'),
  ('7010d46f-68cd-4b1f-89d0-cd4781c3ac37', '3d941e36-7cb9-4749-8170-6e65102d630a', 'bda27bd9-e3c2-4858-a698-a75f85a8d005'),
  ('bb047dbd-6d7c-4f7d-a404-5b028af829d5', '76f71f26-8c04-43aa-b0b0-aa2ff7287a52', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1'),
  ('d3bc1f80-c8e8-416d-a73d-366f84f95b49', '76f71f26-8c04-43aa-b0b0-aa2ff7287a52', '98d13438-8ef5-40dd-b5c9-f9b0d7d1c2ce'),
  ('615f4b6b-a806-4030-9d0f-ca94d0c576fd', '963c17be-a03e-4fe9-b9f7-d98dfa4193b1', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1'),
  ('4a87580b-95d0-4d85-9d24-21557f0150b4', '963c17be-a03e-4fe9-b9f7-d98dfa4193b1', '8ab66026-1ab3-42b1-a5ab-7d0b03768519'),
  ('016aa28a-fdda-49c9-bd68-672a01942e9c', '01996d9d-f9f0-4d85-a1c6-9d5c6763af57', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1'),
  ('887c561f-6dc1-474d-a357-8a33594caf9f', '01996d9d-f9f0-4d85-a1c6-9d5c6763af57', '82d3a621-4306-4bcc-bfdb-637cf73ce4fa'),
  ('0e57d224-41ff-43c1-aa1d-cfbc7f5af6ce', '01996d9d-f9f0-4d85-a1c6-9d5c6763af57', '0dcdb39a-8c49-4736-8e9f-228f08c2ddb4'),
  ('7095fab9-097c-4e7a-8744-9725fb9a2b03', '01996d9d-f9f0-4d85-a1c6-9d5c6763af57', '5793f027-017c-4fca-8a8a-c5f3b4c2c6de'),
  ('5cf1c8da-3ad8-4ad5-96aa-c6e5ea8dc251', '01996d9d-f9f0-4d85-a1c6-9d5c6763af57', '505f4308-7572-44e9-a6a7-c3d25c20c883'),
  ('b1be8d6f-1824-46c3-a35e-a1e71e84aa6b', '01996d9d-f9f0-4d85-a1c6-9d5c6763af57', 'a262906b-69ee-4f96-b34e-67c6ef6ff185'),
  ('0f80c98a-f427-44ba-9d80-a94a8f9e8b6f', '3f52e848-88fb-4ae9-a355-bdc8c2e7eb7b', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1'),
  ('229d5606-d746-48c0-b18d-ab2d57c1ff0e', '3f52e848-88fb-4ae9-a355-bdc8c2e7eb7b', '98d13438-8ef5-40dd-b5c9-f9b0d7d1c2ce'),
  ('c05c6b13-8662-442c-9837-c99af15e2085', '3f52e848-88fb-4ae9-a355-bdc8c2e7eb7b', '8ab66026-1ab3-42b1-a5ab-7d0b03768519'),
  ('6a1279c1-84c5-43d0-af0d-b7f2b3c75f02', '3f52e848-88fb-4ae9-a355-bdc8c2e7eb7b', '6a58c597-5a2d-4664-a8a8-137c0dc3770f'),
  ('58ea545a-1e1e-4a1c-9fe0-4c8089a08d2c', '3f52e848-88fb-4ae9-a355-bdc8c2e7eb7b', 'bda27bd9-e3c2-4858-a698-a75f85a8d005'),
  ('95807a4e-e54d-49d2-87d1-557663d7ce4d', '3f52e848-88fb-4ae9-a355-bdc8c2e7eb7b', '5dc2a558-641a-4960-94c0-3c1895ce1d49'),
  ('41b51dfa-0804-4f33-bd37-f45a46ee1258', '27368bd7-718f-4c65-aac8-c674df1773d4', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1'),
  ('50f7b0ba-32de-4b89-a678-8946347d64e7', '27368bd7-718f-4c65-aac8-c674df1773d4', '8ab66026-1ab3-42b1-a5ab-7d0b03768519'),
  ('fd7ea9c9-abf9-42d5-aecd-c09a4dd4e247', '27368bd7-718f-4c65-aac8-c674df1773d4', '6a58c597-5a2d-4664-a8a8-137c0dc3770f'),
  ('eb401da3-c9bf-4175-b465-d4692dc0c892', '27368bd7-718f-4c65-aac8-c674df1773d4', 'd4ca3f2d-72b7-4d28-a7d9-8b9b431bdf3e'),
  ('41ad74d7-42cd-487c-ba26-6ff5c7d70483', '27368bd7-718f-4c65-aac8-c674df1773d4', '9c70ccb5-7a7d-4c01-b912-9bc79742d8cb'),
  ('f2f34ecb-f493-42a9-9228-a675381e7af2', '27368bd7-718f-4c65-aac8-c674df1773d4', '505f4308-7572-44e9-a6a7-c3d25c20c883');

insert into public.messages (id, conversation_id, sender_id, content, language, message_type, created_at) values
  ('67bb8a0e-0ec1-48f9-89d2-40ffefe788c0', 'a25856c7-2ebc-46bb-bd32-d99db67a0da7', '82d3a621-4306-4bcc-bfdb-637cf73ce4fa', 'Bob, deixei comida na geladeira e nao vale fingir que nao viu', 'pt', 'text', now() - interval '54 minutes'),
  ('5bcb7af4-9ca4-4f0f-8fd9-31ddf8750ee4', 'a25856c7-2ebc-46bb-bd32-d99db67a0da7', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', 'vi sim mae', 'pt', 'text', now() - interval '53 minutes'),
  ('6d51c433-5d12-4b8c-a2b5-06798e91aa7b', 'a25856c7-2ebc-46bb-bd32-d99db67a0da7', '82d3a621-4306-4bcc-bfdb-637cf73ce4fa', 'e agua. e fruta. e responde sua tia depois', 'pt', 'text', now() - interval '51 minutes'),
  ('fd7a4dbf-359f-4408-8ec8-54d7cf191df0', '34ec7cb2-4f47-4a29-a52a-775b34e4f222', '0dcdb39a-8c49-4736-8e9f-228f08c2ddb4', 'Contato do mecanico: Sergio 11 9xxxx-xxxx', 'pt', 'text', now() - interval '146 minutes'),
  ('bd5f5ab0-a064-4f09-89ea-93935c2c1477', '76f71f26-8c04-43aa-b0b0-aa2ff7287a52', '98d13438-8ef5-40dd-b5c9-f9b0d7d1c2ce', 'Need your project slides sent before 18:00. No last-minute drama.', 'en', 'text', now() - interval '81 minutes'),
  ('3879c195-e84f-4958-9158-c7b2771df6d6', '76f71f26-8c04-43aa-b0b0-aa2ff7287a52', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', 'mando antes das 17:30', 'pt', 'text', now() - interval '78 minutes'),
  ('f955c794-f516-4b7c-b6bf-db0f2997be7f', '76f71f26-8c04-43aa-b0b0-aa2ff7287a52', '98d13438-8ef5-40dd-b5c9-f9b0d7d1c2ce', 'That answer works. Keep the same clarity in the presentation.', 'en', 'text', now() - interval '74 minutes'),
  ('8dc6f8c4-a6bd-4dac-9e06-fb5d5ba69aac', 'c5e8ad12-a073-4184-8cf2-2d5b0fcb35c4', '61fd1494-f6df-4473-bce5-8457e9101c85', 'vc vai sumir da terra a tarde toda mesmo?', 'pt', 'text', now() - interval '41 minutes'),
  ('243b8a1c-1fb9-4701-bdda-f2ab79af9932', 'c5e8ad12-a073-4184-8cf2-2d5b0fcb35c4', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', 'tenho reuniao com o andre e depois talvez eu passe ai', 'pt', 'text', now() - interval '38 minutes'),
  ('3ae447a0-c24f-4b28-8c69-3ef85f67c2c7', 'c5e8ad12-a073-4184-8cf2-2d5b0fcb35c4', '61fd1494-f6df-4473-bce5-8457e9101c85', 'talvez me deixa mais ansiosa que um nao', 'pt', 'text', now() - interval '35 minutes'),
  ('ca3db31d-f50c-49ed-9117-1be39e1c2daa', '60a13e6b-f4ef-4144-90e1-4698cad8f146', '30fa3efb-dc39-47eb-b14f-e3ecc09d014c', 'Not trying to restart history. Just checking if that book was yours or mine.', 'en', 'text', now() - interval '204 minutes'),
  ('c48a0db6-84f2-4b4b-b258-db77810d6572', '6f5fd9ca-212e-4a93-a96c-abf894de2cbf', '5dc2a558-641a-4960-94c0-3c1895ce1d49', 'Tu arrives toujours juste apres le moment interessant.', 'fr', 'text', now() - interval '77 minutes'),
  ('ea1d43d1-c479-46a7-8db7-e6b6f078506f', '6f5fd9ca-212e-4a93-a96c-abf894de2cbf', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', 'entao me da mais uma chance de acertar o timing', 'pt', 'text', now() - interval '72 minutes'),
  ('6d95546f-f7be-4647-b264-02c8d9df622f', '6f5fd9ca-212e-4a93-a96c-abf894de2cbf', '5dc2a558-641a-4960-94c0-3c1895ce1d49', 'On verra. Peut-etre ce soir.', 'fr', 'text', now() - interval '68 minutes'),
  ('3d10ef40-973f-4abd-8a81-3a337631b7c8', '3d941e36-7cb9-4749-8170-6e65102d630a', 'bda27bd9-e3c2-4858-a698-a75f85a8d005', 'Bobbbb, dime que sigues vivo para lo de hoy', 'es', 'text', now() - interval '26 minutes'),
  ('ec39cb26-d3f6-4e92-88ac-2782c6f90258', '3d941e36-7cb9-4749-8170-6e65102d630a', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', 'to vivo sim kkk so saindo da escola', 'pt', 'text', now() - interval '24 minutes'),
  ('31d4f8c0-4c9b-490b-8cb9-972c2b5c4e90', '3d941e36-7cb9-4749-8170-6e65102d630a', 'bda27bd9-e3c2-4858-a698-a75f85a8d005', 'perfecto. trae una idea mejor que la mia y ya ganaste', 'es', 'text', now() - interval '21 minutes'),
  ('11c4ec83-cb8f-4caa-8ec8-80a0269c4e06', '3d941e36-7cb9-4749-8170-6e65102d630a', 'bda27bd9-e3c2-4858-a698-a75f85a8d005', 'y si Sofia pregunta, yo no dije nada', 'es', 'text', now() - interval '19 minutes'),
  ('2ea0b16b-a304-469b-ad16-dc540603c099', '963c17be-a03e-4fe9-b9f7-d98dfa4193b1', '8ab66026-1ab3-42b1-a5ab-7d0b03768519', 'real talk, you have too many pending plans and zero organization', 'en', 'text', now() - interval '18 minutes'),
  ('1025388f-523b-4b08-aa37-715d39070d0d', '963c17be-a03e-4fe9-b9f7-d98dfa4193b1', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', 'isso parece pior quando vc resume assim', 'pt', 'text', now() - interval '16 minutes'),
  ('9b4fdc65-6898-4c91-bba5-7ca6be21f301', '963c17be-a03e-4fe9-b9f7-d98dfa4193b1', '8ab66026-1ab3-42b1-a5ab-7d0b03768519', 'because it is. step one: eat. step two: choose one plan.', 'en', 'text', now() - interval '13 minutes'),
  ('a7639b3b-7ad6-4e79-853e-36aeaf5dc1db', '01996d9d-f9f0-4d85-a1c6-9d5c6763af57', '5793f027-017c-4fca-8a8a-c5f3b4c2c6de', 'WHO moved my green jacket again', 'en', 'text', now() - interval '88 minutes'),
  ('6c6e1d2b-ec1a-4353-a17b-c25716ddf643', '01996d9d-f9f0-4d85-a1c6-9d5c6763af57', '505f4308-7572-44e9-a6a7-c3d25c20c883', 'se vc achar no meu quarto vc some primeiro', 'pt', 'text', now() - interval '85 minutes'),
  ('49929985-c744-4eb6-a9df-918d9177167d', '01996d9d-f9f0-4d85-a1c6-9d5c6763af57', '82d3a621-4306-4bcc-bfdb-637cf73ce4fa', 'Nenhum de voces some. Todo mundo janta em casa hoje.', 'pt', 'text', now() - interval '82 minutes'),
  ('2ab4c132-9e2c-4b71-a274-7cab0b4b7b14', '3f52e848-88fb-4ae9-a355-bdc8c2e7eb7b', '6a58c597-5a2d-4664-a8a8-137c0dc3770f', 'ok timeline simples: slides 17h, revisar 17h10, panico 17h12', 'pt', 'text', now() - interval '59 minutes'),
  ('0c32ff5e-f86d-4f05-80ca-f62af83af31b', '3f52e848-88fb-4ae9-a355-bdc8c2e7eb7b', '5dc2a558-641a-4960-94c0-3c1895ce1d49', 'The outline is good. The explanation just needs more confidence.', 'fr', 'text', now() - interval '56 minutes'),
  ('7ad55432-a865-4875-ab0f-2ca9c2b2b27f', '27368bd7-718f-4c65-aac8-c674df1773d4', 'd4ca3f2d-72b7-4d28-a7d9-8b9b431bdf3e', 'genteeee quadra hoje ou vamos seguir fingindo que temos energia pra estudar???', 'es', 'text', now() - interval '23 minutes'),
  ('88fb0d38-4d14-4358-a5a0-aa7eb83ef54e', '27368bd7-718f-4c65-aac8-c674df1773d4', '9c70ccb5-7a7d-4c01-b912-9bc79742d8cb', 'I support chaos if someone else books the ride home.', 'en', 'text', now() - interval '22 minutes'),
  ('dc74bb0a-1f09-40c8-9dbb-30d4df1f4d13', '27368bd7-718f-4c65-aac8-c674df1773d4', '6a58c597-5a2d-4664-a8a8-137c0dc3770f', 'eu faco a lista. bob leva algum carisma pq o grupo ta fraco', 'pt', 'text', now() - interval '20 minutes');

insert into public.events (id, type, payload, created_at) values
  ('87c9d63b-80ca-412c-98fd-44d591d3839a', 'romance', '{"conversation_id":"3d941e36-7cb9-4749-8170-6e65102d630a","summary":"Valentina puxou Bob para combinar o role depois da aula."}', now() - interval '22 minutes'),
  ('47d1d21b-2f53-47b7-811c-c02a10d33b5f', 'group_event', '{"conversation_id":"27368bd7-718f-4c65-aac8-c674df1773d4","summary":"O grupo voltou a debater quadra, lanche e quem vai topar sair."}', now() - interval '21 minutes');

insert into public.relationships (id, character_a, character_b, affinity, trust, jealousy, status, updated_at) values
  ('ed6a1856-b2e6-4b4c-9871-f0fa208df537', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', '61fd1494-f6df-4473-bce5-8457e9101c85', 84, 71, 38, 'unstable', now() - interval '34 minutes'),
  ('5afd4071-9efa-4c5f-bf42-f69cc2e34c92', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', 'bda27bd9-e3c2-4858-a698-a75f85a8d005', 76, 52, 47, 'active', now() - interval '19 minutes'),
  ('63a5d317-6b61-4cb9-a8e5-796ea9f5a35c', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', '5dc2a558-641a-4960-94c0-3c1895ce1d49', 72, 46, 31, 'active', now() - interval '67 minutes'),
  ('376877c9-6398-49d2-b0e3-5149aa2e1475', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', '30fa3efb-dc39-47eb-b14f-e3ecc09d014c', 48, 42, 28, 'unstable', now() - interval '194 minutes'),
  ('51c92eb7-97d2-49ec-bf19-e564edaf3e01', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', '8ab66026-1ab3-42b1-a5ab-7d0b03768519', 87, 82, 4, 'active', now() - interval '13 minutes'),
  ('8f97437a-2da5-4e09-9058-eb88c59f1152', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', '82d3a621-4306-4bcc-bfdb-637cf73ce4fa', 92, 94, 6, 'active', now() - interval '51 minutes'),
  ('c03d8dca-7df8-4559-b68e-8169a2554bd4', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', '0dcdb39a-8c49-4736-8e9f-228f08c2ddb4', 77, 79, 5, 'active', now() - interval '144 minutes'),
  ('87336b34-ce0e-44c7-818d-885cf7d44cd6', '61fd1494-f6df-4473-bce5-8457e9101c85', 'bda27bd9-e3c2-4858-a698-a75f85a8d005', 18, 21, 72, 'unstable', now() - interval '20 minutes'),
  ('483fa816-c712-483e-8a43-2fa3468048bc', '61fd1494-f6df-4473-bce5-8457e9101c85', '30fa3efb-dc39-47eb-b14f-e3ecc09d014c', 12, 16, 69, 'unstable', now() - interval '190 minutes'),
  ('8181b0e3-7a72-4634-856f-59c1c39c4de1', 'bda27bd9-e3c2-4858-a698-a75f85a8d005', '5dc2a558-641a-4960-94c0-3c1895ce1d49', 55, 41, 44, 'active', now() - interval '56 minutes');

insert into public.avatars (id, character_id, image_url, prompt_used, context_tag, created_at, is_active) values
  ('5c416fc9-8cf1-46b6-b11a-000000000001', '4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80', 'Brazilian high school teen in candid city photos, hoodie layers, and relaxed everyday style. Context: mirror.', 'mirror', now() - interval '500 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000002', '82d3a621-4306-4bcc-bfdb-637cf73ce4fa', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=640&q=80', 'Elegant Brazilian mother with warm kitchen selfies and home textures. Context: kitchen.', 'kitchen', now() - interval '495 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000003', '0dcdb39a-8c49-4736-8e9f-228f08c2ddb4', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=640&q=80', 'Reserved father with workshop lighting, neutral polos, and road-trip snapshots. Context: garage.', 'garage', now() - interval '490 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000004', '5793f027-017c-4fca-8a8a-c5f3b4c2c6de', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=640&q=80', 'Fashion-forward older sister with flash photography, after-school hangouts, and mirror selfies. Context: party.', 'party', now() - interval '485 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000005', '505f4308-7572-44e9-a6a7-c3d25c20c883', 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=640&q=80', 'Athletic younger brother with post-workout photos and sneaker culture energy. Context: gym.', 'gym', now() - interval '480 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000006', 'a262906b-69ee-4f96-b34e-67c6ef6ff185', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=640&q=80', 'Artsy younger sister with film-camera vibes, sketchbooks, and museum cafe portraits. Context: studio.', 'studio', now() - interval '475 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000007', '5dc2a558-641a-4960-94c0-3c1895ce1d49', 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df2?auto=format&fit=crop&w=640&q=80', 'French exchange student with polished cafe portraits and monochrome travel photos. Context: travel.', 'travel', now() - interval '470 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000008', 'bda27bd9-e3c2-4858-a698-a75f85a8d005', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80', 'Charismatic exchange student with bright school-trip photos and confident social snapshots. Context: party.', 'party', now() - interval '465 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000009', '61fd1494-f6df-4473-bce5-8457e9101c85', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=640&q=80', 'Confident teen student with neat casual looks, school-day mirror selfies, and after-class cafe photos. Context: mirror.', 'mirror', now() - interval '460 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000010', '30fa3efb-dc39-47eb-b14f-e3ecc09d014c', 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=640&q=80', 'Thoughtful ex with quiet city portraits, tailored layers, and rain-reflective light. Context: travel.', 'travel', now() - interval '455 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000011', '98d13438-8ef5-40dd-b5c9-f9b0d7d1c2ce', 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=640&q=80', 'Young teacher with classroom energy, rolled sleeves, and school corridor portraits. Context: school.', 'school', now() - interval '450 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000012', '8ab66026-1ab3-42b1-a5ab-7d0b03768519', 'https://images.unsplash.com/photo-1506795660185-6f401f7d2026?auto=format&fit=crop&w=640&q=80', 'Easygoing friend with snack-run snapshots, bright travel candids, and school-break energy. Context: travel.', 'travel', now() - interval '445 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000013', '6a58c597-5a2d-4664-a8a8-137c0dc3770f', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=640&q=80', 'Confident friend with weekend snack photos and clean school-gate backdrops. Context: brunch.', 'brunch', now() - interval '440 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000014', 'd4ca3f2d-72b7-4d28-a7d9-8b9b431bdf3e', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80&sat=-20', 'Hyper-social friend with football energy and weekend-trip motion blur. Context: party.', 'party', now() - interval '435 minutes', true),
  ('5c416fc9-8cf1-46b6-b11a-000000000015', '9c70ccb5-7a7d-4c01-b912-9bc79742d8cb', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=640&q=80', 'Creative friend with editorial selfies, muted palettes, and gallery-night atmosphere. Context: gallery.', 'gallery', now() - interval '430 minutes', true);

insert into public.system_state (id, drama_level, last_simulation_tick) values
  ('e4f14833-f419-40f7-bc68-90d0ef88b23d', 1, now() - interval '12 minutes');
