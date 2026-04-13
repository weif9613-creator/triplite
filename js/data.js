// ============================================
// TripLite 核心数据文件 v2
// 新行程顺序：
//   D1 4/26 澳门（1晚）
//   D2 4/27 曼谷落地→直奔芭提雅（1晚）
//   D3 4/28 芭提雅 Koh Larn 核心日（1晚）
//   D4 4/29 芭提雅上午→下午转场曼谷（入住曼谷，1晚）
//   D5 4/30 曼谷老城核心日（1晚）
//   D6 5/1  曼谷城市轻松日（1晚）
//   D7 5/2  曼谷收尾，中午退房，22:00去机场
//   D8 5/3  02:50 飞回上海
// ============================================

const TRIP_DATA = {
  meta: {
    title: '澳门 · 芭提雅 · 曼谷',
    startDate: '2026-04-26',
    endDate: '2026-05-03',
    totalDays: 8,
    cities: ['澳门', '芭提雅', '曼谷', '返程']
  },

  days: [
    // ─────────────────────────────────────────
    // D1 · 4/26 · 澳门
    // ─────────────────────────────────────────
    {
      id: 1,
      date: '2026-04-26',
      shortDate: '4/26',
      city: '澳门',
      cityEn: 'Macau',
      cityCode: 'macau',
      emoji: '🎰',
      title: '澳门轻落地 · 老城快闪',
      summary: '11:45抵达澳门，全天只做一条线：下午走老城，晚上回氹仔/路氹吃饭休息。明天一早要飞曼谷，今天不贪多。',
      energyLevel: 1,
      highlights: ['大三巴牌坊', '玫瑰堂', '议事亭前地', '官也街手信'],
      tags: ['轻松日', '快闪', '老城'],
      times: [
        {
          period: 'am',
          label: '上午',
          range: '11:45–13:30',
          activities: [
            {
              name: '✈️ 抵达澳门国际机场',
              desc: '出关后走北出口，停车场区域找免费酒店穿梭巴士（11:00–21:00，每15–20分钟一班）。错过班次直接打的，氹仔/路氹约10分钟、50–70澳门元。',
              type: 'must',
              meta: ['机场→酒店约10分钟']
            },
            {
              name: '🏨 入住氹仔/路氹酒店',
              desc: '放下行李或寄存。路氹城一带餐厅密集，正餐和便利店步行5分钟内均可找到。',
              type: 'must',
              meta: ['住宿：氹仔/路氹']
            }
          ]
        },
        {
          period: 'pm',
          label: '下午',
          range: '14:00–18:30',
          activities: [
            {
              name: '🚌 前往澳门半岛老城区',
              desc: '从路氹城乘坐酒店免费穿梭巴士（各大赌场酒店均有发往外港/港澳码头方向班车），或在路氹城外打的约25–35元至议事亭前地。单程约20分钟。',
              type: 'must',
              meta: ['路氹城→老城约20分钟', '的士约25–35澳门元']
            },
            {
              name: '🏛️ 大三巴牌坊',
              desc: '澳门最标志性景点，1602年建造的圣保禄大教堂前壁遗址。免费参观，可登台阶拍照。旁边有大炮台（免费），视野开阔可俯瞰老城。建议游览约45分钟。',
              type: 'must',
              meta: ['免费', '开放全天', '步行圈内']
            },
            {
              name: '⛪ 玫瑰堂 & 议事亭前地',
              desc: '从大三巴步行约5分钟到玫瑰堂（圣多明我教堂，黄色巴洛克建筑，免费参观）。再步行2分钟到议事亭前地——葡式碎石广场，两侧均是商铺餐厅，买蛋卷、杏仁饼、猪扒包的首选地。',
              type: 'must',
              meta: ['大三巴→玫瑰堂步行5分钟', '免费', '周边手信店密集']
            },
            {
              name: '🛍️ 官也街（可选加）',
              desc: '氹仔的美食手信街，与大三巴老城不同方向，如果下午体力允许可单独安排。但今天时间有限，两处选一：老城优先。官也街更适合在买手信时顺路，路氹城酒店步行15分钟可达。',
              type: 'optional',
              meta: ['路氹城→官也街步行约15分钟', '手信购物']
            }
          ]
        },
        {
          period: 'night',
          label: '晚上',
          range: '19:00–21:30',
          activities: [
            {
              name: '🍽️ 晚餐：返回氹仔/路氹吃',
              desc: '不要在老城找晚饭拖时间。打的回路氹城（约20–25分钟），以下三类随便进一家都不会踩雷：\n① 路氹城美食城（Galaxy银河、威尼斯人商场内均有美食广场，步行5分钟内）\n② 路氹城大街小馆：猪扒包/猪骨粥/葡式鸡 40–80元/位\n③ 酒店自助晚餐（120–200元/位，省时省脑）',
              type: 'suggest',
              meta: ['老城→路氹城约20分钟', '人均40–200澳门元']
            },
            {
              name: '🌙 早点休息',
              desc: '明天要赶早班飞机去曼谷，22:30前必须休息。不要再去威尼斯人/伦敦人夜游——那是下午贪多的坑。',
              type: 'must',
              meta: ['22:30前休息']
            }
          ]
        }
      ],
      warnings: [
        {
          type: 'warning',
          title: '老城和路氹是两个方向',
          text: '大三巴在澳门半岛（老城），氹仔/路氹在另一边。两处来回约20分钟，不要把老城+威尼斯人+伦敦人+巴黎人都塞进今天，会搞垮明天飞曼谷的状态。'
        },
        {
          type: 'info',
          title: '澳门机场穿梭巴士',
          text: '机场北出口外停车场找免费酒店接驳车，参考班次11:00–21:00，每15–20分钟一班。各大路氹城酒店均有班次，以现场指示牌为准。'
        },
        {
          type: 'info',
          title: '澳门货币',
          text: '澳门元与港元等值通用，人民币也基本可用但找零可能给澳门元。100–200澳门/港元现金够用，刷银联/Visa均可。'
        }
      ],
      alternatives: []
    },

    // ─────────────────────────────────────────
    // D2 · 4/27 · 曼谷落地 → 直奔芭提雅
    // ─────────────────────────────────────────
    {
      id: 2,
      date: '2026-04-27',
      shortDate: '4/27',
      city: '芭提雅',
      cityEn: 'Pattaya (via Bangkok)',
      cityCode: 'pattaya',
      emoji: '🏖️',
      title: '曼谷落地→直奔芭提雅，接海边第一夜',
      summary: '上午飞曼谷，落地后不在曼谷停留，直接包车/大巴去芭提雅（约2小时）。今晚任务：入住、海边散步、吃海鲜。不冲景点。',
      energyLevel: 1,
      highlights: ['素万那普机场入境', '曼谷→芭提雅', '芭提雅海滩'],
      tags: ['移动日', '入境泰国', '海边'],
      times: [
        {
          period: 'am',
          label: '上午/飞行',
          range: '机场出发–12:00',
          activities: [
            {
              name: '✈️ 澳门飞曼谷',
              desc: '登机前确认：TDAC二维码已截图保存、护照和机票在随身包里、充电宝已充满。',
              type: 'must',
              meta: ['提前到机场，预留足够时间']
            },
            {
              name: '🛂 素万那普机场入境',
              desc: '落地后跟着 Arrivals 标识走，到移民局（Immigration）排队。出示护照 + TDAC二维码（邮件截图即可）。\n过关后取行李 → 海关 → 出口。\n全程可能需要30–60分钟，节假日更长，保持耐心。',
              type: 'must',
              meta: ['带好护照+TDAC二维码', '全程跟着Arrivals标识走']
            }
          ]
        },
        {
          period: 'pm',
          label: '下午',
          range: '12:00–17:00',
          activities: [
            {
              name: '🚗 机场→芭提雅（直达，不在曼谷停）',
              desc: '出机场后直接找去芭提雅的交通，不要绕进曼谷市区：\n\n【选项A · 推荐】出租车/包车：出机场大厅后找 "Official Taxi" 排队点，告知司机去芭提雅，约900–1200泰铢，约1.5–2小时。注意要打表或提前议价。\n\n【选项B】Bell Travel大巴：素万那普机场1楼8号门外有Bell Travel专线，直达芭提雅市区，约130–200泰铢，约2小时，可在官网提前购票。\n\n⚠️ 不要轻信机场内主动来搭话的"拉客司机"，价格翻倍且不安全。',
              type: 'must',
              meta: ['机场→芭提雅约1.5–2小时', '包车900–1200฿ / 大巴130–200฿']
            },
            {
              name: '🏨 入住芭提雅酒店',
              desc: '住 Central Pattaya 或 North Pattaya 靠海一侧，步行到海滩10分钟内最佳。入住后先冲澡换衣，再出门。',
              type: 'must',
              meta: ['住宿：Central/North Pattaya', '步行10分钟内到海滩']
            }
          ]
        },
        {
          period: 'night',
          label: '傍晚/晚上',
          range: '17:00–21:00',
          activities: [
            {
              name: '🌅 芭提雅海滩散步',
              desc: '沿 Pattaya Beach Road（芭提雅海滩路）南北走一段，感受海边氛围。傍晚约18:00有夕阳，可以在海边坐坐。不必赶去任何景点，今晚目标只是"感受海边"。\n\n【从酒店步行】Central/North Pattaya酒店步行5–10分钟即到海滩路。',
              type: 'suggest',
              meta: ['酒店步行5–10分钟', '免费', '傍晚18:00夕阳最佳']
            },
            {
              name: '🦞 海鲜晚餐',
              desc: '推荐在海滩路或附近街道找海鲜餐厅：\n\n① Mum Aroi（妈阿来）：芭提雅北部海边，海景海鲜，人均200–400泰铢，从North Pattaya酒店Grab约10分钟。\n② Nang Nual餐厅（Beach Road南段）：芭提雅老牌海鲜，步行可达，人均150–300泰铢。\n③ 海滩路随选：沿Beach Road步行即可看到大量海鲜餐厅，菜单看价格和新鲜度随选即可。\n\n💡 点餐小技巧：看到新鲜冰桶里的海鲜直接指，避免点不知价格的特色套餐。',
              type: 'suggest',
              meta: ['海滩路步行可达', '人均150–400泰铢', '建议按重量点']
            }
          ]
        }
      ],
      warnings: [
        {
          type: 'danger',
          title: '⚠️ TDAC必须提前填好',
          text: '所有进入泰国的非泰国籍旅客都需提前在线填写TDAC，建议4/24–4/26完成。官网：tdac.immigration.go.th。所有字段必须用英文填写，姓名/国籍/出生日期不可修改。'
        },
        {
          type: 'warning',
          title: '机场打车防坑',
          text: '不要跟着在机场大厅里主动来招揽的"司机"走。要去1楼 Official Taxi 排队点，或去Bell Travel大巴柜台。前者安全透明，后者便宜稳定。'
        },
        {
          type: 'info',
          title: '今晚不冲景点',
          text: '连续两天移动（上海→澳门→曼谷→芭提雅），今晚唯一任务是：落地 + 感受海边。不安排真理寺/Koh Larn/Walking Street，明天一整天都是格兰岛。'
        }
      ],
      alternatives: []
    },

    // ─────────────────────────────────────────
    // D3 · 4/28 · 芭提雅核心日 Koh Larn
    // ─────────────────────────────────────────
    {
      id: 3,
      date: '2026-04-28',
      shortDate: '4/28',
      city: '芭提雅',
      cityEn: 'Pattaya',
      cityCode: 'pattaya',
      emoji: '🏝️',
      title: '芭提雅核心日 · Koh Larn 格兰岛出海',
      summary: '今天只做一件事：去格兰岛。早出发，上午玩海滩，下午乘船回来休息，晚上吃海鲜或逛Walking Street。',
      energyLevel: 2,
      highlights: ['格兰岛Koh Larn', 'Tawaen Beach', 'Bali Hai Pier', '海鲜晚餐'],
      tags: ['出海', '必去', '海岛', '游泳'],
      times: [
        {
          period: 'am',
          label: '上午',
          range: '07:30–12:00',
          activities: [
            {
              name: '🚤 出发去 Bali Hai 码头',
              desc: '从中/北芭提雅酒店出发去南芭提雅的 Laem Bali Hai 码头：\n\n【打双条车 Songthaew】：在 Beach Road 路边招手，告知"Bali Hai"，约20–30泰铢/人，20分钟。\n【打Grab】：中北区酒店到码头约50–80泰铢，10分钟。\n\n⏰ 建议07:30–08:00出发，早到码头等船，避开9点后的人群。',
              type: 'must',
              meta: ['酒店→码头约10–20分钟', '双条车20–30฿ / Grab 50–80฿']
            },
            {
              name: '⛴️ 乘渡船前往格兰岛',
              desc: '在 Bali Hai 码头购票：\n\n【公共渡船】30–50泰铢/人，约35–45分钟，码头一侧有售票亭，船次约07:00起每小时左右一班。\n【快艇包船】200–400泰铢/人，约15–20分钟，人少时可拼团，人多时包更合算。\n\n💡 建议第一次去坐公共渡船体验完整海岛感觉，不必急着包快艇。',
              type: 'must',
              meta: ['公共渡船30–50฿/人, 约40分钟', '快艇200–400฿/人, 约15分钟']
            },
            {
              name: '🏖️ 格兰岛 Tawaen Beach 玩海',
              desc: '下船后到"他湾海滩（Tawaen Beach）"：\n\n这是格兰岛最热闹、设施最全的海滩，可以：\n• 游泳：海水清澈，比芭提雅本岛干净很多，水深由浅入深\n• 浮潜：租浮潜装备约50–100泰铢/套\n• 躺椅租用：100–200泰铢/两把+遮阳伞\n• 香蕉船/摩托艇：可选，摩托艇约300泰铢\n\n如果想安静一点，从Tawaen骑租来的摩托车约5分钟到 Samae Beach（更安静）。',
              type: 'must',
              meta: ['下船步行5分钟到海滩', '躺椅100–200฿', '浮潜设备50–100฿']
            }
          ]
        },
        {
          period: 'pm',
          label: '下午',
          range: '12:00–17:00',
          activities: [
            {
              name: '🦀 岛上午餐',
              desc: '格兰岛有不少海鲜餐厅，位于Tawaen Beach沿岸：\n\n• 烤鱼/炒海鲜：人均100–200泰铢\n• 椰子水/新鲜水果：40–60泰铢\n\n💡 岛上价格比本岛贵约20–30%，但吃完可以继续玩，不用回岛了。',
              type: 'suggest',
              meta: ['岛上餐厅步行可达', '人均100–200฿']
            },
            {
              name: '⛴️ 13:30–14:30 乘船返回本岛',
              desc: '最末班公共渡船约18:00，但下午早点回来避免晒太久，也给傍晚留时间。\n\n⚠️ 注意：不要赶最末班船，万一误点滞留岛上只能包快艇回，费用大幅增加。\n\n回到码头后Grab/双条车返回酒店，回去冲凉休息。',
              type: 'must',
              meta: ['末班渡船约18:00', '建议13:30–14:30返回', '回酒店休息']
            },
            {
              name: '🏨 回酒店休息',
              desc: '出海暴晒后必须好好休息，冲凉、补水、躺一躺。傍晚17:30之后再出门吃饭。',
              type: 'suggest',
              meta: ['必须休息，为晚上留体力']
            }
          ]
        },
        {
          period: 'night',
          label: '晚上',
          range: '17:30–21:30',
          activities: [
            {
              name: '🦞 芭提雅本岛海鲜晚餐',
              desc: '本岛海鲜比格兰岛更便宜、选择更多：\n\n① Pattaya Pier（芭提雅码头周边）：海边有排海鲜大排档，步行或Grab 5分钟，人均150–350泰铢。\n② Bali Hai路沿线：码头附近大量餐厅，吃完顺便走去Walking Street。\n③ 酒店附近 Beach Road 餐厅：步行可达，大多数菜单有英文+图片，指点即可。',
              type: 'suggest',
              meta: ['Beach Road步行或Grab 5分钟', '人均150–350泰铢']
            },
            {
              name: '🌃 Walking Street（可选）',
              desc: '从 Bali Hai 码头/Beach Road 南端步行约10分钟可到。\n\n芭提雅步行街是东南亚著名夜生活区，20:00后最热闹，酒吧/live music/霓虹灯。体力允许的话逛一圈体验下，不感兴趣直接回酒店也完全OK。\n\n⚠️ 如果只是想看热闹，在街口走一段就够，不必全程深入。',
              type: 'optional',
              meta: ['南芭提雅步行街', '20:00后最热闹', '体力允许再去']
            }
          ]
        }
      ],
      warnings: [
        {
          type: 'danger',
          title: '天气不好时的备选',
          text: '如果当天风浪大/下雨，渡船可能停运。备选方案：\n① 真理寺（Sanctuary of Truth）：全木雕建筑，门票500泰铢，上午凉快时参观，Grab约10分钟。\n② Central Festival商场：North Pattaya，购物+吹冷气，Grab约10分钟。\n③ 按摩半天：芭提雅按摩店密集，200–400泰铢/小时。'
        },
        {
          type: 'warning',
          title: '出海防晒',
          text: '海岛全天暴晒，防晒霜SPF50+出发前涂好并带上补涂。遮阳帽/墨镜必须带。下水前30分钟涂，每2小时补涂。'
        },
        {
          type: 'info',
          title: 'Koh Larn就是这趟芭提雅最值的点',
          text: '泰旅局把Ko Lan列为芭提雅经典近岛，从Laem Bali Hai Pier每日有渡船。海水比芭提雅本岛干净很多，一天足够。不要用真理寺替代它，除非天气不允许。'
        }
      ],
      alternatives: [
        { name: '真理寺（Sanctuary of Truth）', desc: '天气差时替代方案，全木雕建筑，Grab约10分钟，门票500泰铢，参观1.5小时' }
      ]
    },

    // ─────────────────────────────────────────
    // D4 · 4/29 · 芭提雅上午 → 下午转场曼谷
    // ─────────────────────────────────────────
    {
      id: 4,
      date: '2026-04-29',
      shortDate: '4/29',
      city: '曼谷',
      cityEn: 'Bangkok (from Pattaya)',
      cityCode: 'bangkok',
      emoji: '🏙️',
      title: '芭提雅收尾 → 下午转场曼谷',
      summary: '上午在芭提雅做最后活动（真理寺或海边），中午退房，下午包车/大巴转曼谷住进Asok，晚上适应曼谷节奏。',
      energyLevel: 2,
      highlights: ['真理寺（可选）', '曼谷Asok/Sukhumvit', '初探Sukhumvit夜生活'],
      tags: ['转场日', '半天芭提雅', '入住曼谷'],
      times: [
        {
          period: 'am',
          label: '上午',
          range: '08:00–11:30',
          activities: [
            {
              name: '🏯 真理寺参观（推荐上午做）',
              desc: '真理寺（Sanctuary of Truth）是一座全木结构的宗教建筑，高105米，建于1981年至今仍在建造中，以精美木雕闻名。\n\n• 地址：206/2 Moo 5, Naklua, Pattaya（北芭提雅，Grab约5–8分钟）\n• 门票：500泰铢/人\n• 开放：08:00–18:00\n• 参观时长：约1–1.5小时\n• 注意：进入需穿长裤/遮肩（门口可租借纱裙）\n\n💡 放在今天上午最合理：昨天格兰岛出海，今天上午加真理寺，两项内容都完成，下午转场不空。',
              type: 'suggest',
              meta: ['北芭提雅', 'Grab约5–8分钟', '门票500฿', '开放08:00–18:00']
            },
            {
              name: '🏖️ 海边早晨散步（真理寺替代）',
              desc: '如果昨天体力消耗太大不想再去景点，今天上午可以直接在海边走走，喝杯椰子，拍拍照，告别芭提雅。Beach Road步行即可。',
              type: 'optional',
              meta: ['酒店步行5–10分钟', '免费']
            },
            {
              name: '🏨 11:00 退房',
              desc: '整理行李，办理退房（check-out通常12:00前）。多余东西可以寄存到大堂，午饭后再取。',
              type: 'must',
              meta: ['退房前整理好行李']
            }
          ]
        },
        {
          period: 'pm',
          label: '下午',
          range: '12:00–18:00',
          activities: [
            {
              name: '🍜 芭提雅最后一顿午餐',
              desc: '退房后在附近解决午餐：\n• Pattaya Tai（南芭提雅）一带有大量泰式小馆，人均60–120泰铢\n• Beach Road沿线咖啡馆/西餐也多，出发前慢悠悠吃完\n\n💡 不要急着赶路，吃完再出发，长途更舒适。',
              type: 'suggest',
              meta: ['酒店附近步行可达', '人均60–120฿']
            },
            {
              name: '🚗 芭提雅→曼谷（Asok/Sukhumvit）',
              desc: '选择：\n\n【包车/出租车】：约900–1200泰铢，直达曼谷酒店，约1.5–2小时，最舒适无缝。\n\n【大巴】：从芭提雅北站（North Pattaya Bus Station，Grab约5分钟）乘曼谷大巴，发车约每小时一班，票价80–130泰铢，到曼谷东部汽车站（Ekkamai/Mo Chit），然后在曼谷再搭BTS/Grab到Asok，全程约2.5–3小时。\n\n👉 推荐：时间宽裕直接包车，省心；预算优先选大巴+BTS。',
              type: 'must',
              meta: ['包车约1.5–2小时，900–1200฿', '大巴+BTS约2.5–3小时，80–130฿']
            },
            {
              name: '🏨 入住曼谷 Asok/Sukhumvit 酒店',
              desc: '住 Asok/Sukhumvit 区，步行到 BTS Asok 或 MRT Sukhumvit 8分钟内最佳。\n\n入住后放好行李，先休息或冲澡，适应一下曼谷节奏。这区步行圈内：便利店（7-Eleven密度极高）、餐厅、按摩店应有尽有。',
              type: 'must',
              meta: ['住宿：Asok/Sukhumvit', 'BTS/MRT步行8分钟内']
            }
          ]
        },
        {
          period: 'night',
          label: '晚上',
          range: '18:30–22:00',
          activities: [
            {
              name: '🏮 唐人街 Yaowarat 吃海鲜（推荐）',
              desc: '曼谷唐人街（耀华力路 Yaowarat Road）是曼谷最有烟火气的夜宵区，距Asok约4公里，Grab约20–30分钟、50–80泰铢。\n\n必吃：\n• 燕窝甜品：30–80泰铢，沿街有许多老字号\n• 清蒸生蚝/新鲜海鲜：看冰桶鲜度下单\n• 炸臭豆腐/烤生蚝：路边摊\n• 粉肠炒河粉（Pad See Ew）：50–80泰铢\n\n晚上18:30–22:00是最热闹的时候，人挤人但很有氛围。',
              type: 'suggest',
              meta: ['Asok→唐人街Grab约20–30分钟', '人均80–200฿', '18:30后最热闹']
            },
            {
              name: '🍜 Asok周边随便吃（轻松版）',
              desc: '如果今天移动已经很累，就在Asok周边解决：\n• Terminal 21商场B1美食广场：人均50–100泰铢，各类泰式/日式/中式\n• Sukhumvit Soi 11街边：有大量不贵的泰餐+酒吧餐厅，步行即可\n• 7-Eleven：买个饭团+泡面，也是真实的曼谷体验',
              type: 'optional',
              meta: ['酒店步行5分钟', '人均50–150฿']
            }
          ]
        }
      ],
      warnings: [
        {
          type: 'info',
          title: '今天是转场日',
          text: '今天的核心任务是把人安全从芭提雅转到曼谷Asok。真理寺是锦上添花，不是必须。如果起床后感觉疲惫，跳过直接转场完全合理。'
        },
        {
          type: 'info',
          title: '曼谷Asok区周边饮食非常方便',
          text: '住进Asok/Sukhumvit后，步行500米内至少有：3家7-Eleven、Terminal 21商场美食广场、多家街边泰餐、按摩店5家以上。不用担心吃饭问题。'
        }
      ],
      alternatives: [
        { name: '真理寺改为轻松海边告别', desc: '体力不够时放弃真理寺，海边走走拍拍照告别芭提雅' }
      ]
    },

    // ─────────────────────────────────────────
    // D5 · 4/30 · 曼谷老城核心日
    // ─────────────────────────────────────────
    {
      id: 5,
      date: '2026-04-30',
      shortDate: '4/30',
      city: '曼谷',
      cityEn: 'Bangkok',
      cityCode: 'bangkok',
      emoji: '🏛️',
      title: '曼谷老城核心日 · 大皇宫线',
      summary: '今天只打一条主线：大皇宫→卧佛寺→郑王庙。务必早出发，上午集中游览，中午主动降温，晚上按摩收尾。',
      energyLevel: 3,
      highlights: ['大皇宫+翡翠佛寺', '卧佛寺', '郑王庙', '湄南河'],
      tags: ['高强度', '必去', '着装要求', '老城'],
      times: [
        {
          period: 'am',
          label: '上午',
          range: '07:30–12:00',
          activities: [
            {
              name: '🌅 07:30 从Asok出发',
              desc: '路线：从酒店步行到 BTS Asok 站 → 搭 BTS Silom Line 到 Saphan Taksin（约20分钟）→ 步行到 Sathorn Pier（河边码头）→ 搭橙旗快船到 Tha Chang 码头（N9），约15–20分钟，约15泰铢。下船即大皇宫正门方向。\n\n也可直接Grab到大皇宫，约80–120泰铢，约40分钟（早上不堵）。',
              type: 'must',
              meta: ['Asok出发→大皇宫约50–60分钟', 'BTS+快船约40泰铢', 'Grab约80–120฿']
            },
            {
              name: '👑 大皇宫 + 翡翠佛寺（Wat Phra Kaew）',
              desc: '曼谷最重要的景点，两者同在一个围墙内。\n\n【基本信息】\n• 地址：Na Phra Lan Rd, Phra Nakhon\n• 开放：08:30–15:30 售票（售票截止15:30！）\n• 门票：500泰铢/人（含Wat Phra Kaew和纺织博物馆）\n• 参观时长：建议2–3小时\n\n【看什么】\n• 翡翠佛寺：供奉泰国最神圣的翡翠玉佛，佛像随季节更换袍服，皇室专属仪式感极强\n• 却克里宫殿群：四座宫殿建筑，融合泰式+欧式风格，金碧辉煌\n• 围墙壁画：描绘《拉马坚那》史诗，全程178幅，可边走边看\n• 双鱼水池/庭院：拍照好背景\n\n💡 建议买票后先右转进翡翠佛寺，再逆时针参观宫殿区，最顺路。',
              type: 'must',
              meta: ['门票500฿', '开放08:30–售票15:30', '参观建议2–3小时', '着装严格']
            },
            {
              name: '🛕 卧佛寺（Wat Pho）',
              desc: '从大皇宫南门步行约5分钟即到，同一条街上，千万别错过。\n\n【基本信息】\n• 门票：200泰铢/人（含一瓶水）\n• 开放：08:00–18:30\n• 参观时长：约1小时\n\n【看什么】\n• 卧佛（Reclining Buddha）：全长46米、高15米，通体贴金，鞋底有108幅珍珠母贝镶嵌图案\n• 殿后有108个钵：投硬币（每个一枚，寺庙内换铜板），传说带来好运\n• 泰式按摩发源地：寺内有正宗泰式按摩室（460泰铢/30分钟），品质有保障，可顺手做一次\n\n💡 卧佛殿内凉快，是中午避暑的好地方。',
              type: 'must',
              meta: ['大皇宫步行5分钟', '门票200฿', '开放08:00–18:30', '按摩460฿/30分钟']
            }
          ]
        },
        {
          period: 'pm',
          label: '下午',
          range: '12:00–17:00',
          activities: [
            {
              name: '🌊 郑王庙（Wat Arun）',
              desc: '从卧佛寺步行约10分钟到 Tha Tien 码头，搭小渡船过湄南河（5泰铢），即达郑王庙。\n\n【基本信息】\n• 门票：100泰铢/人\n• 开放：08:00–18:00\n• 参观时长：约45分钟–1小时\n\n【看什么】\n• 主塔高79米，外壁用碎瓷片镶嵌而成，近看细节精美，远看层叠壮观\n• 可登高（一段比较陡的台阶），俯瞰湄南河两岸\n• 傍晚照夕阳：从对岸Tha Tien码头拍郑王庙逆光，是曼谷最经典的旅行照\n\n⚠️ 中午12:00–14:00暴晒最厉害，如果体力不够此段直接放弃，下午去商场降温也很合理。',
              type: 'optional',
              meta: ['Tha Tien码头渡船5฿', '门票100฿', '开放08:00–18:00']
            },
            {
              name: '❄️ 进商场/咖啡馆降温',
              desc: '中午12:00–14:00是曼谷最热时段（接近38°C）。不管去没去郑王庙，下午必须主动进室内降温。\n\n选择：\n• 回酒店休息（最推荐，Grab约80–120泰铢）\n• Siam附近Central World商场（BTS到Siam站，有冷气+餐厅+超市）\n• 卧佛寺周边Tha Tien市场咖啡馆（步行可达，便宜有氛围）',
              type: 'must',
              meta: ['12:00–14:00必须进室内', '防止中暑']
            }
          ]
        },
        {
          period: 'night',
          label: '晚上',
          range: '18:00–21:30',
          activities: [
            {
              name: '💆 Asok区泰式按摩',
              desc: '曼谷最值得体验的事情之一，今晚腿肯定很酸。Asok/Sukhumvit一带按摩店密集，推荐：\n\n• Health Land Asoke（健康路Asok店）：连锁老牌，传统泰式按摩350泰铢/1小时，精油按摩500泰铢/1小时，步行BTS Asok站约10分钟，建议提前电话预约。\n• 酒店周边随机小店：200–300泰铢/1小时，看评分随选\n\n按摩完再吃饭，状态会好很多。',
              type: 'suggest',
              meta: ['Asok步行圈内', '传统泰式200–350฿/小时', '建议提前预约连锁店']
            },
            {
              name: '🍜 Asok周边晚餐',
              desc: '今天已经体力消耗不少，晚餐不要再跑远处：\n\n① Terminal 21商场（酒店步行5分钟）：B1楼美食广场，泰国各地小吃，人均50–100泰铢，品种极多。\n② Sukhumvit Soi 38夜市（已被改建，现在改为 Soi 36/38附近的街边摊）：传统口味，烤肉/炒河粉/绿咖喱，人均80–150泰铢。\n③ MK Restaurants/S&P（商场内连锁泰餐）：稳定卫生，人均120–200泰铢。',
              type: 'suggest',
              meta: ['Terminal 21步行5分钟', '人均50–200฿']
            }
          ]
        }
      ],
      warnings: [
        {
          type: 'danger',
          title: '大皇宫着装绝对严格',
          text: '禁止入场：无袖、背心、短上衣、透视装、短裤（包括及膝短裤）、破洞裤、紧身裤、骑行裤、迷你裙、睡裤。必须：有袖上衣 + 长裤或过膝裙。\n\n现场有出借衣物，但人多时要排队且体验差。建议提前准备好一套合规着装（今天单独从行李中取出）。'
        },
        {
          type: 'warning',
          title: '售票截至15:30，务必上午进场',
          text: '大皇宫售票截止时间为15:30。上午08:30开门后越早进越好，避开9:30后的大团队。千万不要赌下午再去。'
        },
        {
          type: 'info',
          title: '大皇宫周边防骗',
          text: '大皇宫门口常有人说"今天宫殿关闭去翻新"或"今天是特别节日"，然后引导你去他们的tuk-tuk。这是经典骗局，直接无视走向正门即可。开放状态以官网royalgrandpalace.th为准。'
        }
      ],
      alternatives: [
        { name: '郑王庙', desc: '体力够时下午加，体力不够直接放弃——大皇宫+卧佛寺才是今天核心' }
      ]
    },

    // ─────────────────────────────────────────
    // D6 · 5/1 · 曼谷城市轻松日
    // ─────────────────────────────────────────
    {
      id: 6,
      date: '2026-05-01',
      shortDate: '5/1',
      city: '曼谷',
      cityEn: 'Bangkok',
      cityCode: 'bangkok',
      emoji: '🛍️',
      title: '曼谷城市轻松日 · 商圈/美食/夜市',
      summary: '今天不再塞硬景点，切换到城市体验模式。上午晚起，下午Siam商圈或按摩，晚上夜市或河边选一。',
      energyLevel: 2,
      highlights: ['Siam商圈', 'Chatuchak/Jodd Fairs夜市', 'Thonglor精品店', '泰式按摩'],
      tags: ['轻松日', '购物', '美食', '夜市'],
      times: [
        {
          period: 'am',
          label: '上午',
          range: '可晚起至10:00',
          activities: [
            {
              name: '☕ 晚起 + 慢早餐',
              desc: '昨天高强度，今天可以睡到9:00–10:00。慢慢吃早午餐：\n\n① 酒店早餐（如果有含早）：直接楼下解决\n② Sukhumvit一带咖啡馆早午餐：如 Roast Coffee（Thonglor/EmQuartier附近），早午餐200–350泰铢，精品咖啡\n③ 7-Eleven：便利店加热食品+泰式奶茶，50泰铢搞定',
              type: 'suggest',
              meta: ['酒店步行圈内', '人均50–350฿']
            },
            {
              name: '🏬 Thonglor/Ekkamai 街区溜达（可选）',
              desc: '从Asok沿BTS两站到 Thonglor（BTS On Nut方向），这一带是曼谷最集中的精品咖啡馆、设计感小店、网红餐厅区。\n\n特点：比Siam商圈更本地化，更适合慢慢逛，节奏轻松。\n\n推荐：Playground by W District（开放式市集）、J Avenue（小型生活类商业街）',
              type: 'optional',
              meta: ['BTS Asok→Thonglor 2站', '约5分钟']
            }
          ]
        },
        {
          period: 'pm',
          label: '下午',
          range: '12:00–18:00',
          activities: [
            {
              name: '🏢 Siam商圈（二选一方向）',
              desc: '曼谷最集中的大型购物商圈，BTS到Siam站即到，从Asok约15分钟：\n\n【Siam Paragon】：高端商场，B1–1楼有大型美食广场（Gourmet Market），适合买零食和高品质伴手礼。\n【CentralWorld】：曼谷最大商场之一，各层均有餐厅，顶楼有户外区。\n【MBK Center（马贲购物中心）】：平价电子数码/本地品牌，预算购物首选，价格可议价，从Siam步行10分钟。\n\n💡 买伴手礼清单：Siam Paragon地下超市有大量泰国特产，品质高于机场免税店且价格更低。',
              type: 'suggest',
              meta: ['BTS Asok→Siam约15分钟', '伴手礼推荐Siam Paragon地下超市']
            },
            {
              name: '🏬 EmQuartier / Emsphere（Asok就近商圈）',
              desc: '从酒店BTS两站可到 EmQuartier（BTS Phrom Phong站），步行即到 Emsphere（2023年新开）。\n\n• EmQuartier：中高档，楼顶有瀑布，各楼层餐厅选择多\n• Emsphere：新商场，设计现代，有不少首进泰国的品牌\n\n💡 比Siam近，适合不想走太远的轻松购物下午。',
              type: 'optional',
              meta: ['BTS Asok→Phrom Phong 2站', '步行可达']
            },
            {
              name: '💆 泰式按摩 + 足疗',
              desc: '今天体力中等，下午做一次完整的泰式按摩是最划算的消遣：\n\n① Health Land（健康路 Asoke店）：步行10分钟，泰式350฿/小时，精油500฿/小时，口碑稳定\n② Lek Massage（Sukhumvit 39巷）：200–250฿/小时，街头小店中口碑最好的之一\n③ 任何BTS站附近的连锁泰式按摩：Divana、Lets Relax、Erawan等，价格400–600฿/小时，品质有保障\n\n💡 泰式按摩和足疗结合做，2小时约400–600泰铢，比国内同等质量便宜3–4倍。',
              type: 'suggest',
              meta: ['Asok步行圈内', '传统泰式200–350฿/小时', '精油按摩400–600฿/小时']
            }
          ]
        },
        {
          period: 'night',
          label: '晚上',
          range: '18:00–22:00',
          activities: [
            {
              name: '🌙 Jodd Fairs 夜市（推荐）',
              desc: '曼谷目前最火的夜市（取代了老的Ratchada夜市），以彩色霓虹灯和多元小吃著称。\n\n• 地址：Jodd Fairs DanNeramit，MRT Thailand Cultural Centre站附近，Grab从Asok约15–25分钟，50–70泰铢\n• 开放：约17:00–23:00（周四–周日最热闹）\n• 必吃：烤肉/海鲜串、泰式奶茶、榴莲冰激凌、蟹肉炒饭\n• 人均：80–200泰铢\n\n💡 晚上灯光效果很好，适合拍照打卡。比Chatuchak夜市更集中好逛。',
              type: 'suggest',
              meta: ['Grab约15–25分钟', '人均80–200฿', '17:00后开放']
            },
            {
              name: '🌊 Asiatique 河滨夜市',
              desc: '湄南河边的码头改建夜市，露天仓库风格，适合慢慢逛。\n\n• 地址：BTS Saphan Taksin站出口，坐免费接驳船约10分钟\n• 开放：17:00–24:00\n• 特色：手工艺品/服装/皮具，餐厅多且有河景\n• 人均：100–250泰铢\n\n💡 氛围好但比较商业化，更适合不赶时间慢慢逛的晚上。',
              type: 'optional',
              meta: ['BTS Saphan Taksin + 接驳船', '人均100–250฿']
            },
            {
              name: '🍛 Asok附近随便吃（不想出远门）',
              desc: '如果今天逛商场已经消耗不少，就在Asok周边解决晚餐：\n\n① Sukhumvit Soi 11/13 街边餐厅：酒吧+餐厅密集，步行可达，人均100–200泰铢\n② Terminal 21地下美食广场：已经说过，随时可用\n③ 7-Eleven + 便利店便当：泡面/饭团/热狗，30–60泰铢，快速搞定',
              type: 'optional',
              meta: ['酒店步行5分钟', '人均50–200฿']
            }
          ]
        }
      ],
      warnings: [
        {
          type: 'info',
          title: '今天的意义',
          text: '这天的目标不是景点最多，而是让曼谷从"打卡模式"切换到"好逛模式"。按摩/商场/夜市任选，配合自己的体力节奏，不强求清单打满。'
        },
        {
          type: 'warning',
          title: '明天中午要退房',
          text: '5/2中午退房，凌晨02:50飞机。今晚不要玩太晚（建议23:00前回），明天还要整理行李、购物收尾、去机场，时间节奏不能乱。'
        }
      ],
      alternatives: []
    },

    // ─────────────────────────────────────────
    // D7 · 5/2 · 曼谷收尾 → 去机场
    // ─────────────────────────────────────────
    {
      id: 7,
      date: '2026-05-02',
      shortDate: '5/2',
      city: '曼谷',
      cityEn: 'Bangkok (Last Day)',
      cityCode: 'bangkok',
      emoji: '🏠',
      title: '收尾日：中午退房，22:00去机场',
      summary: '今天是返程节奏，不是完整游玩日。上午悠闲，中午退房，下午补货型购物，提前吃晚饭，整理行李，22:00出发去素万那普机场。',
      energyLevel: 1,
      highlights: ['退房', '轻量购物', '素万那普机场'],
      tags: ['收尾日', '返程', '机场'],
      times: [
        {
          period: 'am',
          label: '上午',
          range: '08:00–12:00',
          activities: [
            {
              name: '🌅 悠闲早餐 + 整理行李',
              desc: '今天最重要的事情是整理行李，不是找美食。酒店含早就直接吃，不含早去楼下便利店或附近咖啡馆：\n\n• Sukhumvit Soi 11附近早餐：粥店/咖啡馆/7-Eleven，50–100泰铢\n\n吃完立刻整理行李，把不需要再用的东西先打包，预留一套换洗衣物和机场用品。',
              type: 'suggest',
              meta: ['酒店步行圈内', '人均50–150฿']
            },
            {
              name: '🛍️ 最后一轮买手信（Asok步行圈）',
              desc: '只买"已经决定好要买"的东西，不做消耗型扫货：\n\n① Siam Paragon B1超市（BTS 15分钟）：泰国零食/咖喱酱/椰糖/OTOP特产，品质最好\n② Big C超市（Asok附近）：普通日用品+零食，价格实惠，Grab约10分钟\n③ 7-Eleven：泰式调料/零食/饮料最后一扫\n\n💡 重量控制！回程机票有行李额度限制，别超重。',
              type: 'optional',
              meta: ['Asok周边', 'Siam超市BTS 15分钟']
            },
            {
              name: '🏨 12:00 退房',
              desc: '整理好所有行李，办理退房。多余行李可以寄存到前台（一般免费寄存到当天）。退房后先去买手信或吃午饭，晚点再取行李出发。',
              type: 'must',
              meta: ['退房时间12:00前']
            }
          ]
        },
        {
          period: 'pm',
          label: '下午',
          range: '12:00–18:00',
          activities: [
            {
              name: '🍜 午饭（酒店附近）',
              desc: '退房后在Asok附近吃午饭：\n\n① Terminal 21 B1美食广场（步行5分钟）：50–100泰铢，干净快速\n② Sukhumvit Soi 11路边：街边小馆炒河粉/冬阴功汤，80–120泰铢\n③ 连锁泰餐：MK / S&P，稳定且有中文菜单，人均120–200泰铢\n\n下午时间相对宽裕，吃完可以再休息一会，或者去 Benchakitti Park（Asok附近的公园）随便走走，很多当地人下午跑步的地方，步行10分钟。',
              type: 'suggest',
              meta: ['Terminal 21步行5分钟', '人均50–200฿']
            },
            {
              name: '🧴 最后采购（如需）',
              desc: '有没有漏买的东西做个checklist：\n• 泰国咖喱酱/椰奶粉：Tops Supermarket或Big C\n• 泰式奶茶包/ChaTraMue品牌：7-Eleven有卖\n• BOOTS护肤品：曼谷BOOTS连锁比国内便宜，Asok附近有门店\n• 象王软膏/虎牌万金油：药妆店有卖\n\n⚠️ 购买液体类注意航空限制：超100ml需托运，不能手提。',
              type: 'optional',
              meta: ['Asok步行圈内', 'BOOTS药妆步行可达']
            },
            {
              name: '🛋️ 回酒店/咖啡馆休息',
              desc: '行李已经取回，下午17:00之前尽量不做费体力的活动。去咖啡馆坐坐或回前台大厅等候，保持体力给今晚的机场流程。',
              type: 'suggest',
              meta: ['保留体力给机场流程']
            }
          ]
        },
        {
          period: 'night',
          label: '傍晚/出发',
          range: '17:00–次日02:50',
          activities: [
            {
              name: '🍽️ 17:30–18:30 提前吃晚饭',
              desc: '必须17:30–18:30之间吃完晚饭，不要拖到很晚。在Asok步行圈解决：\n\n① Terminal 21 B1或B2餐厅：最近，最省时间\n② Sukhumvit Soi 13/15的街边餐厅：步行3–5分钟\n③ Grab点外卖：如果已经在整理行李可以叫外卖（Grab Food）直接送到酒店',
              type: 'must',
              meta: ['18:30前必须吃完', '酒店步行圈内']
            },
            {
              name: '🧳 整理行李 + 核对出发清单',
              desc: '最终出发前必须检查：\n☑ 护照（在随身包里）\n☑ 回程机票电子版（手机截图+邮件）\n☑ TDAC二维码（截图保存）\n☑ 充电宝在随身行李（不能托运）\n☑ 手机已充电\n☑ 所有现金/银行卡\n☑ 酒店钥匙已归还',
              type: 'must',
              meta: ['出发前逐项核对']
            },
            {
              name: '🚗 22:00 出发去素万那普机场',
              desc: '5/3 02:50起飞，国际出发流程长，必须22:00前从酒店出发：\n\n【Grab】：Asok→素万那普约40–60分钟，约200–300泰铢，夜间不堵。\n【BTS+ARL（机场铁路）】：BTS到Phaya Thai → 换ARL（机场快线）→ 素万那普，约45分钟，合计约80–100泰铢，但深夜搬行李换乘比较麻烦。\n\n👉 推荐直接Grab，深夜行李多换乘不划算。\n\n⚠️ 22:30之前务必在机场。',
              type: 'must',
              meta: ['22:00出发', 'Grab约40–60分钟，200–300฿', '22:30前到机场']
            },
            {
              name: '✈️ 素万那普机场国际出发流程',
              desc: '抵达机场后流程：\n\n① 3楼（出发层）找你的航班值机柜台（看大屏幕确认）\n② 值机 + 托运行李（可线上值机提前选座）\n③ 安检（脱皮带/手表，液体分开，充电宝随身）\n④ 边检（护照+TDAC二维码，自动或人工通道）\n⑤ 走到登机口（机场很大，注意登机口编号）\n\n⚠️ 官方要求：登机前至少45分钟到达登机口。\n02:50起飞 → 最晚02:05到登机口 → 建议01:30前完成边检。',
              type: 'must',
              meta: ['3楼国际出发', '至少22:30到机场', '02:05前到登机口']
            }
          ]
        }
      ],
      warnings: [
        {
          type: 'danger',
          title: '5/2不是完整游玩日',
          text: '今天已经进入返程节奏。不要再排正式景点，不要夜市拖到22:00，不要跑去远处购物。一旦耽误机场流程，后果非常麻烦。'
        },
        {
          type: 'warning',
          title: '凌晨机场出发倒计时',
          text: '02:50起飞 → 22:00从酒店出发 → 22:30到机场 → 值机托运 → 安检 → 边检 → 01:30前完成边检 → 02:05到登机口。每个环节都要留缓冲。'
        },
        {
          type: 'info',
          title: '机场内等候',
          text: '过完边检后进入候机区，有免税店/餐厅/充电站。深夜航班有时候免税店关了部分，但基本餐厅和充电设施都在。带点零食在包里，以防机场找不到开着的店。'
        }
      ],
      alternatives: []
    },

    // ─────────────────────────────────────────
    // D8 · 5/3 · 返程
    // ─────────────────────────────────────────
    {
      id: 8,
      date: '2026-05-03',
      shortDate: '5/3',
      city: '返程',
      cityEn: 'Return to Shanghai',
      cityCode: 'return',
      emoji: '✈️',
      title: '02:50 飞回上海',
      summary: '凌晨登机，顺利返回上海。这趟澳门→芭提雅→曼谷的旅程完美收尾。',
      energyLevel: 1,
      highlights: ['素万那普机场', '曼谷→上海'],
      tags: ['返程', '凌晨航班'],
      times: [
        {
          period: 'am',
          label: '凌晨',
          range: '00:00–02:50',
          activities: [
            {
              name: '🛋️ 候机区等候',
              desc: '过了边检后进入候机区，找好登机口位置。有充电站、24小时便利店/餐厅。可以买点东西吃，手机充好电，休息一下。',
              type: 'suggest',
              meta: ['候机区有充电站和餐厅']
            },
            {
              name: '🚪 02:05 最晚到达登机口',
              desc: '02:50起飞，登机口提前45分钟关闭。最晚02:05前必须在登机口，建议01:45前到达，有缓冲。',
              type: 'must',
              meta: ['最晚02:05到登机口']
            },
            {
              name: '🎉 顺利返回上海',
              desc: '这趟澳门 → 芭提雅 → 曼谷的旅程到这里完美收尾。你走完了第一次出境自由行，下次会更顺手。',
              type: 'suggest',
              meta: ['旅程圆满完成！']
            }
          ]
        }
      ],
      warnings: [
        {
          type: 'success',
          title: '旅途顺利！🎉',
          text: '你完成了第一次出境自由行：澳门老城→芭提雅海岛→曼谷古迹&城市。一共8天，4个城市，每天都有清晰目标。希望一切顺利，旅途愉快！'
        }
      ],
      alternatives: []
    }
  ]
};

