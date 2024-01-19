import moment from 'moment'
moment.locale('uz', {
    months: 'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentyabr_Oktyabr_Noyabr_Dekabr'.split('_'),
    monthsShort: 'yan_fev_mart_apr_may_iyun_iyul_avg_sent_okt_noy_dek'.split('_'),
    relativeTime: {
        future: '%s keyin',
        past: '%s oldin',
        s: '1 sekund',
        m: '1 minut',
        mm: '%d minut',
        h: '1 soat',
        hh: '%d soat',
        d: '1 kun',
        dd: '%d kun',
        M: '1 Oy',
        MM: '%d Oy',
    }
})

export default moment