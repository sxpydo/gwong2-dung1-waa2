import type { Pattern } from '../types';

export const PATTERNS: Pattern[] = [
  {
    tag: 'S + V + O — liking something',
    template_c: '我鍾意___',
    template_j: 'ngo5 zung1-ji3 ___',
    template_e: 'I like ___',
    options: [
      { c: '香港', j: 'hoeng1-gong2', e: 'Hong Kong' },
      { c: '廣東話', j: 'gwong2-dung1-waa2', e: 'Cantonese' },
      { c: '飲茶', j: 'jam2-caa4', e: 'yum cha' },
      { c: '行山', j: 'haang4-saan1', e: 'hiking' },
    ],
  },
  {
    tag: '我想 — I want to (verb)',
    template_c: '我想___',
    template_j: 'ngo5 soeng2 ___',
    template_e: 'I want to ___',
    options: [
      { c: '食飯', j: 'sik6-faan6', e: 'eat' },
      { c: '瞓覺', j: 'fan3-gaau3', e: 'sleep' },
      { c: '影相', j: 'jing2-soeng2', e: 'take photos' },
      { c: '去香港', j: 'heoi3 hoeng1-gong2', e: 'go to Hong Kong' },
    ],
  },
  {
    tag: '我想要 — I want to have (noun)',
    template_c: '我想要___',
    template_j: 'ngo5 soeng2 jiu3 ___',
    template_e: 'I want to have ___',
    options: [
      { c: '一杯奶茶', j: 'jat1-bui1 naai5-caa4', e: 'a milk tea' },
      { c: '一個蛋撻', j: 'jat1-go3 daan6-taat3', e: 'an egg tart' },
      { c: '一張飛', j: 'jat1-zoeng1 fei1', e: 'a ticket' },
    ],
  },
  {
    tag: '我要 — I need / have to',
    template_c: '我要___',
    template_j: 'ngo5 jiu3 ___',
    template_e: 'I need ___',
    options: [
      { c: '食飯', j: 'sik6-faan6', e: 'to eat' },
      { c: '幫忙', j: 'bong1-mong4', e: 'help' },
      { c: '返工', j: 'faan1-gung1', e: 'to work' },
    ],
  },
  {
    tag: '咗【zo2】 — Past tense',
    template_c: '我尋日___咗',
    template_j: 'ngo5 cam4-jat6 ___ zo2',
    template_e: 'I ___ yesterday',
    options: [
      { c: '食', j: 'sik6', e: 'ate' },
      { c: '去', j: 'heoi3', e: 'went' },
      { c: '睇', j: 'tai2', e: 'watched' },
    ],
  },
  {
    tag: '緊【gan2】 — Present continuous',
    template_c: '我而家___緊',
    template_j: 'ngo5 ji4-gaa1 ___ gan2',
    template_e: 'I am ___ing now',
    options: [
      { c: '食', j: 'sik6', e: 'eating' },
      { c: '睇', j: 'tai2', e: 'watching' },
      { c: '玩', j: 'waan2', e: 'playing' },
    ],
  },
  {
    tag: '會【wui5】 — Future tense',
    template_c: '我聽日會___',
    template_j: 'ngo5 ting1-jat6 wui5 ___',
    template_e: 'I will ___ tomorrow',
    options: [
      { c: '去香港', j: 'heoi3 hoeng1-gong2', e: 'go to Hong Kong' },
      { c: '返工', j: 'faan1-gung1', e: 'work' },
      { c: '同朋友食飯', j: 'tung4 pang4-jau5 sik6-faan6', e: 'eat with friends' },
    ],
  },
  {
    tag: 'A-not-A — Yes/No questions',
    template_c: '___唔___呀？',
    template_j: '___ m4 ___ aa3?',
    template_e: 'Is it ___ or not?',
    options: [
      { c: '好', j: 'hou2', e: 'good' },
      { c: '忙', j: 'mong4', e: 'busy' },
      { c: '靚', j: 'leng3', e: 'beautiful' },
      { c: '攰', j: 'gui6', e: 'tired' },
    ],
  },
  {
    tag: '過【gwo3】 — Comparatives',
    template_c: '我___過你',
    template_j: 'ngo5 ___ gwo3 nei5',
    template_e: 'I am more ___ than you',
    options: [
      { c: '高', j: 'gou1', e: 'tall' },
      { c: '忙', j: 'mong4', e: 'busy' },
      { c: '開心', j: 'hoi1-sam1', e: 'happy' },
    ],
  },
  {
    tag: '邊度 — Where questions',
    template_c: '___喺邊度？',
    template_j: '___ hai2 bin1-dou6?',
    template_e: 'Where is ___?',
    options: [
      { c: '洗手間', j: 'sai2-sau2-gaan1', e: 'the restroom' },
      { c: '地鐵站', j: 'dei6-tit3-zaam6', e: 'the MTR station' },
      { c: '你', j: 'nei5', e: 'you' },
    ],
  },
];