// ============================================
// 地图数据（与新行程对应）
// ============================================
const MAP_DATA = {
  overview: {
    center: [15.0, 104.0],
    zoom: 5
  },
  pois: [
    // ── 澳门 ──
    {
      id: 'macau-airport',
      city: 'macau',
      name: '澳门国际机场',
      nameEn: 'Macau International Airport',
      emoji: '✈️',
      lat: 22.1496,
      lng: 113.5912,
      type: 'transport',
      address: '澳门氹仔北安',
      tip: '北出口外停车场有免费酒店穿梭巴士，11:00–21:00每15–20分钟一班',
      nav: 'https://maps.google.com/?q=22.1496,113.5912'
    },
    {
      id: 'cotai-hotel',
      city: 'macau',
      name: '氹仔/路氹住宿区',
      nameEn: 'Cotai Strip',
      emoji: '🏨',
      lat: 22.1497,
      lng: 113.5665,
      type: 'stay',
      address: '澳门路氹城',
      tip: '推荐住宿区，机场10分钟车程，步行5分钟内有美食广场和便利店',
      nav: 'https://maps.google.com/?q=22.1497,113.5665'
    },
    {
      id: 'ruins-st-paul',
      city: 'macau',
      name: '大三巴牌坊',
      nameEn: "Ruins of St. Paul's",
      emoji: '🏛️',
      lat: 22.1974,
      lng: 113.5393,
      type: 'attraction',
      address: '澳门大堂区大三巴街',
      tip: '免费参观，全天开放，旁边有大炮台可俯瞰老城',
      nav: 'https://maps.google.com/?q=22.1974,113.5393'
    },
    {
      id: 'senado-square',
      city: 'macau',
      name: '议事亭前地',
      nameEn: 'Senado Square',
      emoji: '🎭',
      lat: 22.1937,
      lng: 113.5384,
      type: 'attraction',
      address: '澳门半岛议事亭前地',
      tip: '步行街，手信/餐厅密集，大三巴步行5分钟。买蛋卷/猪扒包首选',
      nav: 'https://maps.google.com/?q=22.1937,113.5384'
    },
    {
      id: 'macau-food-cotai',
      city: 'macau',
      name: '路氹城美食广场（Galaxy银河）',
      nameEn: 'Galaxy Macau Food Court',
      emoji: '🍽️',
      lat: 22.1473,
      lng: 113.5628,
      type: 'food',
      address: '澳门路氹城Galaxy银河商场内',
      tip: '酒店步行5分钟内，多国美食，人均40–150澳门元，营业至23:00',
      nav: 'https://maps.google.com/?q=22.1473,113.5628'
    },

    // ── 芭提雅 ──
    {
      id: 'pattaya-hotel',
      city: 'pattaya',
      name: '芭提雅推荐住宿区',
      nameEn: 'Central / North Pattaya',
      emoji: '🏨',
      lat: 12.9395,
      lng: 100.8836,
      type: 'stay',
      address: 'Central / North Pattaya Beach',
      tip: '步行10分钟内到海滩。附近有多家海鲜餐厅和便利店',
      nav: 'https://maps.google.com/?q=12.9395,100.8836'
    },
    {
      id: 'pattaya-beach',
      city: 'pattaya',
      name: '芭提雅海滩路',
      nameEn: 'Pattaya Beach Road',
      emoji: '🌅',
      lat: 12.9436,
      lng: 100.8784,
      type: 'attraction',
      address: 'Pattaya Beach Road, Central Pattaya',
      tip: '酒店步行5–10分钟，傍晚18:00夕阳最佳，沿路有大量海鲜餐厅',
      nav: 'https://maps.google.com/?q=12.9436,100.8784'
    },
    {
      id: 'bali-hai-pier',
      city: 'pattaya',
      name: 'Bali Hai 码头（格兰岛渡船）',
      nameEn: 'Laem Bali Hai Pier',
      emoji: '⛵',
      lat: 12.9209,
      lng: 100.8751,
      type: 'transport',
      address: 'Laem Bali Hai, South Pattaya',
      tip: '格兰岛渡船出发点。公共渡船30–50฿/人，约40分钟。07:00起每小时左右一班',
      nav: 'https://maps.google.com/?q=12.9209,100.8751'
    },
    {
      id: 'koh-larn',
      city: 'pattaya',
      name: '格兰岛 Koh Larn',
      nameEn: 'Koh Larn (Ko Lan)',
      emoji: '🏝️',
      lat: 12.8873,
      lng: 100.7873,
      type: 'attraction',
      address: 'Ko Lan, Banglamung District, Pattaya',
      tip: '芭提雅最值得去的近岛，海水清澈。Tawaen Beach最热闹，末班渡船约18:00',
      nav: 'https://maps.google.com/?q=12.8873,100.7873'
    },
    {
      id: 'sanctuary-of-truth',
      city: 'pattaya',
      name: '真理寺',
      nameEn: 'Sanctuary of Truth',
      emoji: '🏯',
      lat: 12.9672,
      lng: 100.8755,
      type: 'attraction',
      address: '206/2 Moo 5, Naklua, Banglamung, Pattaya',
      tip: '全木雕建筑高105米，门票500฿，开放08:00–18:00。天气差时Koh Larn的备选',
      nav: 'https://maps.google.com/?q=12.9672,100.8755'
    },
    {
      id: 'nang-nual-restaurant',
      city: 'pattaya',
      name: 'Nang Nual 海鲜餐厅',
      nameEn: 'Nang Nual Restaurant',
      emoji: '🦞',
      lat: 12.9259,
      lng: 100.8766,
      type: 'food',
      address: 'Beach Road, South Pattaya',
      tip: '芭提雅老牌海鲜，步行可达，人均150–300฿，菜单有图片，点新鲜冰桶里的海鲜',
      nav: 'https://maps.google.com/?q=12.9259,100.8766'
    },
    {
      id: 'walking-street',
      city: 'pattaya',
      name: 'Walking Street 步行街',
      nameEn: 'Walking Street',
      emoji: '🌃',
      lat: 12.9213,
      lng: 100.8786,
      type: 'nightlife',
      address: 'Walking Street, South Pattaya',
      tip: '芭提雅夜生活核心区，20:00后最热闹。体力允许逛一圈体验即可',
      nav: 'https://maps.google.com/?q=12.9213,100.8786'
    },
    {
      id: 'central-festival-pattaya',
      city: 'pattaya',
      name: 'Central Festival Pattaya Beach',
      nameEn: 'Central Festival Pattaya Beach',
      emoji: '🏬',
      lat: 12.9481,
      lng: 100.8792,
      type: 'shopping',
      address: '333/99 Moo 9, Nongprue, Banglamung, Pattaya',
      tip: '北芭提雅大型购物中心，天气差时避暑首选，餐厅+超市+电影院，Grab约10分钟',
      nav: 'https://maps.google.com/?q=12.9481,100.8792'
    },

    // ── 曼谷 ──
    {
      id: 'asok-hotel',
      city: 'bangkok',
      name: 'Asok / Sukhumvit 住宿区',
      nameEn: 'Asok / Sukhumvit',
      emoji: '🏨',
      lat: 13.7367,
      lng: 100.5600,
      type: 'stay',
      address: '曼谷素坤逸路 Asok交叉口',
      tip: 'BTS/MRT双线交汇，步行圈内有Terminal 21商场、密集餐厅和便利店',
      nav: 'https://maps.google.com/?q=13.7367,100.5600'
    },
    {
      id: 'grand-palace',
      city: 'bangkok',
      name: '大皇宫 + 翡翠佛寺',
      nameEn: 'Grand Palace & Wat Phra Kaew',
      emoji: '👑',
      lat: 13.7500,
      lng: 100.4913,
      type: 'attraction',
      address: 'Na Phra Lan Rd, Phra Nakhon, Bangkok',
      tip: '开放08:30，售票截至15:30，门票500฿。着装严格，无袖/短裤禁止入场',
      nav: 'https://maps.google.com/?q=13.7500,100.4913',
      officialUrl: 'http://www.royalgrandpalace.th'
    },
    {
      id: 'wat-pho',
      city: 'bangkok',
      name: '卧佛寺 Wat Pho',
      nameEn: 'Wat Pho',
      emoji: '🛕',
      lat: 13.7466,
      lng: 100.4930,
      type: 'attraction',
      address: '2 Sanam Chai Rd, Phra Nakhon, Bangkok',
      tip: '大皇宫步行5分钟，门票200฿，开放08:00–18:30。寺内有正宗泰式按摩室460฿/30分钟',
      nav: 'https://maps.google.com/?q=13.7466,100.4930'
    },
    {
      id: 'wat-arun',
      city: 'bangkok',
      name: '郑王庙 Wat Arun',
      nameEn: 'Wat Arun',
      emoji: '⛩️',
      lat: 13.7437,
      lng: 100.4888,
      type: 'attraction',
      address: '158 Wang Doem Rd, Bangkok Yai',
      tip: '从Tha Tien码头搭5฿渡船，门票100฿，开放08:00–18:00，主塔可登高俯瞰湄南河',
      nav: 'https://maps.google.com/?q=13.7437,100.4888'
    },
    {
      id: 'yaowarat',
      city: 'bangkok',
      name: '唐人街 Yaowarat',
      nameEn: 'Yaowarat Chinatown',
      emoji: '🏮',
      lat: 13.7398,
      lng: 100.5106,
      type: 'food',
      address: 'Yaowarat Road, Samphanthawong, Bangkok',
      tip: '曼谷最著名夜宵区，Asok→唐人街Grab约20–30分钟。18:30后最热闹，燕窝/海鲜必吃',
      nav: 'https://maps.google.com/?q=13.7398,100.5106'
    },
    {
      id: 'terminal21',
      city: 'bangkok',
      name: 'Terminal 21 商场',
      nameEn: 'Terminal 21 Asok',
      emoji: '🏬',
      lat: 13.7374,
      lng: 100.5602,
      type: 'shopping',
      address: '88 Sukhumvit Soi 19, Khlong Toei Nuea, Bangkok',
      tip: '酒店步行5分钟，B1有超值美食广场（人均50–100฿），各楼层以不同城市为主题',
      nav: 'https://maps.google.com/?q=13.7374,100.5602'
    },
    {
      id: 'siam-paragon',
      city: 'bangkok',
      name: 'Siam Paragon 商场',
      nameEn: 'Siam Paragon',
      emoji: '🛍️',
      lat: 13.7463,
      lng: 100.5347,
      type: 'shopping',
      address: '991 Rama I Rd, Pathum Wan, Bangkok',
      tip: 'BTS Siam站步行即达，Asok出发约15分钟。B1 Gourmet Market买伴手礼比机场便宜',
      nav: 'https://maps.google.com/?q=13.7463,100.5347'
    },
    {
      id: 'jodd-fairs',
      city: 'bangkok',
      name: 'Jodd Fairs 夜市',
      nameEn: 'Jodd Fairs DanNeramit',
      emoji: '🌙',
      lat: 13.7604,
      lng: 100.5669,
      type: 'food',
      address: 'Jodd Fairs DanNeramit, Ratchadaphisek Rd, Bangkok',
      tip: '曼谷最火夜市，Grab从Asok约15–25分钟，17:00开放。霓虹灯+多元小吃，人均80–200฿',
      nav: 'https://maps.google.com/?q=13.7604,100.5669'
    },
    {
      id: 'health-land-asoke',
      city: 'bangkok',
      name: 'Health Land 按摩（Asoke店）',
      nameEn: 'Health Land Asoke',
      emoji: '💆',
      lat: 13.7278,
      lng: 100.5697,
      type: 'massage',
      address: '96/1 Sukhumvit 21 (Asoke), Bangkok',
      tip: '老牌连锁按摩，BTS Asok步行约10分钟，泰式350฿/小时，建议提前电话预约',
      nav: 'https://maps.google.com/?q=13.7278,100.5697'
    },
    {
      id: 'suvarnabhumi',
      city: 'bangkok',
      name: '素万那普国际机场',
      nameEn: 'Suvarnabhumi Airport (BKK)',
      emoji: '🛫',
      lat: 13.6900,
      lng: 100.7501,
      type: 'transport',
      address: 'Bang Phli, Samut Prakan',
      tip: '5/3 02:50起飞，建议5/2 22:00从Asok出发，Grab约200–300฿，约40–60分钟',
      nav: 'https://maps.google.com/?q=13.6900,100.7501'
    }
  ],

  routes: [
    {
      id: 'route-macau-oldtown',
      day: 1,
      city: 'macau',
      title: '4/26 澳门老城慢走线',
      emoji: '🎰',
      steps: [
        { name: '氹仔/路氹酒店出发', desc: '酒店穿梭巴士或的士前往澳门半岛老城，约20分钟', transport: '免费穿梭巴士 / 的士25–35澳门元' },
        { name: '大三巴牌坊', desc: '澳门标志，免费参观，旁边大炮台可俯瞰老城，约45分钟', transport: '步行' },
        { name: '玫瑰堂', desc: '步行5分钟，黄色巴洛克建筑，免费', transport: '步行' },
        { name: '议事亭前地', desc: '步行2分钟，葡式步行街，买手信/猪扒包/杏仁饼', transport: '步行' },
        { name: '返回氹仔/路氹吃晚饭', desc: '的士或穿梭巴士回路氹城，步行5分钟内有美食广场', transport: '的士/穿梭巴士' }
      ]
    },
    {
      id: 'route-airport-to-pattaya',
      day: 2,
      city: 'pattaya',
      title: '4/27 素万那普机场→芭提雅',
      emoji: '🏖️',
      steps: [
        { name: '素万那普机场入境', desc: '护照+TDAC二维码，排移民局队约30–60分钟', transport: '步行跟指示牌' },
        { name: '机场→芭提雅', desc: 'Official Taxi排队或Bell Travel大巴（1楼8号门外）', transport: '包车900–1200฿ / 大巴130–200฿' },
        { name: '芭提雅酒店入住', desc: 'Central/North Pattaya靠海区域，步行10分钟到海滩', transport: '到达' },
        { name: '芭提雅海滩散步', desc: 'Beach Road傍晚散步，看夕阳，感受海边氛围', transport: '步行' },
        { name: '海鲜晚餐', desc: 'Beach Road沿线海鲜餐厅随选，人均150–350฿', transport: '步行' }
      ]
    },
    {
      id: 'route-koh-larn',
      day: 3,
      city: 'pattaya',
      title: '4/28 格兰岛出海路线',
      emoji: '🏝️',
      steps: [
        { name: '酒店出发', desc: '07:30–08:00出发，打双条车或Grab去码头', transport: '双条车20–30฿ / Grab 50–80฿' },
        { name: 'Bali Hai 码头', desc: '南芭提雅，在售票亭买船票，等候渡船', transport: '购票等候' },
        { name: '渡船去格兰岛', desc: '公共渡船约40分钟，票价30–50฿', transport: '渡船' },
        { name: 'Tawaen Beach 玩海', desc: '游泳/浮潜/躺椅，岛上餐厅午饭，人均100–200฿', transport: '步行/摩托租' },
        { name: '13:30–14:30 渡船返回', desc: '不要赶末班，提前返回。码头Grab/双条回酒店', transport: '渡船+双条车/Grab' }
      ]
    },
    {
      id: 'route-pattaya-to-bkk',
      day: 4,
      city: 'bangkok',
      title: '4/29 芭提雅→曼谷转场',
      emoji: '🏙️',
      steps: [
        { name: '真理寺参观（可选）', desc: '上午08:00–10:00，门票500฿，约1小时，North Pattaya Grab 5–8分钟', transport: 'Grab' },
        { name: '午餐 + 退房', desc: '12:00前退房，附近解决午饭', transport: '步行' },
        { name: '芭提雅→曼谷 Asok', desc: '包车直达约1.5–2小时，或北芭提雅大巴站乘大巴', transport: '包车900–1200฿ / 大巴80–130฿' },
        { name: '入住曼谷 Asok 酒店', desc: 'BTS/MRT步行8分钟内的位置最佳', transport: '到达' },
        { name: '唐人街晚餐（可选）', desc: 'Grab 20–30分钟去Yaowarat，人均80–200฿', transport: 'Grab 50–80฿' }
      ]
    },
    {
      id: 'route-oldtown-bkk',
      day: 5,
      city: 'bangkok',
      title: '4/30 曼谷老城主线',
      emoji: '🏛️',
      steps: [
        { name: 'Asok酒店出发', desc: '07:30出发，BTS到Saphan Taksin换水上巴士', transport: 'BTS + 水上巴士约40฿' },
        { name: '大皇宫 + 翡翠佛寺', desc: '08:30进场，门票500฿，参观2–3小时，着装合规', transport: '步行' },
        { name: '卧佛寺 Wat Pho', desc: '步行5分钟，门票200฿，46米卧佛，可做按摩460฿/30分钟', transport: '步行' },
        { name: '郑王庙 Wat Arun（可选）', desc: 'Tha Tien码头渡船5฿，门票100฿，可登高', transport: '渡船' },
        { name: '回酒店/商场降温', desc: '中午高温主动进室内，Grab回Asok约80–120฿', transport: 'Grab' }
      ]
    },
    {
      id: 'route-return-airport',
      day: 7,
      city: 'bangkok',
      title: '5/2 晚 返程去机场',
      emoji: '🛫',
      steps: [
        { name: '22:00 酒店出发', desc: '5/3 02:50起飞，Grab直达机场，约40–60分钟', transport: 'Grab 200–300฿' },
        { name: '素万那普机场3楼', desc: '到达3楼国际出发层，看大屏幕找航班柜台', transport: '到达' },
        { name: '值机 + 托运行李', desc: '柜台值机或自助值机，充电宝随身不可托运', transport: '' },
        { name: '安检 + 边检', desc: '脱皮带/手表；护照+TDAC出示，自动通道或人工', transport: '' },
        { name: '02:05前到登机口', desc: '机场较大注意登机口编号，02:50起飞', transport: '' }
      ]
    }
  ]
};

