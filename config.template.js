/**
 * Global configuration object.
 */
const config = {
  api: {
    'host': 'https://explorer.diazwallet.online',
    'port': '3000',
    'portWorker': '443',
    'prefix': '/api',
    'timeout': '5s'
  },

  /**
   * If set to true there are extra logging details in cron scripts.
   */
  verboseCron: true,

  /**
   * If set to true there are extra tx logging details in cron scripts (Not recommended).
   */
  verboseCronTx: false,

  /**
   * If set to 0, cpu cores are detected and worker processes spawned accordingly.
   * If set to > 0, limit the number of worker processes.
   */
  workers: 0,

  /**
   * Configure your coin details here.
   */
  coinDetails: {
    name: 'Diaz',
    shortName: 'DIAZ',
    coinNumberFormat: '0,0.0000',
    coinNumberFormatFinance: '+0,0.0000'
  },

  /**
   * Set to true to extract PoS & MN data.
   */
  splitRewardsData: true,

  /**
   * API configurations.
   */
  freegeoip: {
    'api': 'https://extreme-ip-lookup.com/json/'
  },
  coinMarketCap: {
    'api': 'https://api.coinmarketcap.com/v1/ticker/',
    'ticker': 'diaz'
  },

  /**
   * All links to website and social media.
   */
  socialMedia: {
    'website': 'https://diazwallet.online/',
    'discord': 'https://discord.diazwallet.online',
    'telegram': 'https://t.me/diazcoin',
    'twitter': 'https://twitter.com/diaz',
    'bitcoinTalk': 'https://bitcointalk.diazwallet.online',
    'facebook': 'https://facebook.com/diazcoin',
    'youtube': 'https://youtube.com/channel/UC26rKBciicXp33dK8Nkg',
    'github': 'https://github.com/diazcoin',
    'instagram': 'https://instagram.com/diazcoin/',
    'reddit': 'https://www.reddit.com/r/Diaz/',
    'medium': 'https://medium.com/diaz'
  },

  /**
   * All exchange links.
   */
  exchanges: [
    {
      'title': 'Graviex',
      'link': 'https://graviex.net/markets/diazbtc'
    },
    {
      'title': 'Crex24',
      'link': 'https://crex24.com/exchange/DIAZ-BTC'
    },
    {
      'title': 'Aiodex',
      'link': 'https://aiodex.com/exchange/DIAZ_BTC'
    },
    {
      'title': 'CRATEX',
      'link': 'https://cratex.io/index.php?pair=DIAZ/BTC'
    },
    {
      'title': 'Raisex',
      'link': 'https://raisex.io/trade/DIAZ_BTC'
    },
    {
      'title': 'MCT+',
      'link': 'https://trade.mct.plus/'
    },
    {
      'title': 'FINEXBOX',
      'link': 'https://www.finexbox.com/market/pair/DIAZ-BTC.html'
    },
    {
      'title': 'Block DX',
      'link': 'https://blocknet.co/diaz-2/about/'
    },
    {
      'title': 'Bisq',
      'link': 'https://bisq.network/markets/?currency=diaz_btc'
    }
  ],

  /**
   * Adjustable PoS Profitability Score - How profitable is your staking, tailored for your blockchain.
   */
  profitabilityScore: {

    /**
     * Figure out how profitable you are staking. Each output is multiplied by the number below, you can configure it for your blockchain.
     * The formula is: (reward.stake.input.confirmations / ((reward.stake.reward / reward.stake.input.value) * 100)) * config.profitabilityScore.weightMultiplier
     */
    weightMultiplier: 0.1,

    /**
     * In order to get the color below (from scoreStyles) we'll use an exponential formula.
     * The formula is: profitabilityScore < weightColorScale * Math.pow(2, i + 1) 
     */
    weightColorScale: 30,

    scoreStyles: [

      /**
       * Best case.
       */
      {
        color: "#72f87b",
        title: "Rank 1/10 - Excellent!!!"
      },
      {
        color: "#84f771",
        title: "Rank 2/10 - Excellent!"
      },
      {
        color: "#a0f771",
        title: "Rank 3/10 - Excellent"
      },
      {
        color: "#bcf671",
        title: "Rank 4/10 - Very Good"
      },
      {
        color: "#d8f671",
        title: "Rank 5/10 - Above Average"
      },
      {
        color: "#f3f671",
        title: "Rank 6/10 - Average"
      },
      {
        color: "#f5dc71",
        title: "Rank 7/10 - Below Average"
      },
      {
        color: "#f5c071",
        title: "Rank 8/10 - Not Optimal"
      },
      {
        color: "#f4a471",
        title: "Rank 9/10 - Not Optimal!"
      },

      /**
       * Worst case (default).
       */
      {
        color: "#f48871",
        title: "Rank 10/10 - Not Optimal!!!"
      }
    ]
  },

  /**
   * Community and address related. If you comment out all of these addresses the 'Community Addresses' section will not show up on the homepage. You can add as many addresses to highlight as you wish.
   */
  community: {
    highlightedAddresses: [
      { label: 'Community Donations', address: 'UUr5nDmykhun1HWM7mJAqLVeLzoGtx19dX' },
      { label: 'Development Budget', address: '7U3FMDhKv4j5bzauurPoX1TtqE7hPowSJi' },
    ]
  },

  /**
   * Each address can contain it's own set of widgets and configs for those widgets.
   */
  addressWidgets: {
    'XXXXXXXXXXXXXXXXXXXXXXXXXXX': {

      /**
       * WIDGET: Adds a list of masternodes when viewing address. We use this to show community-ran masternodes.
       */
      masternodesAddressWidget: {
        title: 'Community Masternodes',
        description: 'Profits from these masternodes fund & fuel community talent',

        /**
         * If you have more than 10 you should enable this.
         */
        isPaginationEnabled: false,
        addresses: [
          'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
          'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
          'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
        ]
      }
    }
  }
};

module.exports = config;
