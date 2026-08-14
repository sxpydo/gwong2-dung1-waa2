import type { GrammarContent } from '../types';

export const GRAMMAR: GrammarContent = {
  structures: [
    {
      pattern: 'S + V + O',
      c: '我鍾意靚女',
      j: 'ngo5 zung1-ji3 leng3-neoi2',
      e: 'I like pretty girls',
      breakdown: '我 (I) + 鍾意 (like) + 靚女 (pretty girl)',
    },
    {
      pattern: 'S + Verb-to-be 係 + Noun',
      c: '我係美國人',
      j: 'ngo5 hai6 mei5-gwok3-jan4',
      e: 'I am American',
      breakdown: '我 (I) + 係 (am) + 美國人 (American)',
    },
    {
      pattern: 'S + 好 (Adv of degree) + Adj',
      c: '我好肚餓',
      j: 'ngo5 hou2 tou5-ngo6',
      e: 'I am very hungry',
      breakdown: '我 (I) + 好 (very) + 肚餓 (hungry) — no 係 needed before an adjective, unless emphasising',
    },
  ],
  tenseTable: [
    { label: 'Present', marker: '(no marker)', c: '我(今日)睇電視', j: 'ngo5 (gam1-jat6) tai2-din6-si6', e: 'I watch TV (today)' },
    { label: 'Present Continuous', marker: '緊【gan2】', c: '我而家睇緊電視', j: 'ngo5 ji4-gaa1 tai2-gan2-din6-si6', e: 'I am watching TV (now)' },
    { label: 'Past', marker: '咗【zo2】', c: '我尋日睇咗電視', j: 'ngo5 cam4-jat6 tai2-zo2-din6-si6', e: 'I watched TV (yesterday)' },
    { label: 'Future', marker: '會【wui5】', c: '我聽日（會）睇電視', j: 'ngo5 ting1-jat6 (wui5) tai2-din6-si6', e: 'I will watch TV (tomorrow)' },
  ],
  markers: [
    { badge: '緊', jyut: 'gan2', title: '~ing — ongoing action', desc: 'Goes right after the verb. e.g. 食緊飯 (sik6-gan2-faan6) = eating' },
    { badge: '咗', jyut: 'zo2', title: '~ed — completed action', desc: 'Goes right after the verb. e.g. 食咗飯 (sik6-zo2-faan6) = ate' },
    {
      badge: '會',
      jyut: 'wui5',
      title: 'will — future intention',
      desc: 'Goes before the verb. e.g. 會食飯 (wui5 sik6-faan6) = will eat. Can be dropped when just stating a fact.',
    },
    { badge: '過', jyut: 'gwo3', title: 'have ever… — past experience', desc: 'Goes right after the verb. e.g. 食過 (sik6-gwo3) = have eaten (at some point before)' },
  ],
  experience: [
    {
      pattern: '你有冇 + Verb + 過 + …？',
      c: '你有冇去過美國呀？',
      j: 'nei5 jau5-mou5 heoi3-gwo3 mei5-gwok3 aa3',
      e: 'Have you ever been to the USA?',
      breakdown: '',
    },
    {
      pattern: '我有 + Verb + 過 + …',
      c: '我有去過美國',
      j: 'ngo5 jau5 heoi3-gwo3 mei5-gwok3',
      e: "I've been to the USA (as an experience)",
      breakdown: '',
    },
    {
      pattern: '我 + Verb + 咗 + … (compare)',
      c: '我去咗美國',
      j: 'ngo5 heoi3-zo2 mei5-gwok3',
      e: 'I went to the USA (a completed trip, not framed as experience)',
      breakdown: '',
    },
  ],
  timeGrid: [
    { past: '尋日', pastJ: 'cam4-jat6', pastE: 'yesterday', present: '今日', presentJ: 'gam1-jat6', presentE: 'today', future: '聽日', futureJ: 'ting1-jat6', futureE: 'tomorrow' },
    { past: '尋晚', pastJ: 'cam4-maan5', pastE: 'last night', present: '今晚', presentJ: 'gam1-maan5', presentE: 'tonight', future: '聽晚', futureJ: 'ting1-maan5', futureE: 'tomorrow night' },
    {
      past: '上個星期', pastJ: 'soeng6-go3 sing1-kei4', pastE: 'last week',
      present: '今個星期', presentJ: 'gam1-go3 sing1-kei4', presentE: 'this week',
      future: '下個星期', futureJ: 'haa6-go3 sing1-kei4', futureE: 'next week',
    },
    {
      past: '上個月', pastJ: 'soeng6-go3 jyut6', pastE: 'last month',
      present: '今個月', presentJ: 'gam1-go3 jyut6', presentE: 'this month',
      future: '下個月', futureJ: 'haa6-go3 jyut6', futureE: 'next month',
    },
    { past: '舊年', pastJ: 'gau6-nin2', pastE: 'last year', present: '今年', presentJ: 'gam1-nin2', presentE: 'this year', future: '出年', futureJ: 'ceot1-nin2', futureE: 'next year' },
  ],
  phrases: [
    { id: 'gram-0', c: '我而家睇緊電視', j: 'ngo5 ji4-gaa1 tai2-gan2-din6-si6', e: 'I am watching TV (now)' },
    { id: 'gram-1', c: '我尋日睇咗電視', j: 'ngo5 cam4-jat6 tai2-zo2-din6-si6', e: 'I watched TV (yesterday)' },
    { id: 'gram-2', c: '我聽日會睇電視', j: 'ngo5 ting1-jat6 wui5 tai2-din6-si6', e: 'I will watch TV (tomorrow)' },
    { id: 'gram-3', c: '你有冇去過美國呀？', j: 'nei5 jau5-mou5 heoi3-gwo3 mei5-gwok3 aa3', e: 'Have you ever been to the USA?' },
    { id: 'gram-4', c: '我有去過美國', j: 'ngo5 jau5 heoi3-gwo3 mei5-gwok3', e: "I've been to the USA" },
  ],
};