// ============================================
// Checklist 数据（不变）
// ============================================
const CHECKLIST_DATA = [
  {
    id: 'documents',
    title: '📄 证件与订单',
    icon: '📄',
    items: [
      { id: 'passport', name: '护照', desc: '确认有效期在5/3之后还剩6个月以上', must: true, tag: '必须' },
      { id: 'passport-photo', name: '护照首页照片（手机保存）', desc: '截图存到相册，过关/入住时有用', must: true, tag: '必须' },
      { id: 'flight-macau', name: '上海→澳门机票', desc: '保存电子机票到手机和邮箱', must: true },
      { id: 'flight-bkk', name: '澳门→曼谷机票', desc: '保存电子机票和确认号', must: true },
      { id: 'flight-return', name: '曼谷→上海回程机票', desc: '最重要的一张，保存确认号和航班号', must: true, tag: '必须' },
      { id: 'hotel-macau', name: '澳门酒店确认单', desc: '包含地址和入住时间', must: true },
      { id: 'hotel-pattaya', name: '芭提雅酒店确认单', desc: '入境填TDAC时需要住宿地址', must: true, tag: '必须' },
      { id: 'hotel-bkk', name: '曼谷酒店确认单', desc: '含英文地址，曼谷住3晚', must: true },
      { id: 'id-card', name: '身份证', desc: '澳门入境可用，境外以护照为主', must: false }
    ]
  },
  {
    id: 'entry',
    title: '🛂 入境事项',
    icon: '🛂',
    items: [
      { id: 'tdac', name: '泰国TDAC电子入境卡（必须）', desc: '所有进入泰国的非泰国籍旅客必须在抵达前3天内填写。官网：tdac.immigration.go.th。4/27抵达，建议4/24–4/26完成。注意：全程用英文填写！', must: true, tag: '4/24前完成' },
      { id: 'tdac-qr', name: '保存TDAC确认QR码截图', desc: '提交后邮件会收到，截图保存。入境时向移民官出示。姓名/国籍/出生日期填完不可修改，仔细核对！', must: true, tag: '必须' },
      { id: 'macau-entry', name: '澳门入境证件确认', desc: '中国大陆居民持身份证或护照均可入澳门，带好即可', must: true },
      { id: 'pattaya-address', name: '芭提雅酒店英文地址已保存', desc: '入境泰国时移民官可能询问，确保备好芭提雅第一晚酒店的英文地址', must: true },
      { id: 'return-ticket', name: '能出示回程机票', desc: '泰国入境有时查看离境证明，备好回程票截图', must: true, tag: '建议备好' }
    ]
  },
  {
    id: 'network',
    title: '📱 网络与通信',
    icon: '📱',
    items: [
      { id: 'esim', name: '出境网络方案已确认', desc: '三选一：①eSIM（推荐，落地即用，提前购买泰国+澳门卡）②国际漫游（提前开通）③机场买实体SIM（泰国机场有售，30–50฿/天）', must: true, tag: '出发前确认' },
      { id: 'grab', name: '已安装Grab并绑定支付', desc: '芭提雅和曼谷都会大量用到，打车安全透明。提前注册并绑卡！', must: true, tag: '必装' },
      { id: 'google-maps', name: '已下载Google Maps离线地图', desc: '下载曼谷+芭提雅离线包，弱网时仍可导航', must: true },
      { id: 'translate-app', name: '翻译App已下载泰语离线包', desc: 'Google翻译下载泰语离线包，可拍照翻译菜单', must: true },
      { id: 'hotel-wifi', name: '入住后确认酒店Wi-Fi可用', desc: '每到一家酒店第一件事：要Wi-Fi密码并测速', must: false },
      { id: 'emergency-number', name: '紧急联系电话已保存到手机', desc: '中国驻泰使馆：+66-2-245-7032；泰国旅游警察：1155；急救：1669', must: true, tag: '安全' }
    ]
  },
  {
    id: 'payment',
    title: '💳 支付与现金',
    icon: '💳',
    items: [
      { id: 'visa-card', name: 'Visa/Mastercard银行卡', desc: '泰国商场/ATM通用，出发前通知银行开通境外消费', must: true, tag: '必须' },
      { id: 'bank-notice', name: '已通知银行开通境外刷卡', desc: '手机银行App里操作，否则境外刷卡会被风控拒绝', must: true, tag: '出发前' },
      { id: 'cash-baht', name: '备好泰铢现金', desc: '建议2000–3000泰铢（约400–600元）。双条车/渡船/摊位只收现金。可在国内兑换或泰国机场ATM取', must: true },
      { id: 'cash-mop', name: '备好澳门元/港元（少量）', desc: '100–200澳门/港元够用，用于交通和手信购物', must: false },
      { id: 'backup-card', name: '备用银行卡（不同银行）', desc: '至少两张不同银行的卡，主卡出问题有备用', must: true, tag: '安全' },
      { id: 'exchange-rate', name: '了解当前汇率', desc: '泰铢对人民币约0.20–0.21，出发前在银行App确认', must: false }
    ]
  },
  {
    id: 'luggage',
    title: '🧳 行李与衣物',
    icon: '🧳',
    items: [
      { id: 'light-clothes', name: '轻薄透气衣物（多件）', desc: '4–5月泰国均温30–38°C，棉/麻/吸湿排汗材质，白天全程高温', must: true },
      { id: 'temple-outfit', name: '大皇宫专用着装（4/30用）', desc: '❗禁止：无袖、背心、短裤、迷你裙、破洞裤、紧身裤、透视装。必须：有袖上衣+长裤或过膝裙。提前单独放好！', must: true, tag: '4/30必须' },
      { id: 'sandals', name: '凉鞋/拖鞋', desc: '芭提雅海边/格兰岛必备，曼谷逛街也舒服', must: true },
      { id: 'sneakers', name: '运动鞋（一双）', desc: '曼谷寺庙参观时穿，步行量大', must: true },
      { id: 'swimwear', name: '泳装（格兰岛用）', desc: '4/28 Koh Larn出海必备，下水游泳/浮潜用', must: true, tag: '4/28必须' },
      { id: 'sunscreen', name: '防晒霜（SPF50+）', desc: '泰国紫外线极强，尤其出海暴晒，带足量', must: true, tag: '必备' },
      { id: 'sunglasses', name: '墨镜', desc: '海岛和户外寺庙都会用到', must: false },
      { id: 'hat', name: '遮阳帽', desc: '格兰岛和大皇宫都需要，宽沿帽最好', must: false },
      { id: 'charger', name: '充电器+转换头', desc: '泰国/澳门插座为两脚扁插，中国标准插头可直接用，但多孔转换头更稳妥', must: true },
      { id: 'powerbank', name: '充电宝（10000mAh+）', desc: '一天外出消耗大，带充电宝。注意：只能随身携带不能托运', must: true },
      { id: 'medicine', name: '常用药品', desc: '止泻药/创可贴/驱蚊液/防晒喷雾/感冒药/止痛药', must: false, tag: '推荐' },
      { id: 'quick-dry-towel', name: '速干毛巾（小）', desc: '格兰岛出海/游泳用，轻便速干', must: false }
    ]
  },
  {
    id: 'apps',
    title: '📲 必备App',
    icon: '📲',
    items: [
      { id: 'app-grab', name: 'Grab（打车必备）', desc: '芭提雅和曼谷最安全透明的打车方式，东南亚版滴滴。提前安装并注册！', must: true, tag: '必装' },
      { id: 'app-googlemaps', name: 'Google Maps', desc: '地图导航，下载离线包（曼谷+芭提雅），支持公交/地铁查询', must: true, tag: '必装' },
      { id: 'app-translate', name: 'Google Translate', desc: '下载泰语离线包，支持拍照翻译菜单', must: true },
      { id: 'app-booking', name: 'Booking / Agoda', desc: '下载好方便查看订单和联系酒店', must: true },
      { id: 'app-flightradar', name: 'FlightRadar24', desc: '实时航班状态查询', must: false },
      { id: 'app-xe', name: 'XE Currency', desc: '实时汇率，支付前换算', must: false },
      { id: 'app-triplite', name: 'TripLite（本网站）', desc: '添加到手机主屏幕可离线使用！浏览器→分享→添加到主屏幕', must: false, tag: '加主屏' }
    ]
  }
];

