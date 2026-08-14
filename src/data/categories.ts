import type { Category } from '../types';
import { GRAMMAR } from './grammar';

function withIds(catId: string, phrases: { c: string; j: string; e: string; n?: string }[]) {
  return phrases.map((p, i) => ({ ...p, id: `${catId}-${i}` }));
}

export const CATEGORIES: Category[] = [
  { id: 'grammar', name: 'Grammar & Tenses', emoji: '📐', type: 'grammar', phrases: GRAMMAR.phrases },

  {
    id: 'greet',
    name: 'Greetings & Basics',
    emoji: '👋',
    phrases: withIds('greet', [
      { c: '你好', j: 'nei5 hou2', e: 'Hello' },
      { c: '早晨', j: 'zou2 san4', e: 'Good morning' },
      { c: '你好嗎？', j: 'nei5 hou2 maa3', e: 'How are you?' },
      { c: '食咗飯未呀？', j: 'sik6 zo2 faan6 mei6 aa3', e: 'Have you eaten?', n: 'A genuine everyday greeting, not really about food' },
      { c: '多謝', j: 'do1 ze6', e: 'Thank you (for a gift or compliment)' },
      { c: '唔該', j: 'm4 goi1', e: 'Thank you (for a favour / service)' },
      { c: '唔使客氣', j: 'm4 sai2 haak3 hei3', e: "You're welcome" },
      { c: '唔好意思', j: 'm4 hou2 ji3 si1', e: 'Excuse me / sorry (casual)' },
      { c: '對唔住', j: 'deoi3 m4 zyu6', e: 'Sorry (more formal apology)' },
      { c: '你叫咩名呀？', j: 'nei5 giu3 me1 meng2 aa3', e: "What's your name?" },
      { c: '你點呀？', j: 'nei5 dim2 aa3', e: 'How are you doing?' },
      { c: '做咩呀？', j: 'zou6 me1 aa3', e: "What's up?" },
      { c: '好耐冇見', j: 'hou2 noi6 mou5 gin3', e: 'Long time no see' },
      { c: '聽日見', j: 'ting1 jat6 gin3', e: 'See you tomorrow' },
      { c: '拜拜', j: 'baai1 baai3', e: 'Bye bye' },
    ]),
  },

  {
    id: 'family',
    name: 'Family & Introducing Yourself',
    emoji: '👪',
    phrases: withIds('family', [
      { c: '我', j: 'ngo5', e: 'I / me' },
      { c: '你', j: 'nei5', e: 'you' },
      { c: '佢', j: 'keoi5', e: 'he / she / it' },
      { c: '我哋', j: 'ngo5 dei6', e: 'we / us' },
      { c: '你哋', j: 'nei5 dei6', e: 'you (plural)' },
      { c: '佢哋', j: 'keoi5 dei6', e: 'they / them' },
      { c: '我係……', j: 'ngo5 hai6 ……', e: 'I am… (name)' },
      { c: '阿爸 / 爸爸', j: 'aa3 baa4 / baa4 baa1', e: 'Dad' },
      { c: '阿媽 / 媽媽', j: 'aa3 maa1 / maa4 maa1', e: 'Mom' },
      { c: '哥哥', j: 'go4 go1', e: 'Elder brother' },
      { c: '家姐', j: 'gaa1 ze1', e: 'Elder sister' },
      { c: '細佬', j: 'sai3 lou2', e: 'Younger brother' },
      { c: '細妹', j: 'sai3 mui2', e: 'Younger sister' },
      { c: '男朋友 / 女朋友', j: 'naam4 pang4 jau5 / neoi5 pang4 jau5', e: 'Boyfriend / girlfriend' },
      { c: '屋企人', j: 'uk1 kei2 jan4', e: 'Family members' },
      { c: '我嘅……', j: 'ngo5 ge3 ……', e: 'My… (possession)' },
      { c: '你嘅屋企有咩人呀？', j: 'nei5 ge3 uk1 kei2 jau5 me1 jan4 aa3', e: "Who's in your family?" },
      { c: '呢個係我嘅女朋友', j: 'nei1 go3 hai6 ngo5 ge3 neoi5 pang4 jau5', e: 'This is my girlfriend' },
    ]),
  },

  {
    id: 'food',
    name: 'Food, Drinks & Cha Chaan Teng',
    emoji: '🍵',
    phrases: withIds('food', [
      { c: '我想要……', j: 'ngo5 soeng2 jiu3 ……', e: 'I want to have… (a thing)' },
      { c: '我想食……', j: 'ngo5 soeng2 sik6 ……', e: 'I want to eat…' },
      { c: '你想飲咩呀？', j: 'nei5 soeng2 jam2 me1 aa3', e: 'What do you want to drink?' },
      { c: '呢個幾錢呀？', j: 'nei1 go3 gei2 cin2 aa3', e: 'How much is this?' },
      { c: '好味', j: 'hou2 mei6', e: 'Tasty' },
      { c: '好唔好味？', j: 'hou2 m4 hou2 mei6', e: 'Is it tasty or not?' },
      { c: '奶茶', j: 'naai5 caa4', e: 'Milk tea' },
      { c: '凍檸茶', j: 'dung3 ling2 caa4', e: 'Iced lemon tea' },
      { c: '珍珠奶茶', j: 'zan1 zyu1 naai5 caa4', e: 'Bubble tea' },
      { c: '蛋撻', j: 'daan6 taat3', e: 'Egg tart' },
      { c: '菠蘿包', j: 'bo1 lo4 baau1', e: 'Pineapple bun' },
      { c: '西多士', j: 'sai1 do1 si2', e: 'French toast' },
      { c: '雞蛋仔', j: 'gai1 daan6 zai2', e: 'Egg waffle' },
      { c: '蝦餃', j: 'haa1 gaau2', e: 'Har gow (shrimp dumplings)' },
      { c: '燒賣', j: 'siu1 maai2', e: 'Siu mai' },
      { c: '叉燒包', j: 'caa1 siu1 baau1', e: 'BBQ pork bun' },
      { c: '腸粉', j: 'coeng2 fan2', e: 'Rice noodle rolls' },
    ]),
  },

  {
    id: 'numbers',
    name: 'Numbers, Money, Time & Date',
    emoji: '🔢',
    phrases: withIds('numbers', [
      { c: '一 / 二 / 三 / 四 / 五', j: 'jat1 / ji6 / saam1 / sei3 / ng5', e: '1 / 2 / 3 / 4 / 5' },
      { c: '六 / 七 / 八 / 九 / 十', j: 'luk6 / cat1 / baat3 / gau2 / sap6', e: '6 / 7 / 8 / 9 / 10' },
      { c: '一百 / 一千 / 一萬', j: 'jat1 baak3 / jat1 cin1 / jat1 maan6', e: '100 / 1,000 / 10,000' },
      { c: '幾多錢呀？', j: 'gei2 do1 cin2 aa3', e: 'How much money?' },
      { c: '蚊', j: 'man1', e: 'Dollar (HKD, colloquial)' },
      { c: '而家幾點呀？', j: 'ji4 gaa1 gei2 dim2 aa3', e: 'What time is it now?' },
      { c: '今日', j: 'gam1 jat6', e: 'Today' },
      { c: '尋日', j: 'cam4 jat6', e: 'Yesterday' },
      { c: '聽日', j: 'ting1 jat6', e: 'Tomorrow' },
      { c: '今日星期幾？', j: 'gam1 jat6 sing1 kei4 gei2 aa3', e: 'What day is today?' },
      { c: '今日幾多號？', j: 'gam1 jat6 gei2 do1 hou6 aa3', e: "What's the date today?" },
    ]),
  },

  {
    id: 'questions',
    name: 'Asking Questions',
    emoji: '❓',
    phrases: withIds('questions', [
      { c: '邊個', j: 'bin1 go3', e: 'Who' },
      { c: '邊度', j: 'bin1 dou6', e: 'Where' },
      { c: '幾多', j: 'gei2 do1', e: 'How many / how much' },
      { c: '幾時', j: 'gei2 si4', e: 'When' },
      { c: '幾點', j: 'gei2 dim2', e: 'What time' },
      { c: '點解', j: 'dim2 gaai2', e: 'Why' },
      { c: '點樣', j: 'dim2 joeng2', e: 'How' },
      { c: '你去邊度？', j: 'nei5 heoi3 bin1 dou6', e: 'Where are you going?' },
      { c: '洗手間喺邊度？', j: 'sai2 sau2 gaan1 hai2 bin1 dou6', e: "Where's the restroom?" },
      { c: '你有冇……？', j: 'nei5 jau5 mou5 ……', e: 'Do you have…?' },
    ]),
  },

  {
    id: 'emotions',
    name: 'Emotions & Feelings',
    emoji: '😊',
    phrases: withIds('emotions', [
      { c: '你心情點呀？', j: 'nei5 sam1 cing4 dim2 aa3', e: "How's your mood?" },
      { c: '我覺得好……', j: 'ngo5 gok3 dak1 hou2 ……', e: 'I feel very…' },
      { c: '開心 / 唔開心', j: 'hoi1 sam1 / m4 hoi1 sam1', e: 'Happy / unhappy' },
      { c: '攰', j: 'gui6', e: 'Tired' },
      { c: '肚餓', j: 'tou5 ngo6', e: 'Hungry' },
      { c: '頸渴', j: 'geng2 hot3', e: 'Thirsty' },
      { c: '唔舒服', j: 'm4 syu1 fuk6', e: 'Not feeling well' },
      { c: '興奮', j: 'hing1 fan5', e: 'Excited' },
      { c: '緊張', j: 'gan2 zoeng1', e: 'Nervous' },
    ]),
  },

  {
    id: 'weather',
    name: 'Weather',
    emoji: '☀️',
    phrases: withIds('weather', [
      { c: '今日天氣點呀？', j: 'gam1 jat6 tin1 hei3 dim2 aa3', e: "How's the weather today?" },
      { c: '今日好熱', j: 'gam1 jat6 hou2 jit6', e: 'Today is very hot' },
      { c: '今日幾涼', j: 'gam1 jat6 gei2 loeng4', e: 'Today is quite cool' },
      { c: '今日有啲凍', j: 'gam1 jat6 jau5 di1 dung3', e: 'Today is a bit cold' },
      { c: '落雨', j: 'lok6 jyu5', e: 'Raining' },
      { c: '多雲', j: 'do1 wan4', e: 'Cloudy' },
      { c: '大風', j: 'daai6 fung1', e: 'Windy' },
    ]),
  },

  {
    id: 'chat',
    name: 'Hobbies & Small Talk',
    emoji: '💬',
    phrases: withIds('chat', [
      { c: '你鍾意咩呀？', j: 'nei5 zung1 ji3 me1 aa3', e: 'What do you like?' },
      { c: '我鍾意行山', j: 'ngo5 zung1 ji3 haang4 saan1', e: 'I like hiking' },
      { c: '我鍾意睇書', j: 'ngo5 zung1 ji3 tai2 syu1', e: 'I like reading' },
      { c: '我鍾意影相', j: 'ngo5 zung1 ji3 jing2 soeng2', e: 'I like photography' },
      { c: '你去過香港未呀？', j: 'nei5 heoi3 gwo3 hoeng1 gong2 mei6 aa3', e: 'Have you been to Hong Kong before?' },
      { c: '我第一次嚟香港', j: 'ngo5 dai6 jat1 ci3 lai4 hoeng1 gong2', e: 'This is my first time in Hong Kong' },
      { c: '我識少少廣東話', j: 'ngo5 sik1 siu2 siu2 gwong2 dung1 waa2', e: 'I know a little Cantonese' },
      { c: '慢慢講，唔該', j: 'maan6 maan2 gong2, m4 goi1', e: 'Please speak slowly' },
      { c: '可唔可以再講一次？', j: 'ho2 m4 ho2 ji3 zoi3 gong2 jat1 ci3', e: 'Can you say that again?' },
    ]),
  },

  {
    id: 'tonetrap',
    name: 'Tone Traps ⚠️',
    emoji: '⚠️',
    desc: "From Bess's notes — same spelling, different tone, completely different meaning. Worth slowing down for.",
    phrases: withIds('tonetrap', [
      { c: '星期一 vs 星期日', j: 'sing1 kei4 jat1 vs sing1 kei4 jat6', e: 'Monday vs Sunday' },
      { c: '一日 vs 日日', j: 'jat1 jat6 vs jat6 jat6', e: 'One day vs everyday' },
      { c: '主修 vs 豬手', j: 'zyu2 sau1 vs zyu1 sau2', e: 'Major subject vs pig knuckle' },
      { c: '阿媽 vs 阿嫲', j: 'aa3 maa1 vs aa3 maa4', e: 'Mum vs Grandma' },
      { c: '細佬 vs 細路', j: 'sai3 lou2 vs sai3 lou6', e: 'Younger brother vs kids' },
      { c: '主要 vs 豬腰', j: 'zyu2 jiu3 vs zyu1 jiu1', e: 'Main vs pig kidney' },
      { c: '晴天 vs 青天', j: 'cing4 tin1 vs cing1 tin1', e: 'Sunny vs blue sky' },
      { c: '母雞 vs 冇計', j: 'mou5 gai1 vs mou5 gai2', e: 'Hen vs no way to deal with it' },
      { c: '老西 vs 老細', j: 'lou5 sai1 vs lou5 sai3', e: 'Western suit (slang) vs boss' },
      { c: '好怪 vs 好乖', j: 'hou2 gwaai3 vs hou2 gwaai1', e: 'Very odd vs very well-behaved' },
      { c: '籃球 vs 欖球', j: 'laam4 kau4 vs laam2 kau4', e: 'Basketball vs rugby' },
      { c: '靚仔 vs 𡃁仔', j: 'leng3 zai2 vs leng1 zai2', e: 'Handsome man vs young boy' },
    ]),
  },
];

export const ALL_PHRASES = CATEGORIES.flatMap((c) => c.phrases);