// ============================================
// 住宿数据（更新芭提雅提前、曼谷后置）
// ============================================
const STAY_DATA = {
  cities: [
    {
      id: 'macau',
      name: '澳门',
      emoji: '🎰',
      area: '氹仔 / 路氹',
      stayNights: 1,
      dates: '4/26（1晚）',
      reason: '机场接驳方便，第二天飞曼谷最省事。路氹城步行5分钟内有多家餐厅和美食广场，不用担心吃饭。',
      budgetRange: '¥300–¥400',
      hotels: [
        {
          name: '澳门喜来登大酒店',
          area: '路氹城（机场10分钟车程）',
          price: '¥380',
          score: 4.5,
          tags: ['近机场', '免费穿梭', '设施好'],
          pros: ['免费机场穿梭巴士', '步行5分钟内有美食广场和商场', '房间宽敞床很舒服'],
          warning: '旺季价格偏高，建议提前2周预订',
          booking: 'https://www.booking.com/searchresults.zh-cn.html?ss=%E6%BE%B3%E9%97%A8%E5%96%9C%E6%9D%A5%E7%99%BB%E5%A4%A7%E9%85%92%E5%BA%97&checkin=2026-04-26&checkout=2026-04-27&group_adults=2',
          agoda: 'https://www.agoda.com/zh-cn/search?city=5178&checkIn=2026-04-26&checkOut=2026-04-27&rooms=1&adults=2&children=0&keywords=Sheraton+Macao',
          trip: 'https://www.trip.com/hotels/list?city=108&countryId=96&checkin=2026-04-26&checkout=2026-04-27&searchword=Sheraton+Macao+Cotai'
        },
        {
          name: '澳门万豪酒店',
          area: '路氹城（机场10分钟车程）',
          price: '¥350',
          score: 4.4,
          tags: ['近路氹', '免费穿梭', '性价比'],
          pros: ['毗邻四季购物中心（步行3分钟）', '机场穿梭巴士', '早餐品质好'],
          warning: '路氹区酒店密集，预订时认准路氹城区域',
          booking: 'https://www.booking.com/searchresults.zh-cn.html?ss=%E6%BE%B3%E9%97%A8%E4%B8%87%E8%B1%AA%E9%85%92%E5%BA%97&checkin=2026-04-26&checkout=2026-04-27&group_adults=2',
          agoda: 'https://www.agoda.com/zh-cn/search?city=5178&checkIn=2026-04-26&checkOut=2026-04-27&rooms=1&adults=2&children=0&keywords=Marriott+Macao+Cotai',
          trip: 'https://www.trip.com/hotels/list?city=108&countryId=96&checkin=2026-04-26&checkout=2026-04-27&searchword=Marriott+Macao+Cotai'
        },
        {
          name: '路氹城商务酒店（省钱档）',
          area: '氹仔（机场附近）',
          price: '¥200–¥280',
          score: 4.0,
          tags: ['省钱档', '干净够用', '有接驳'],
          pros: ['只住一晚，干净够用', '交通有接驳', '步行可到便利店'],
          warning: '设施比五星简单，主要是睡觉用',
          booking: 'https://www.booking.com/searchresults.zh-cn.html?ss=Cotai+Strip+Macau&checkin=2026-04-26&checkout=2026-04-27&group_adults=2&price=1-500',
          agoda: 'https://www.agoda.com/zh-cn/search?city=5178&checkIn=2026-04-26&checkOut=2026-04-27&rooms=1&adults=2&children=0&minPrice=200&maxPrice=450',
          trip: 'https://www.trip.com/hotels/list?city=108&countryId=96&checkin=2026-04-26&checkout=2026-04-27&searchword=%E8%B7%AF%E6%B0%B9%E5%9F%8E'
        }
      ]
    },
    {
      id: 'pattaya',
      name: '芭提雅',
      emoji: '🏖️',
      area: 'Central / North Pattaya 靠海边',
      stayNights: 2,
      dates: '4/27–4/28（2晚）',
      reason: '只住2晚，位置优先于海景。靠近海滩步行10分钟内，附近餐厅多，去Bali Hai码头方便。不要住太偏。',
      budgetRange: '¥180–¥350',
      hotels: [
        {
          name: 'Aya Boutique Hotel Pattaya',
          area: 'Central Pattaya（步行到海边约8分钟）',
          price: '¥220',
          score: 4.2,
          tags: ['靠海边', '交通方便', '性价比'],
          pros: ['步行到芭提雅海滩约8分钟', '附近有双条车站（去码头20–30฿）', 'Central Festival商场步行10分钟'],
          warning: '旺季周末价格会涨，提前预订',
          booking: 'https://www.booking.com/searchresults.zh-cn.html?ss=Aya+Boutique+Hotel+Pattaya&checkin=2026-04-27&checkout=2026-04-29&group_adults=2',
          agoda: 'https://www.agoda.com/zh-cn/search?city=2034&checkIn=2026-04-27&checkOut=2026-04-29&rooms=1&adults=2&children=0&keywords=Aya+Boutique+Pattaya',
          trip: 'https://www.trip.com/hotels/list?city=673&countryId=77&checkin=2026-04-27&checkout=2026-04-29&searchword=Aya+Boutique+Pattaya'
        },
        {
          name: 'Amara Bangkok Pattaya',
          area: 'North Pattaya（步行到海边约10分钟）',
          price: '¥280',
          score: 4.4,
          tags: ['泳池', '北芭提雅', '设施全'],
          pros: ['泳池晒累回来可以用', '步行到海边约10分钟', '附近餐厅密集'],
          warning: '去Bali Hai码头（南芭提雅）打双条约20–30฿，约20分钟',
          booking: 'https://www.booking.com/searchresults.zh-cn.html?ss=Amara+Pattaya&checkin=2026-04-27&checkout=2026-04-29&group_adults=2',
          agoda: 'https://www.agoda.com/zh-cn/search?city=2034&checkIn=2026-04-27&checkOut=2026-04-29&rooms=1&adults=2&children=0&keywords=Amara+Pattaya',
          trip: 'https://www.trip.com/hotels/list?city=673&countryId=77&checkin=2026-04-27&checkout=2026-04-29&searchword=Amara+Pattaya'
        },
        {
          name: 'Flipper Lodge Hotel',
          area: 'North Pattaya中心（步行到海边约10分钟）',
          price: '¥160',
          score: 4.0,
          tags: ['省钱档', '够用', '位置好'],
          pros: ['最具性价比', '步行圈内餐厅多', '干净整洁'],
          warning: '房间面积较小，只用来睡觉和放行李完全够',
          booking: 'https://www.booking.com/searchresults.zh-cn.html?ss=Flipper+Lodge+Pattaya&checkin=2026-04-27&checkout=2026-04-29&group_adults=2',
          agoda: 'https://www.agoda.com/zh-cn/search?city=2034&checkIn=2026-04-27&checkOut=2026-04-29&rooms=1&adults=2&children=0&keywords=Flipper+Lodge+Pattaya',
          trip: 'https://www.trip.com/hotels/list?city=673&countryId=77&checkin=2026-04-27&checkout=2026-04-29&searchword=Flipper+Lodge+Pattaya'
        }
      ]
    },
    {
      id: 'bangkok',
      name: '曼谷',
      emoji: '🏙️',
      area: 'Asok / Sukhumvit',
      stayNights: 3,
      dates: '4/29–5/1（3晚）',
      reason: '第一次去曼谷最均衡的选择。BTS/MRT双线交汇，去老城方便，商圈步行可达，晚上吃饭按摩随时有。',
      budgetRange: '¥250–¥400',
      hotels: [
        {
          name: 'Grande Centre Point Terminal 21',
          area: 'Asok（BTS Asok + MRT Sukhumvit双线，Terminal 21直连）',
          price: '¥360',
          score: 4.5,
          tags: ['双线直达', '商场直连', '地段极佳'],
          pros: ['BTS Asok + MRT Sukhumvit两条线交汇', 'Terminal 21商场步行5分钟，B1美食广场50–100฿', '步行圈内按摩店5家以上'],
          warning: '价格略高，但位置是Asok区最顶级的',
          booking: 'https://www.booking.com/searchresults.zh-cn.html?ss=Grande+Centre+Point+Terminal+21+Bangkok&checkin=2026-04-29&checkout=2026-05-02&group_adults=2',
          agoda: 'https://www.agoda.com/zh-cn/search?city=17944&checkIn=2026-04-29&checkOut=2026-05-02&rooms=1&adults=2&children=0&keywords=Grande+Centre+Point+Terminal+21',
          trip: 'https://www.trip.com/hotels/list?city=294&countryId=77&checkin=2026-04-29&checkout=2026-05-02&searchword=Grande+Centre+Point+Terminal+21'
        },
        {
          name: 'Mercure Bangkok Sukhumvit 11',
          area: 'Sukhumvit Soi 11（BTS Nana步行5分钟）',
          price: '¥280',
          score: 4.3,
          tags: ['BTS步行圈', '餐厅密集', '交通好'],
          pros: ['步行到BTS Nana站5分钟', 'Sukhumvit 11有大量餐厅和便利店', '房间宽敞干净'],
          warning: 'Soi 11周末夜间酒吧噪音较大，轻睡眠者注意',
          booking: 'https://www.booking.com/searchresults.zh-cn.html?ss=Mercure+Bangkok+Sukhumvit+11&checkin=2026-04-29&checkout=2026-05-02&group_adults=2',
          agoda: 'https://www.agoda.com/zh-cn/search?city=17944&checkIn=2026-04-29&checkOut=2026-05-02&rooms=1&adults=2&children=0&keywords=Mercure+Bangkok+Sukhumvit+11',
          trip: 'https://www.trip.com/hotels/list?city=294&countryId=77&checkin=2026-04-29&checkout=2026-05-02&searchword=Mercure+Bangkok+Sukhumvit+11'
        },
        {
          name: 'ibis Bangkok Sukhumvit 4',
          area: 'Sukhumvit Soi 4（BTS Nana步行3分钟）',
          price: '¥200',
          score: 4.1,
          tags: ['省钱档', '近BTS', '干净够用'],
          pros: ['步行到BTS Nana站3分钟', '连锁品牌质量稳定', '价格实惠'],
          warning: 'Soi 4夜间有夜生活区，不适合早睡敏感者',
          booking: 'https://www.booking.com/searchresults.zh-cn.html?ss=ibis+Bangkok+Sukhumvit+4&checkin=2026-04-29&checkout=2026-05-02&group_adults=2',
          agoda: 'https://www.agoda.com/zh-cn/search?city=17944&checkIn=2026-04-29&checkOut=2026-05-02&rooms=1&adults=2&children=0&keywords=ibis+Bangkok+Sukhumvit+4',
          trip: 'https://www.trip.com/hotels/list?city=294&countryId=77&checkin=2026-04-29&checkout=2026-05-02&searchword=ibis+Bangkok+Sukhumvit+4'
        }
      ]
    }
  ]
};

// ============================================
// 应急数据（不变）
// ============================================
const EMERGENCY_DATA = [
  {
    id: 'airport',
    title: '✈️ 机场与航班',
    items: [
      {
        icon: '🛫',
        title: '素万那普机场返程流程（5/3 凌晨）',
        text: '5/3 02:50起飞，建议5/2 22:00从市区出发。\n\n流程：\n① 到机场3楼国际出发层\n② 找到航班值机柜台（看大屏幕）\n③ 值机+托运（充电宝随身！）\n④ 安检（脱皮带，液体分开）\n⑤ 边检（护照+TDAC二维码）\n⑥ 走到登机口\n\n⚠️ 官方要求：登机前至少45分钟到登机口。建议02:05前完成边检。'
      },
      {
        icon: '⏰',
        title: '航班延误怎么办',
        text: '关注短信/邮件通知，可在FlightRadar24查实时状态。延误超3小时可向航空公司申请餐食补贴；超5小时可要求住宿安排。'
      },
      {
        icon: '👝',
        title: '行李托运注意事项',
        text: '液体超100ml必须托运。充电宝必须随身携带不能托运。贵重物品放随身行李。'
      }
    ]
  },
  {
    id: 'network',
    title: '📡 没有网络怎么办',
    items: [
      {
        icon: '📴',
        title: '手机没网时',
        text: '1. 打开本网站离线模式（已缓存关键内容）\n2. 找酒店前台要Wi-Fi密码\n3. 去便利店/咖啡馆蹭Wi-Fi\n4. 买泰国实体SIM卡（机场有售，30–50฿/天）\n5. 开启同伴手机热点'
      },
      {
        icon: '🗺️',
        title: '没网时怎么导航',
        text: '提前在Google Maps下载曼谷/芭提雅离线地图包，离线时仍可定位和查看地图。或截图保存酒店/景点英文地址，打车时直接给司机看。'
      }
    ]
  },
  {
    id: 'payment',
    title: '💳 支付问题',
    items: [
      {
        icon: '❌',
        title: '银行卡刷不过',
        text: '1. 确认是否已通知银行开通境外消费\n2. 换另一张备用卡\n3. 找ATM取现（VISA/MasterCard通用，手续费约150–220฿）\n4. 拨打卡背面国际客服电话\n\n⚠️ 出发前在手机银行App里开通境外刷卡权限！'
      },
      {
        icon: '💵',
        title: '现金不够了',
        text: '曼谷/芭提雅的7-Eleven、商场旁边都有AEON或Bangkok Bank的ATM，支持VISA/MasterCard取泰铢，每次手续费约150–220฿。'
      }
    ]
  },
  {
    id: 'passport',
    title: '📑 护照丢失',
    items: [
      {
        icon: '🆘',
        title: '护照丢了怎么办',
        text: '1. 立刻拨打中国驻泰大使馆：+66-2-245-7032\n2. 去最近警察局报失（旅游警察：1155）\n3. 携带：护照照片/复印件、身份证、护照尺寸证件照\n4. 申请旅行证（临时证件）\n\n预防：手机存护照首页照片，行李放护照复印件。'
      }
    ]
  },
  {
    id: 'health',
    title: '🏥 身体不适',
    items: [
      {
        icon: '🤒',
        title: '在泰国生病了',
        text: '曼谷大医院基本有会英文/中文的医生：\n- Bumrungrad International（曼谷）：+66-2-667-1000\n- Bangkok Hospital Pattaya（芭提雅）：+66-38-259-999\n\n建议出行前购买旅行保险，可报销医疗费用。'
      },
      {
        icon: '☀️',
        title: '中暑/热射病',
        text: '立刻进室内/阴凉处，补充水分（加盐更好）。头痛剧烈/意识模糊立刻拨急救：1669。\n预防：出门带水，戴帽，11:00–15:00减少户外活动。'
      }
    ]
  },
  {
    id: 'contacts',
    title: '📞 紧急联系方式',
    items: [
      {
        icon: '🇨🇳',
        title: '中国驻泰国大使馆',
        text: '电话：+66-2-245-7032（24小时领事保护热线）\n地址：57 Ratchadaphisek Road, Bangkok'
      },
      {
        icon: '👮',
        title: '泰国旅游警察（英文）',
        text: '拨打 1155（24小时，全泰国通用，可英文沟通）'
      },
      {
        icon: '🚑',
        title: '泰国急救',
        text: '救护车：1669\n火警：199\n综合紧急：191'
      },
      {
        icon: '📱',
        title: '中国境外紧急求助热线',
        text: '外交部热线（国内拨）：12308\n境外拨打：+86-10-12308'
      }
    ]
  }
];

// ============================================
// 工具函数
// ============================================
function getCurrentDayIndex() {
  const today = new Date();
  const startDate = new Date(TRIP_DATA.meta.startDate);
  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 0;
  if (diffDays >= TRIP_DATA.days.length) return TRIP_DATA.days.length - 1;
  return diffDays;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth()+1}/${d.getDate()}`;
}

function getEnergyLabel(level) {
  const labels = ['', '轻松', '中等', '高强度', '超高强度'];
  return labels[level] || '中等';
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('已复制 ✓'));
  } else {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast('已复制 ✓');
  }
}

function showToast(msg) {
  let toast = document.getElementById('copyToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'copyToast';
    toast.className = 'copy-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ============================================
// 天气数据（基于4–5月气候规律）
// ============================================
const WEATHER_DATA = {

  // ── 总体概述 ──
  summary: {
    season: '热季尾声 / 雨季前奏',
    period: '2026年4月26日 – 5月3日',
    overview: '整趟行程处于东南亚热季末期，气温高、湿度大、紫外线极强。4月底至5月初是曼谷和芭提雅开始偶发性对流雨的时节，午后可能有短暂雷阵雨，通常30–60分钟后放晴，不影响大局。澳门4月偶有细雨，整体温和。',
    topRisks: [
      { icon: '☀️', risk: '高温中暑', level: 'danger', desc: '曼谷/芭提雅11:00–15:00气温可达35–38°C，户外高强度活动极易中暑，大皇宫参观必须早出发。' },
      { icon: '🔆', risk: '紫外线灼伤', level: 'danger', desc: 'UV指数8–11（极强），未防晒裸露皮肤30分钟内即可晒伤，格兰岛出海尤其严峻。' },
      { icon: '💧', risk: '脱水/中暑', level: 'warning', desc: '高温高湿环境下出汗量大，每小时需补水500ml以上，含电解质饮料更佳。' },
      { icon: '🌧️', risk: '午后雷阵雨', level: 'info', desc: '4月底–5月初午后14:00–17:00可能有短暂雷阵雨，备轻薄雨衣/折叠伞，通常不影响行程。' },
      { icon: '💨', risk: '海上风浪', level: 'warning', desc: '格兰岛出海当天需提前查看海况，风力3级以下出行，风浪大时渡船停运。' }
    ]
  },

  // ── 逐城市逐日天气 ──
  days: [
    {
      date: '4/26',
      city: '澳门',
      cityCode: 'macau',
      emoji: '🎰',
      weather: '多云转晴',
      weatherIcon: '⛅',
      tempHigh: 27,
      tempLow: 22,
      humidity: 78,
      uvIndex: 5,
      uvLabel: '中等',
      rainChance: 20,
      wind: '东南风 2–3级',
      feelsLike: '温热，体感舒适',
      riskLevel: 'low',
      riskLabel: '低风险',
      tips: [
        '澳门4月气温温和，适合步行游览老城',
        '紫外线中等，户外仍需涂抹SPF30+防晒',
        '全天穿短袖即可，晚上可备薄外套',
        '降雨概率低，轻便折叠伞备用即可'
      ],
      outfit: '短袖T恤 + 轻便长裤或短裤，薄外套备用',
      mustDo: '防晒霜SPF30+，带折叠伞，步行老城注意补水'
    },
    {
      date: '4/27',
      city: '芭提雅',
      cityCode: 'pattaya',
      emoji: '🏖️',
      weather: '晴间多云',
      weatherIcon: '🌤️',
      tempHigh: 35,
      tempLow: 27,
      humidity: 72,
      uvIndex: 9,
      uvLabel: '很强',
      rainChance: 15,
      wind: '东南风 2–3级',
      feelsLike: '闷热，体感38°C+',
      riskLevel: 'medium',
      riskLabel: '中等风险',
      tips: [
        '今天以移动为主，长时间在机场/交通工具内，主要风险是脱水',
        '机场出来直接上车，减少暴晒时间',
        '抵达芭提雅后注意补水，便利店买大瓶矿泉水',
        '傍晚海边散步较舒适，但晒到17:00后再出门'
      ],
      outfit: '吸湿排汗短袖 + 宽松短裤，凉鞋，帽子',
      mustDo: 'SPF50+防晒霜，大瓶矿泉水随身，避免正午在室外停留'
    },
    {
      date: '4/28',
      city: '芭提雅 · 格兰岛',
      cityCode: 'pattaya',
      emoji: '🏝️',
      weather: '晴，午后可能有短暂阵雨',
      weatherIcon: '☀️',
      tempHigh: 36,
      tempLow: 27,
      humidity: 75,
      uvIndex: 11,
      uvLabel: '极强',
      rainChance: 30,
      wind: '东南风 2–4级',
      feelsLike: '海岛全天暴晒，体感40°C',
      riskLevel: 'danger',
      riskLabel: '⚠️ 高风险（紫外线极强）',
      tips: [
        '格兰岛出海是全程紫外线最强的一天，UV指数11属极强级别',
        '防晒霜出发前20分钟提前涂，每2小时下水后必须补涂',
        '遮阳帽+墨镜+防晒衣三件缺一不可',
        '午后14:00–16:00避开直射阳光，去室内餐厅休息',
        '提前查看天气App（AccuWeather/墨迹）确认海况',
        '风力3级以上建议不出海，改去真理寺或Central Festival室内'
      ],
      outfit: '防晒衣/长袖泳衣 + 防晒短裤，水鞋，宽沿遮阳帽，UV墨镜',
      mustDo: 'SPF50+防水防晒霜（出发前涂+每2小时补），2L以上补水，查当天海况再出发'
    },
    {
      date: '4/29',
      city: '芭提雅→曼谷',
      cityCode: 'bangkok',
      emoji: '🏙️',
      weather: '晴间多云，午后可能短暂雷阵雨',
      weatherIcon: '⛅',
      tempHigh: 36,
      tempLow: 28,
      humidity: 74,
      uvIndex: 9,
      uvLabel: '很强',
      rainChance: 35,
      wind: '南风 2–3级',
      feelsLike: '闷热，湿度高，体感39°C',
      riskLevel: 'medium',
      riskLabel: '中等风险',
      tips: [
        '上午真理寺参观，09:00前入场可避开最热时段',
        '午后14:00–17:00是转场最佳时机，车内有空调，不在室外',
        '抵达曼谷Asok后补水休息，7-Eleven买大瓶水',
        '晚上唐人街19:00后气温稍降，但仍需防晒备雨具'
      ],
      outfit: '吸湿排汗短袖，宽松长裤（真理寺需遮肩遮腿），凉鞋，帽子',
      mustDo: 'SPF50+防晒，真理寺穿遮肩遮腿衣物，随身带折叠伞'
    },
    {
      date: '4/30',
      city: '曼谷 · 老城区',
      cityCode: 'bangkok',
      emoji: '🏛️',
      weather: '晴，午后可能短暂雷阵雨',
      weatherIcon: '☀️',
      tempHigh: 37,
      tempLow: 28,
      humidity: 70,
      uvIndex: 10,
      uvLabel: '很强',
      rainChance: 35,
      wind: '南风 2–3级',
      feelsLike: '酷热，强烈暴晒感，体感40°C+',
      riskLevel: 'danger',
      riskLabel: '⚠️ 高风险（酷热+暴晒）',
      tips: [
        '大皇宫必须07:30–08:00出发，08:30进场，避开正午酷热',
        '10:00之后紫外线急剧增强，卧佛寺→郑王庙尽量在11:30前完成',
        '11:30–14:30必须进室内降温，别硬撑，中暑需要立刻休息',
        '大皇宫内无遮蔽区域多，帽子墨镜绝对不能省',
        '随身携带500ml以上矿泉水，买了就喝，不要等渴了再喝',
        '着装合规：有袖上衣+长裤/过膝裙，进殿脱鞋注意地面烫脚'
      ],
      outfit: '长袖或薄款有袖上衣（合大皇宫规定）+ 长裤/过膝裙，宽沿遮阳帽，UV墨镜，防晒喷雾',
      mustDo: '07:30前出发，SPF50+防晒，随身水至少500ml，11:30前进室内，下午按摩+休息'
    },
    {
      date: '5/1',
      city: '曼谷 · 城区',
      cityCode: 'bangkok',
      emoji: '🛍️',
      weather: '多云间晴，午后有雷阵雨概率',
      weatherIcon: '🌤️',
      tempHigh: 36,
      tempLow: 27,
      humidity: 76,
      uvIndex: 8,
      uvLabel: '强',
      rainChance: 45,
      wind: '南风 2–3级',
      feelsLike: '闷热，有阵雨感，体感38°C',
      riskLevel: 'medium',
      riskLabel: '中等风险',
      tips: [
        '今天以购物/按摩/夜市为主，大量时间在室内，风险相对低',
        '午后14:00–16:00雨概率上升，Jodd Fairs等户外夜市若要去，建议17:00后出发',
        '准备折叠伞或轻薄雨衣，突发阵雨持续30–60分钟',
        '从一个商场走到另一个商场注意补水，空调冷热交替易感冒',
        '按摩后出门注意气温落差，毛孔张开后吹空调容易不舒服'
      ],
      outfit: '短袖T恤，宽松裤，凉鞋/运动鞋均可，随身折叠伞',
      mustDo: '带折叠伞/小雨衣，夜市出发前查天气App，商场间移动注意补水'
    },
    {
      date: '5/2',
      city: '曼谷 · 收尾日',
      cityCode: 'bangkok',
      emoji: '🏠',
      weather: '多云，傍晚可能有阵雨',
      weatherIcon: '🌥️',
      tempHigh: 35,
      tempLow: 27,
      humidity: 78,
      uvIndex: 7,
      uvLabel: '强',
      rainChance: 40,
      wind: '南风 2–3级',
      feelsLike: '闷热，体感37°C',
      riskLevel: 'low',
      riskLabel: '低风险（室内为主）',
      tips: [
        '今天主要在室内（酒店/商场/咖啡馆），户外暴露极少',
        '22:00去机场，打Grab约40–60分钟，雨季初期注意交通可能堵',
        '建议22:00准点出发，不要拖延，避免因堵车误机',
        '如傍晚有雨，打伞进出即可，不影响机场行程'
      ],
      outfit: '舒适旅行服装，机场候机建议带薄外套（机舱冷）',
      mustDo: '不要因天气好临时加景点，保持返程节奏；机场出发时刻22:00不可动摇'
    },
    {
      date: '5/3',
      city: '返程',
      cityCode: 'return',
      emoji: '✈️',
      weather: '凌晨机场候机',
      weatherIcon: '🌙',
      tempHigh: 34,
      tempLow: 26,
      humidity: 75,
      uvIndex: 0,
      uvLabel: '无（凌晨）',
      rainChance: 20,
      wind: '南风 2级',
      feelsLike: '凌晨户外仍感闷热，机舱内偏冷',
      riskLevel: 'low',
      riskLabel: '低风险',
      tips: [
        '凌晨02:50起飞，候机室内温度偏冷，薄外套必备',
        '机舱温度约22°C，长途飞行建议穿长裤+薄外套',
        '候机时多喝水，补充整趟旅程的水分消耗'
      ],
      outfit: '舒适运动服/宽松长裤，薄外套或卫衣（机舱冷）',
      mustDo: '薄外套/卫衣放随身包，机上多喝水，到上海注意天气变化换装'
    }
  ],

  // ── 通用防暑防晒指南 ──
  heatGuide: {
    sunscreen: {
      title: '防晒全攻略',
      icon: '🧴',
      items: [
        { step: '出门前20分钟', desc: '涂SPF50+ PA++++防晒霜，面部+颈部+手臂全覆盖，不留死角' },
        { step: '每2小时补涂', desc: '出汗或下水后必须重新涂，防晒失效比想象快；喷雾型补涂方便' },
        { step: '物理防晒优先', desc: '遮阳帽+UV墨镜+防晒衣（UPF40+），比任何防晒霜都有效' },
        { step: '格兰岛特别注意', desc: '海面反射紫外线是陆地的1.5倍，防水防晒霜必须用，涂完等干再下水' }
      ]
    },
    hydration: {
      title: '补水指南',
      icon: '💧',
      items: [
        { step: '每小时500ml+', desc: '高温高湿环境下出汗量极大，不等口渴就要喝，尤其户外参观时' },
        { step: '含电解质更佳', desc: '7-Eleven有POCARI SWEAT宝矿力（约25–30฿），补充电解质防低钠' },
        { step: '避免大量冰饮', desc: '大量冷饮刺激肠胃，容易腹泻。冰水可以喝，不要大口猛灌' },
        { step: '椰子水天然补水', desc: '路边鲜椰子约50–80฿，天然电解质，户外最佳补水选择' }
      ]
    },
    heatstroke: {
      title: '中暑识别 & 急救',
      icon: '🚨',
      items: [
        { step: '预警信号', desc: '头晕、头疼、皮肤发红发烫、恶心、出汗异常多或突然停止出汗——这些是中暑前兆，立刻进室内' },
        { step: '轻度中暑处理', desc: '立刻进有空调的室内，解开衣领，冷湿毛巾敷颈部/腋窝/腹股沟，补充含盐饮料' },
        { step: '重度中暑拨120', desc: '出现意识模糊、昏迷、体温超过40°C，立刻拨打1669（泰国急救），旁边所有人停止活动降温' },
        { step: '最危险时段', desc: '11:00–15:00是全天最热，大皇宫参观必须在11:30前完成主要区域，格兰岛午间必须进室内' }
      ]
    },
    rain: {
      title: '雨季应对',
      icon: '🌧️',
      items: [
        { step: '突发阵雨怎么办', desc: '东南亚雨季阵雨猛但短，通常30–60分钟放晴，找屋檐或便利店等一等即可，不用慌' },
        { step: '必备装备', desc: '折叠伞（轻便，7-Eleven有售约80–120฿）或薄款雨衣；不建议带大伞，收纳麻烦' },
        { step: '雨中打车', desc: '下雨时Grab溢价明显，可以多等10–15分钟让价格回落，或者在屋内等雨小了再叫' },
        { step: '格兰岛出海', desc: '出发前查AccuWeather，如早上已下雨或预报全天雨，不建议出海，改去室内景点' }
      ]
    }
  },

  // ── 各城市天气对比 ──
  cityComparison: [
    {
      city: '澳门',
      emoji: '🎰',
      avgTemp: '22–27°C',
      uvRisk: '中等 (UV 4–6)',
      rainRisk: '低',
      heatRisk: '低',
      verdict: '全程最舒适，正常户外活动无压力'
    },
    {
      city: '芭提雅',
      emoji: '🏖️',
      avgTemp: '27–36°C',
      uvRisk: '极强 (UV 9–11)',
      rainRisk: '中（午后）',
      heatRisk: '高',
      verdict: '海岛紫外线极强，格兰岛出海是全程防晒重点日'
    },
    {
      city: '曼谷',
      emoji: '🏙️',
      avgTemp: '28–37°C',
      uvRisk: '很强 (UV 8–10)',
      rainRisk: '中（午后）',
      heatRisk: '极高',
      verdict: '大皇宫是全程最热挑战，必须早出发+主动降温'
    }
  ]
};
